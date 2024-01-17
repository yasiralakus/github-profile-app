import { useEffect, useState } from "react";

export default function App() {

    const [data, setData] = useState([]);
    const [dataRepo, setDataRepo] = useState([]);
    const [word, setWord] = useState('yasiralakus');
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        async function fetchData() {
            let doc = await fetch(`https://api.github.com/users/` + word).then(r => r.json());
            setData(doc)
        }
        fetchData();

        async function fetchRepos() {
            let docRepos = await fetch(`https://api.github.com/users/${word}/repos`).then(r => r.json());
            setDataRepo(docRepos)
        }

        fetchRepos();
    }, [word] )

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = Object.fromEntries(formData);
        setWord(formObj.searchWord)
    }

    return (
        <div className="container">

            <form onSubmit={handleSubmit} className="searchBox">

                <input type="text" placeholder="GitHub kullanıcı adı girin..." name="searchWord" autoComplete="off"/>

                <button>Ara</button>

            </form>

            <div className="resultsBox">

                {data.message === 'Not Found' ?
                
                    <div className="error">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <p>Sonuç bulunamadı!</p>
                        <p>'{word}'</p>
                    </div>
                    :
                    <>
                        <div className="profile">

                            <img src={data.avatar_url} alt="" />

                            {data.name ? <h2>{data.name}</h2> : <h2 style={{color: 'rgb(247, 113, 113)'}}>İsim eklenmedi.</h2>}
                            <a href={data.html_url}>{data.login} <i class="fa-solid fa-link"></i></a>
                            {data.bio ? <p>{data.bio}</p> : <p style={{color: 'rgb(247, 113, 113)'}}>Bio eklenmedi.</p>}
                            {data.location ? <p>{data.location}</p> : <p style={{color: 'rgb(247, 113, 113)'}}>Lokasyon eklenmedi.</p>}


                        </div>

                        <div className="stats">

                            <div className="statsItem">
                                <p>Followers</p>
                                <p><strong>{data.followers}</strong></p>
                            </div>

                            <div className="statsItem">
                                <p>Following</p>
                                <p><strong>{data.following}</strong></p>
                            </div>

                            <div className="statsItem">
                                <p>Repository</p>
                                <p><strong>{data.public_repos}</strong></p>
                            </div>

                        </div>

                        

                        {dataRepo.length > 0 ? (
                            <div className="repos">
                                {dataRepo.slice(0, Math.min(3, dataRepo.length)).map(repo => (
                                    <div key={repo.id} className="reposItem">
                                        <a href={repo.html_url}>{repo.html_url}</a>
                                    </div>
                                ))}
                            </div>
                        ) : ''}

                    </>
                
                }

            </div>

        </div>
        
    )
}
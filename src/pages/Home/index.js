import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';


function Home() {
    const [ filmes, setFilmes ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get('/movie/now_playing', {
                params: {
                    api_key: 'c13888595bfd3f788d7fcbd09b8b88b9',
                    language: 'pt-BR',
                    page: 1
                }
            })

            setFilmes(response.data.results.slice(0,10));
            //setFilmes(response.data.results);

            setLoading(false);

        }

        loadFilmes();
    }, []);


    if (loading) {
        return(
            <div className='loading'>
                <h2>Carregando filmes...</h2>
            </div>
        );
    }
    else {
        return(
            <div className='container'>
                <div className='lista-filmes'>
                    { filmes.map((filme) => {
                        return(
                            <article key={ filme.id }>
                                <strong>{ filme.title }</strong>
                                <div className='bloco-img'>
                                    <img src={ `https://image.tmdb.org/t/p/original/${ filme.poster_path }` } alt={ filme.title } />
                                    <Link to={ `/filme/${ filme.id }`}>Acessar</Link>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        );
    }
   
}

export default Home;
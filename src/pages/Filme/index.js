import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';
import { toast } from 'react-toastify';

function Filme() {
    const [ detalheFilme, setDetalheFilme ] = useState({});
    const [ loading , setLoading ] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadDetalhesFilme() {
            await api.get(`/movie/${ id }`, {
                params: {
                    api_key: 'c13888595bfd3f788d7fcbd09b8b88b9',
                    language: 'pt-BR'
                }
            })
            .then((response) => {
                setDetalheFilme(response.data);
                setLoading(false);
            })
            .catch(()=> {
                navigate('/', { replace: true });
                return;
            })
        }

        loadDetalhesFilme();

        return () => {
            console.log("Component foi desmontado!");
        }
    }, [id, navigate]);


    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeFlix');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === detalheFilme.id);

        if(hasFilme) {
            toast.warn(`"${detalheFilme.title}" já está na lista "meus filmes".`);
            return;
        }

        filmesSalvos.push(detalheFilme);
        localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos));
        toast.success(`"${detalheFilme.title}" adicionado na lista "meus filmes".`);

    }


    if (loading) {
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes do filme...</h1>
            </div>
        )
    }
    else {
        return(
            <div className='filme-info'>
                <h1>{ detalheFilme.title }</h1>
                <img src={ `https://image.tmdb.org/t/p/original/${ detalheFilme.backdrop_path }` } alt={ detalheFilme.title } />
                <div className='bloco-info'>
                    <h3>Sinopse</h3>
                    <span>{ detalheFilme.overview }</span>
                    <strong>Avaliação: { detalheFilme.vote_average }/10</strong>

                    <div className='area-buttons'>
                        <button onClick={ salvarFilme }>Salvar</button>
                        <a target="blank" rel="external" href={ `https://www.youtube.com/results?search_query=${ detalheFilme.title } Trailer`}>
                            Trailer
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filme;
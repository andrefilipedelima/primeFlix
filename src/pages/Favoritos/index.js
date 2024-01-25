import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify';

function Favoritos() {
    const [ filmes, setFilmes ] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem('@primeFlix');
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);

    function excluirFilme(filmeSelecionado) {
       let filtroFilmes = filmes.filter((filme) => {
        return( filme.id !== filmeSelecionado.id)
       });

       setFilmes(filtroFilmes);
       localStorage.setItem('@primeFlix', JSON.stringify(filtroFilmes));
       toast.success(`"${ filmeSelecionado.title }" removido da lista.`);
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>

            { filmes.length < 1 && <span>A lista está vazia  :(</span> }
            <ul>
                { filmes.map((filme) => {
                    return(
                        <li key= { filme.id }>
                            <span>{ filme.title }</span>
                            <div>
                                <Link to={ `/filme/${ filme.id }` }>Ver Detalhes</Link>
                                <button onClick={ () => { excluirFilme(filme) } }>Excluir</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Favoritos;
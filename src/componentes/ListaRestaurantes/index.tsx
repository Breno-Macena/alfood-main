import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState<string>('');
  const [paginaAnterior, setPaginaAnterior] = useState<string>('');

  const carregarDados = (url: string, termo?: string) => {
    axios.get<IPaginacao<IRestaurante>>(url, {
      params: {
        search: termo ?? ''
      }
    })
      .then(response => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
        setPaginaAnterior(response.data.previous);
      })
      .catch(error => {
        console.error("Erro ao carregar restaurantes:", error);
      });
  }

  useEffect(() => {
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, []);

  return (
    <>
      <section className={style.ListaRestaurantes}>
        <h1>Os restaurantes mais <em>bacanas</em>!</h1>
        <input
          type="text"
          placeholder="Pesquisar restaurante"
          className={style.inputPesquisa}
          onChange={(e) => {
            carregarDados('http://localhost:8000/api/v1/restaurantes/', e.target.value.toLowerCase());
          }}
        />
        {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
        {paginaAnterior && (
          <button onClick={() => carregarDados(paginaAnterior)}>
            Página anterior
          </button>
        )}
        {proximaPagina && (
          <button onClick={() => carregarDados(proximaPagina)}>
            Próxima página
          </button>
        )}
      </section>
    </>
  )
}

export default ListaRestaurantes
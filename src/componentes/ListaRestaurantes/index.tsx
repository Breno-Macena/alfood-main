import { useEffect, useState, useCallback } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState<string>('');
  const [paginaAnterior, setPaginaAnterior] = useState<string>('');
  const [termoPesquisa, setTermoPesquisa] = useState<string>('');
  const [ordenacao, setOrdenacao] = useState<string>('nome');

  const carregarDados = useCallback((url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url, {
      params: {
        search: termoPesquisa,
        ordering: ordenacao
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
  }, [termoPesquisa, ordenacao]);

  useEffect(() => {
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [carregarDados]);

  return (
    <>
      <section className={style.ListaRestaurantes}>
        <h1>Os restaurantes mais <em>bacanas</em>!</h1>
        <input
          type="text"
          placeholder="Pesquisar restaurante"
          className={style.inputPesquisa}
          onChange={e => setTermoPesquisa(e.target.value.toLowerCase())}
        />
        <select
          className={style.selectOrdenacao}
          onChange={e => setOrdenacao(e.target.value)}
        >
          <option value="nome">Nome</option>
          <option value="id">Id</option>
        </select>
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
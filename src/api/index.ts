import axios from "axios";
import IRestaurante from "../interfaces/IRestaurante";
import { IPaginacao } from "../interfaces/IPaginacao";

const apiAdmin = axios.create({
  baseURL: "http://localhost:8000/api/v2/",
  headers: {
    "Content-Type": "application/json",
  },
})

export default apiAdmin;

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
})

export const getRestaurantes = async (paginacao?: string): Promise<IPaginacao<IRestaurante> | undefined> => {
  try {
    const response = await api.get<IPaginacao<IRestaurante>>("/v1/restaurantes", {
      params: {
        paginacao
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao recuperar restaurantes:", error)
  }
}

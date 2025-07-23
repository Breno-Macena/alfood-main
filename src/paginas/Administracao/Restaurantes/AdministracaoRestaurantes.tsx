import { useEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import apiAdmin from '../../../api';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    apiAdmin.get<IRestaurante[]>('restaurantes/')
      .then(response => {
        setRestaurantes(response.data);
      });
  }, []);

  const excluir = (id: number) => {
    if (window.confirm('Deseja realmente excluir este restaurante?')) {
      apiAdmin.delete(`restaurantes/${id}/`)
        .then(() => {
          setRestaurantes(restaurantes.filter(restaurante => restaurante.id !== id));
        })
        .catch(error => {
          console.error("Erro ao excluir o restaurante:", error);
        });
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluir(restaurante.id)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes

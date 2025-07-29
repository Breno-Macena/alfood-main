import { useEffect, useState } from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import apiAdmin from '../../../api';
import IPrato from '../../../interfaces/IPrato';

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    apiAdmin.get<IPrato[]>('pratos/')
      .then(response => {
        setPratos(response.data);
      });
  }, []);

  const excluir = (id: number) => {
    if (window.confirm('Deseja realmente excluir este prato?')) {
      apiAdmin.delete(`pratos/${id}/`)
        .then(() => {
          setPratos(pratos.filter(prato => prato.id !== id));
        })
        .catch(error => {
          console.error("Erro ao excluir o prato:", error);
        });
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [ <a href={prato.imagem} target="_blank" rel="noreferrer">Ver Imagem</a> ]
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluir(prato.id)}>Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoPratos

import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'
import apiAdmin from '../../../api'

const FormularioRestaurante = () => {
  const [nome, setNome] = useState<string>('')
  const parametros = useParams<{ id?: string }>()

  useEffect(() => {
    if (parametros.id) {
      apiAdmin.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(response => {
          setNome(response.data.nome)
        })
    }
  }, [parametros])

  const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (parametros.id) {
      apiAdmin.put(`restaurantes/${parametros.id}/`, { nome: nome })
        .then(() => {
          alert('Restaurante atualizado com sucesso!')
        })
        .catch(error => {
          console.error("Erro ao atualizar o restaurante:", error);
        })
      return
    }

    apiAdmin.post('restaurantes/', { nome: nome })
      .then(() => {
        alert('Restaurante salvo com sucesso!')
        setNome('')
      })
      .catch(error => {
        console.error("Erro ao salvar o restaurante:", error);
      })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" component="h1">Formulário de restaurantes</Typography>
      <Box component="form" onSubmit={aoSubmeterFormulario}>
        <TextField 
          label="Nome" 
          variant="standard" 
          name="nome" value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          fullWidth
          required />
        <Button type="submit" variant="outlined" fullWidth sx={{ marginTop: 1 }}>
          Salvar
        </Button>
      </Box>
    </Box>
  )
}

export default FormularioRestaurante

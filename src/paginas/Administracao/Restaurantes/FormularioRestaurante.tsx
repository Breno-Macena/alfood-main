import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import IRestaurante from '../../../interfaces/IRestaurante'

const FormularioRestaurante = () => {
  const [nome, setNome] = useState<string>('')
  const parametros = useParams<{ id?: string }>()

  useEffect(() => {
    if (parametros.id) {
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(response => {
          setNome(response.data.nome)
        })
    }
  }, [parametros])

  const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (parametros.id) {
      axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, { nome: nome })
        .then(() => {
          alert('Restaurante atualizado com sucesso!')
        })
        .catch(error => {
          console.error("Erro ao atualizar o restaurante:", error);
        })
      return
    }

    axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: nome })
      .then(() => {
        alert('Restaurante salvo com sucesso!')
        setNome('')
      })
      .catch(error => {
        console.error("Erro ao salvar o restaurante:", error);
      })
  }

  return (
    <form onSubmit={aoSubmeterFormulario}>
      <TextField label="Nome" variant="standard" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  )
}

export default FormularioRestaurante

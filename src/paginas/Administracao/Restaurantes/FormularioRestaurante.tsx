import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'

const FormularioRestaurante = () => {
  const [nome, setNome] = useState<string>('')

  const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: nome })
      .then(() => {
        alert('Restaurante salvo com sucesso!')
        setNome('')
      })
      .catch(error => {
        console.error("Erro ao salvar o restaurante:", error);
      });
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

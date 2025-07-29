import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiAdmin from '../../../api'
import IPrato from '../../../interfaces/IPrato'
import ITag from '../../../interfaces/ITag'
import IRestaurante from '../../../interfaces/IRestaurante'

const FormularioPrato = () => {
  const [nome, setNome] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [tag, setTag] = useState<string>('')
  const [restauranteId, setRestauranteId] = useState<string>('')
  const [imagem, setImagem] = useState<File | null>(null)

  const [tags, setTags] = useState<ITag[]>([])
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  const parametros = useParams<{ id?: string }>()

  useEffect(() => {
    if (parametros.id) {
      apiAdmin.get<IPrato>(`pratos/${parametros.id}/`)
        .then(response => {
          setNome(response.data.nome)
          setDescricao(response.data.descricao)
          setTag(response.data.tag)
          setRestauranteId(response.data.restaurante.toString())
        })
    }

    apiAdmin.get<{ tags: ITag[] }>('tags/')
      .then(response => setTags(response.data.tags))

    apiAdmin.get<IRestaurante[]>('restaurantes/')
      .then(response => setRestaurantes(response.data));
  }, [parametros])

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setImagem(null)
    if (evento.target.files !== null)
      setImagem(evento.target.files[0])
  }

  const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('nome', nome)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restauranteId)
    if (imagem)
      formData.append('imagem', imagem)

    let method: string = 'POST'
    let url: string = 'pratos/'
    let successMessage = 'Prato cadastrado com sucesso'

    if (parametros.id) {
      method = 'PUT'
      url = `pratos/${parametros.id}/`
      successMessage = 'Prato atualizado com sucesso'
    }

    apiAdmin.request({
      url: url,
      method: method,
      headers: {
        'Content-Type': 'multipart/forma-data'
      },
      data: formData
    })
      .then(() => {
        setNome('')
        setDescricao('')
        setTag('')
        setRestauranteId('')

        alert(successMessage)
      })
      .catch(error => console.error(error))
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
        <Typography variant="h6" component="h1">
          {
            parametros.id ?
              <span>Editar prato</span> :
              <span>Novo prato</span>
          }
        </Typography>
        <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterFormulario}>
          <TextField
            label="Nome"
            variant="standard"
            name="nome" value={nome}
            onChange={(e) => setNome(e.target.value)}
            fullWidth
            required
            margin='dense' />
          <TextField
            label="Descrição"
            variant="standard"
            name="descricao" value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            fullWidth
            required
            margin='dense' />
          <FormControl margin='dense' fullWidth required>
            <InputLabel id='select-tag'>Tag</InputLabel>
            <Select labelId='select-tag' value={tag} onChange={evento => setTag(evento.target.value)}>
              {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl margin='dense' fullWidth required>
            <InputLabel id='select-restaurante'>Restaurante</InputLabel>
            <Select labelId='select-restaurante' value={restauranteId} onChange={evento => setRestauranteId(evento.target.value)}>
              {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>)}
            </Select>
          </FormControl>
          <input type="file" onChange={selecionarArquivo} />
          <Button type="submit" variant="outlined" fullWidth sx={{ marginTop: 1 }}>
            Salvar
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default FormularioPrato

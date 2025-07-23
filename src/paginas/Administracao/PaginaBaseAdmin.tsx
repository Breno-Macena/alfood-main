import { AppBar, Box, Button, Typography, Container, Toolbar, Link, Paper } from '@mui/material'
import { Outlet, Link as RouterLink } from 'react-router-dom'

const PaginaBaseAdmin = () => {
  return (
    <>
      <AppBar position='static'>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes" sx={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'white' }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo" sx={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'white' }}>Novo Restaurante</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ marginTop: 1 }}>
          <Paper sx={{ padding: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  )
}

export default PaginaBaseAdmin

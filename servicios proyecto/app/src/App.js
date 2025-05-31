import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import ProductoForm from './components/ProductoForm';
import ListaProductos from './components/ListaProductos';

function App() {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Gestión de Productos
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Agregar Producto
            </Button>
            <Button color="inherit" component={Link} to="/productos">
              Ver Productos
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<ProductoForm />} />
            <Route path="/productos" element={<ListaProductos />} />
          </Routes>
        </Container>
    </div>
    </Router>
  );
}

export default App;

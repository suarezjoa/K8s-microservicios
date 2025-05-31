import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';

// URL base para la API - se obtiene del servicio LoadBalancer
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const ProductoForm = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    categoria: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/productos`, producto);
      alert('Producto agregado exitosamente');
      setProducto({ nombre: '', descripcion: '', categoria: '' });
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert('Error al agregar el producto');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Agregar Nuevo Producto
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Nombre"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Descripción"
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Categoría"
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Agregar Producto
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductoForm; 
import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  CircularProgress,
  Box
} from '@mui/material';
import axios from 'axios';

// URL base para la API - se obtiene del túnel de minikube
const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.59.21:80';  // URL del túnel de la API

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/productos`);
        setProductos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Lista de Productos
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Categoría</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.id}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.descripcion}</TableCell>
                <TableCell>{producto.categoria}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ListaProductos; 
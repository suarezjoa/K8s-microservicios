const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de SQL Server
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Healthcheck para verificar la conexión a la base de datos
app.get('/healthcheck/db', async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT 1 as test`;
        if (result.recordset[0].test === 1) {
            res.json({
                status: 'success',
                message: 'Conexión a la base de datos establecida correctamente',
                timestamp: new Date().toISOString()
            });
        }
    } catch (err) {
        console.error('Error en healthcheck de base de datos:', err);
        res.status(500).json({
            status: 'error',
            message: 'Error al conectar con la base de datos',
            error: err.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Healthcheck general
app.get('/healthcheck', (req, res) => {
    res.json({
        status: 'success',
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Rutas
app.get('/api/productos', async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query`SELECT * FROM productos`;
        res.json(result.recordset);
    } catch (err) {
        console.error('Error al obtener productos:', err);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

app.post('/api/productos', async (req, res) => {
    try {
        const { nombre, descripcion, categoria } = req.body;
        await sql.connect(sqlConfig);
        const result = await sql.query`
            INSERT INTO productos (nombre, descripcion, categoria)
            VALUES (${nombre}, ${descripcion}, ${categoria})
        `;
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (err) {
        console.error('Error al crear producto:', err);
        res.status(500).json({ error: 'Error al crear producto' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
}); 
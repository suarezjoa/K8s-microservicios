-- Crear base de datos
CREATE DATABASE ecommerce;
GO

-- Usar la base de datos
USE ecommerce;
GO

-- Crear tabla productos
CREATE TABLE productos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    descripcion NVARCHAR(500),
    categoria NVARCHAR(100)
);
GO

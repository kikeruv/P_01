const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

// Corrige la ruta - asegúrate de que sea 'routes' no 'router'
const productRoutes = require('./app/routes/products');
const adminProductRoutes = require('./app/routes/admin_products');

// Esta ruta puede permanecer para verificar que el servidor esté activo
app.get('/', (req, res) => {
    res.send('e-commerce app práctica 3');
});

// Rutas de la API
app.use('/products', productRoutes);
app.use('/admin/products', adminProductRoutes);

// Configurar rutas HTML para la práctica 1
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../P_01', 'P01_index.html'));
});

app.get('/shopping_cart', (req, res) => {
    res.sendFile(path.join(__dirname, '../P_01', 'P01_cart.html'));
});

// Servir archivos estáticos desde la carpeta P_01
app.use(express.static(path.join(__dirname, '../P_01')));

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

const productRoutes = require('./app/routes/products');
const adminProductRoutes = require('./app/routes/admin_products');

// Rutas de la API
app.use('/products', productRoutes);
app.use('/admin/products', adminProductRoutes);

app.get('/', (req, res) => {
    res.sendirect( 'P01_index.html');
});

// Configurar rutas HTML para la práctica 1
app.get('/home', (req, res) => {
    res.sendirect( 'P01_index.html');
});

app.get('/shopping_cart', (req, res) => {
    res.sendirect( 'P01_index.html');
});

 
app.use(express.static(__dirname + '/../P_01'));

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});
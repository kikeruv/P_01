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

app.use(express.static(path.join(__dirname, '..', 'P_01')));

// Rutas para vistas HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'P_01', 'P01_index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'P_01', 'P01_index.html'));
});

app.get('/shopping_cart', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'P_01', 'P01_cart.html'));
});

 
app.use(express.static(__dirname + '/../P_01'));

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});
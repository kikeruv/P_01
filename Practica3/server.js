const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('e-commerce app');
});

const productRoutes = require('./app/routers/products');
const adminProductRoutes = require('./app/routers/admin_products');

// Rutas de la API
app.use('/products', productRoutes);
app.use('/admin/products', adminProductRoutes);

// Configurar rutas HTML para la práctica 1
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname,'P01_index.html'));
});

app.get('/shopping_cart', (req, res) => {
    res.sendFile(path.join(__dirname,'P01_cart.html'));
});


app.use(express.static(path.join(__dirname, '../P_01')));

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});
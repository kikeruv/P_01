const express = require('express');
const router = express.Router();


const productController = require('../controllers');
const shoppingCartController = require('../shopping_cart');

// GET /products - Obtener todos los productos (con filtro opcional)
router.get('/', (req, res) => {
    try {
        // Verificar si hay un parámetro de consulta
        const query = req.query.query;
        let products;
        
        if (query) {
            // Si hay query, usar la función de filtrado
            products = productController.findProducts(query);
        } else {
            // Si no hay query, obtener todos los productos
            products = productController.getProducts();
        }
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


router.get('/:id', (req, res) => {
    try {
        const productId = req.params.id;
        const product = productController.getProductById(productId);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


router.post('/cart', (req, res) => {
    try {
        const cartItems = req.body;
        
        if (!Array.isArray(cartItems)) {
            return res.status(400).json({ message: "Request body must be an array" });
        }
        
        const result = shoppingCartController.getCartProducts(cartItems);
        
        res.status(result.statusCode).json(
            result.success ? result.products : { message: result.message }
        );
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;
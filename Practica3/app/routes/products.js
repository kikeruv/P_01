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
        console.log("POST /cart - Request received");
        const cartItems = req.body;
        
        // Verificar que sea un array
        if (!Array.isArray(cartItems)) {
            console.log("Request body is not an array");
            return res.status(400).json({ 
                message: "Request body must be an array" 
            });
        }
        
        console.log("Cart items:", JSON.stringify(cartItems));
        
        // Obtener todos los productos disponibles
        const dataHandler = require('../data_handler');
        const allProducts = dataHandler.getProducts();
        
        // Array para almacenar los productos encontrados
        const foundProducts = [];
        
        // Verificar cada producto en el carrito
        for (const item of cartItems) {
            // Validar la estructura del item
            if (!item.productUuid) {
                return res.status(400).json({ 
                    message: "Each item must have a productUuid" 
                });
            }
            
            console.log(`Looking for product with UUID: ${item.productUuid}`);
            
            // Buscar el producto por UUID
            const product = allProducts.find(p => p.uuid === item.productUuid);
            
            // Si no se encuentra el producto, devolver error
            if (!product) {
                console.log(`Product with UUID ${item.productUuid} not found`);
                return res.status(404).json({ 
                    message: `Product with UUID ${item.productUuid} not found` 
                });
            }
            
            console.log(`Product found: ${product.title}`);
            
            // Agregar el producto al array con su cantidad
            const productWithAmount = JSON.parse(JSON.stringify(product)); // Deep copy
            productWithAmount.amount = item.amount || 1;
            foundProducts.push(productWithAmount);
        }
        
        console.log(`Returning ${foundProducts.length} products`);
        
        // Devolver los productos encontrados
        res.status(200).json(foundProducts);
        
    } catch (error) {
        console.error("Error processing cart:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();


const productController = require('../controllers');


const validateAdmin = (req, res, next) => {
    const authHeader = req.headers['x-auth'];
    
    if (!authHeader || authHeader !== 'admin') {
        return res.status(400).json({ 
            message: "Acceso no autorizado, no se cuenta con privilegios de administrador" 
        });
    }
    
    next();
};


router.use(validateAdmin);


router.post('/', (req, res) => {
    try {
        const productData = req.body;
        const result = productController.createProduct(productData);
        
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        
        res.status(201).json({ 
            message: `Product "${result.product.title}" created successfully`, 
            product: result.product 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}); 


router.put('/:id', (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        
        const result = productController.updateProduct(productId, productData);
        
        if (!result.success) {
            if (result.message.includes("not found")) {
                return res.status(404).json({ message: result.message });
            }
            return res.status(400).json({ message: result.message });
        }
        
        res.status(200).json({ 
            message: `Product "${result.product.title}" updated successfully`, 
            product: result.product 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:id', (req, res) => {
    try {
        const productId = req.params.id;
        const result = productController.deleteProduct(productId);
        
        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }
        
        res.status(200).json({ 
            message: `Product "${result.product.title}" deleted successfully`, 
            product: result.product 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
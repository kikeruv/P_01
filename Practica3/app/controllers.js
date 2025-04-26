// Import dependencies
const dataHandler = require('./data_handler');
const utils = require('./utils');

// Get all products
function getProducts() {
    return dataHandler.readProductsFile();
}

// Get product by ID
function getProductById(productId) {
    const products = getProducts();
    return products.find(product => product.uuid === productId);
}

// Create new product
function createProduct(productData) {
    // Validate product data
    const validation = utils.validateProductData(productData);
    if (!validation.isValid) {
        return {
            success: false,
            message: validation.message
        };
    }

    // Generate UUID
    const newProduct = {
        uuid: utils.generateUuID(),
        ...productData
    };

    // Add to products list
    const products = getProducts();
    products.push(newProduct);
    
    // Save to file
    if (dataHandler.writeProductsFile(products)) {
        return {
            success: true,
            product: newProduct
        };
    } else {
        return {
            success: false,
            message: "Failed to save product"
        };
    }
}

// Update product
function updateProduct(productId, productData) {
    // Validate product data
    const validation = utils.validateProductData(productData);
    if (!validation.isValid) {
        return {
            success: false,
            message: validation.message
        };
    }

    // Find product
    const products = getProducts();
    const productIndex = products.findIndex(product => product.uuid === productId);
    
    if (productIndex === -1) {
        return {
            success: false,
            message: "Product not found"
        };
    }

    // Update product
    products[productIndex] = {
        uuid: productId,
        ...productData
    };

    // Save to file
    if (dataHandler.writeProductsFile(products)) {
        return {
            success: true,
            product: products[productIndex]
        };
    } else {
        return {
            success: false,
            message: "Failed to update product"
        };
    }
}

// Delete product
function deleteProduct(productId) {
    const products = getProducts();
    const productIndex = products.findIndex(product => product.uuid === productId);
    
    if (productIndex === -1) {
        return {
            success: false,
            message: "Product not found"
        };
    }

    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);

    // Save to file
    if (dataHandler.writeProductsFile(products)) {
        return {
            success: true,
            product: deletedProduct
        };
    } else {
        return {
            success: false,
            message: "Failed to delete product"
        };
    }
}

// Find products by query
function findProducts(query) {
    if (!query) {
        return getProducts();
    }

    let category = "";
    let title = "";

    if (query.includes(":")) {
        const parts = query.split(":");
        category = parts[0].trim();
        title = parts.length > 1 ? parts[1].trim() : "";
    } else {
        title = query.trim();
    }

    const products = getProducts();
    return products.filter(product => {
        const matchCategory = product.category.toLowerCase().includes(category.toLowerCase());
        const matchTitle = product.title.toLowerCase().includes(title.toLowerCase());
        return matchCategory && matchTitle;
    });
}

// Export functions
module.exports = {getProducts,getProductById,createProduct,updateProduct,deleteProduct,findProducts};
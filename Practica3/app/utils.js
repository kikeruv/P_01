function generateUuID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
}

// Funciones de validación
function validateProductData(productData) {
    // Verificar campos obligatorios
    const requiredFields = ['title', 'imageUrl', 'description', 'unit', 'category', 'pricePerUnit', 'stock'];
    const missingFields = requiredFields.filter(field => !productData[field]);
    
    if (missingFields.length > 0) {
        return {
            isValid: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        };
    }
    
    // Verificar tipos de datos
    if (typeof productData.pricePerUnit !== 'number' || productData.pricePerUnit <= 0) {
        return {
            isValid: false,
            message: 'Price must be a positive number'
        };
    }
    
    if (typeof productData.stock !== 'number' || productData.stock < 0) {
        return {
            isValid: false,
            message: 'Stock must be a non-negative number'
        };
    }
    
    // Si todo está bien
    return {
        isValid: true,
        message: 'Product data is valid'
    };
}

module.exports = {generateUuID, validateProductData};
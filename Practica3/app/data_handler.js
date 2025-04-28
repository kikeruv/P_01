const fs = require('fs');

let productList = [];

function getProducts(){
    return readProductsFile();
}

function getProductById(uuid){
    const products = readProductsFile();
    return products.find(product => product.uuid === uuid) || null;
}

function createProduct(product){
    if (!product) {
        throw new Error("Product can't be null");
    }

    const products = readProductsFile();
    
    if (products.find(p => p.uuid === product.uuid)) {
        throw new Error(`Product with ID ${product.uuid} already exists`);
    }

    products.push(product);
    writeProductsFile(products);

    return product;
}

function updateProduct(uuid, updateProduct){
    const products = readProductsFile();
    const index = products.findIndex(product => product.uuid === uuid);
    
    if (index === -1) {
        throw new Error(`Product with ID ${uuid} not found`);
    }

    updateProduct.uuid = uuid;
    products[index] = updateProduct;
    writeProductsFile(products);

    return products[index];
}

function deleteProduct(uuid){
    const products = readProductsFile();
    const index = products.findIndex(product => product.uuid === uuid);
    
    if (index === -1) {
        throw new Error(`Product with ID ${uuid} not found`);
    }

    const removedProduct = products[index];
    products.splice(index, 1);
    writeProductsFile(products);
    
    return removedProduct;
}

function findProduct(query){
    if(!query){
        return getProducts();
    }

    let category = "";

    let title = "";

    if(query.includes(":")){
        const parts = query.split(":");
        category = parts[0].trim();
        title = parts.length > 1 ? parts[1].trim() : "";
    }else{
        title = query.trim();
    }

    const products = readProductsFile();
    return products.filter(product => {
        const matchCategory = product.category.toLowerCase().includes(category.toLowerCase());
        const matchTitle = product.title.toLowerCase().includes(title.toLowerCase());
        return matchCategory && matchTitle;
    });

}

function productListToHTML(lista, htmlElement) {
    if (!lista || !Array.isArray(lista)) {
        throw new Error("Lista must be an array of products");
    }
    
    if (!htmlElement) {
        throw new Error("HTML element is required");
    }
    
    const html = lista.map(product => product.toHTML()).join("");
    htmlElement.innerHTML = html;
}

function readProductsFile() {
    try {
        const data = fs.readFileSync('./data/productos.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
        return [];
    }
}

function writeProductsFile(products) {
    try {
        fs.writeFileSync('./data/productos.json', JSON.stringify(products, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error al escribir en el archivo de productos:', error);
        return false;
    }
}

module.exports = {getProducts, getProductById, createProduct, updateProduct, deleteProduct, findProduct, productListToHTML, readProductsFile, writeProductsFile};
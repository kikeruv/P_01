
const { Product } = require('./product');

let productList = [];

function getProducts(){
    return productList;
}

function getProductById(uuid){
    return productList.find(product => product.uuid === uuid || null);
}

function createProduct(product){
    if(!product){
        throw new Error("Product can't be null");
    }

    if(getProductById(product.uuid)){
        throw new Error (`Product with ID ${product.uuid} already exist`);
    }

    productList.push(product);

    return product;
}

function updateProduct(uuid, updateProduct){
    const index = productList.findIndex(product => product.uuid === uuid);

    if(index === -1){
        throw new Error(`Product with ID ${uuid} not found`);
    }

    updateProduct.uuid = uuid;

    productList[index] = updateProduct;

    return productList[index];
}

function deleteProduct(uuid){
    const index = productList.findIndex(product => product.uuid === uuid);

    if (index === -1){
        throw new Error(`Product with ID ${uuid} not found`);
    }

    const removedProduct = productList[index];
    productList.splice(index, 1);
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

    return productList.filter(product => {
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

module.exports = {getProducts, getProductById, createProduct, updateProduct, deleteProduct, findProduct, productListToHTML};
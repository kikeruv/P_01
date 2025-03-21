const generateUuID = require('./utils');
const { Product } = require('./product');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, findProduct } = require('./data_handler');
const { ShoppingCart } = require('./shopping_cart');

console.log("Creando productos de prueba...");
const producto1 = new Product(
    null, 
    "Producto 1", 
    "Descripción 1", 
    "img1.jpg", 
    "unidad", 
    10, 
    100, 
    "Categoría1"
);
const producto2 = new Product(
    null,
    "Producto 2",
    "Descripción 2",
    "img2.jpg",
    "kg",
    5,
    50,
    "Categoría2"
);

console.log("Añadiendo productos al sistema...");
createProduct(producto1);
createProduct(producto2);
console.log("Productos creados:", getProducts());

console.log("Actualizando producto...");
const productoActualizado = new Product(
    producto1.uuid,
    producto1.title,
    "Nueva descripción",
    producto1.imageUrl,
    producto1.unit,
    15,
    120,
    producto1.category
);
updateProduct(producto1.uuid, productoActualizado);
console.log("Producto actualizado:", getProductById(producto1.uuid));

console.log("Buscando productos por categoría:");
console.log(findProduct("Categoría1:"));

console.log("Buscando productos por nombre:");
console.log(findProduct("Producto"));

console.log("Probando carrito de compras...");
const carrito = new ShoppingCart();
carrito.addItem(producto1.uuid, 2);
carrito.addItem(producto2.uuid, 1);

console.log("Productos en carrito:", carrito.getItems());
console.log("Total del carrito:", carrito.calculateTotal());

console.log("Actualizando cantidad de producto en carrito...");
carrito.updateItem(producto1.uuid, 3);
console.log("Carrito actualizado:", carrito.getItems());

console.log("Eliminando producto del carrito...");
carrito.removeItem(producto2.uuid);
console.log("Carrito después de eliminar:", carrito.getItems());
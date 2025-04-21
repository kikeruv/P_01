const { getProductById } = require("./data_handler");
class ShoppingCart{

    constructor() {
        this._productProxies = [];
        this._products = [];
    }
    
    _findProxyIndex(productUuid) {
        return this._productProxies.findIndex(proxy => proxy.uuid === productUuid);
    }

    _updateProducts() {
        this._products = this._productProxies.map(proxy => {
            const product = getProductById(proxy.uuid);
            if (!product) {
                throw new ShoppingCartException(`Product with UUID ${proxy.uuid} not found`);
            }
            return { product, amount: proxy.amount };
        });
    }

   
    addItem(productUuid, amount) {
        if (!productUuid) {
            throw new ShoppingCartException("Product UUID is required");
        }
        if (isNaN(amount) || amount <= 0) {
            throw new ShoppingCartException("Amount must be a positive number");
        }

        const index = this._findProxyIndex(productUuid);
        
        if (index === -1) {
            // Product not in cart, add new proxy
            this._productProxies.push(new ProductProxy(productUuid, amount));
        } else {
            // Product already in cart, update amount
            const currentAmount = this._productProxies[index].amount;
            this._productProxies[index].amount = currentAmount + amount;
        }
        
        this._updateProducts();
    }

    updateItem(productUuid, newAmount) {
        if (!productUuid) {
            throw new ShoppingCartException("Product UUID is required");
        }
        
        const index = this._findProxyIndex(productUuid);
        
        if (index === -1) {
            throw new ShoppingCartException(`Product with UUID ${productUuid} not in cart`);
        }
        
        if (newAmount < 0) {
            throw new ShoppingCartException("Amount cannot be negative");
        } else if (newAmount === 0) {
            this.removeItem(productUuid);

        } else {
            this._productProxies[index].amount = newAmount;
            this._updateProducts();
        }
    }

    removeItem(productUuid) {
        if (!productUuid) {
            throw new ShoppingCartException("Product UUID is required");
        }
        
        const index = this._findProxyIndex(productUuid);
        
        if (index === -1) {
            throw new ShoppingCartException(`Product with UUID ${productUuid} not in cart`);
        }
        
        this._productProxies.splice(index, 1);
        this._updateProducts();
    }

    calculateTotal() {
        return this._products.reduce((total, item) => {
            return total + (item.product.pricePerUnit * item.amount);
        }, 0);
    }

    getItems() {
        return [this._products]; 

    }
}
class ProductProxy{

    constructor(uuid, amount) { 

        this._uuid = uuid;
        this._amount = amount;

        if (!uuid) {
            throw new ShoppingCartException("Product UUID is required");
        }
        if (isNaN(amount) || amount <= 0) {
            throw new ShoppingCartException("Amount must be a positive number");
        }
    }

    get uuid() {
        return this._uuid;
    }

    get amount() {
        return this._amount;
    }

    set amount(newAmount) {
        if (isNaN(newAmount) || newAmount <= 0) {
            throw new ShoppingCartException("Amount must be a positive number");
        }
        this._amount = newAmount;
    }

}


class ShoppingCartException extends Error{
    constructor(message) {
        super(message);
        this.name = "ShoppingCartException";
    }
}

module.exports = { ShoppingCart, ProductProxy, ShoppingCartException };

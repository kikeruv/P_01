
const generateUuID = require('./utils');
class Product{
    
    constructor(uuid, title, description, imageUrl, unit, stock, pricePerUnit, category){
        this._uuid = uuid || generateUuID();
        this._title = title;
        this._description = description;
        this._unit = unit;
        this._imageUrl =imageUrl;
        this._stock = stock;
        this._pricePerUnit = pricePerUnit;
        this._category = category;
    }

    get uuid(){
        return this._uuid;
    }

    set uuid(newUuid){
        if(this._uuid && newUuid !== this._uuid){
            throw new ProductException("Description can't be empty");
        }else{
            this._uuid = newUuid;
        }
    }

    get title(){
        return this._title;
    }

    set title(newTitle){
        if(newTitle === ""){
            throw new ProductException("Title can't be empty");
        }else{
            this._title = newTitle;
        }
    }

    get description(){
        return this._description;
    }

    set description(newDescription){
        if(newDescription === ""){
            throw new ProductException("Description can't be empty");
        }else{
            this._description = newDescription;
        }
    }

    get imageUrl(){
        return this._imageUrl;
    }

    set imageUrl(newImageUrl){
        if(newImageUrl === ""){
            throw new ProductException("You have to put an image");
        }else{
            this._imageUrl = newImageUrl;
        }

    }

    get unit(){
        return this._unit
    }

    set unit(newUnit){
        if(newUnit === ""){
            throw new ProductException("Unit can't be empty");
        }else{
            this._unit = newUnit;
        }
    }
    get stock(){
        return this._stock
    }

    set stock(newStock){
        if(newStock < 0){
            throw new ProductException("You can't put negative numbers");
        }else{
            this._stock = newStock;
        }
    }

    get pricePerUnit(){
        return this._pricePerUnit;
    }

    set pricePerUnit(newPricePerUnit){
        if(newPricePerUnit < 0){
            throw new ProductException("You can't put negative numbers");
        }else{
            this._pricePerUnit = newPricePerUnit;
        }
    }

    get category(){
        return this._category
    }
    
    set category(newCategory){
        if(newCategory === ""){
            throw new ProductException("Category can't be empty")
        }else{
            this._category = newCategory;
        }
    }

    static createFromJson(jsonValue){
        try {
            const obj = JSON.parse(jsonValue);
            return Product.createFromObject(obj);
        } catch (i) {
            throw new ProductException("Invalid JSON string: " + i.message);
        }
    }

    static createFromObject(obj){
        const product = new Product(
            obj.uuid,
            obj.title,
            obj.description,
            obj.imageUrl,
            obj.unit,
            obj.stock,
            obj.pricePerUnit,
            obj.category
        );
        return product;
    }

    static cleanObjct(obj){
        const cleanObj = {};

        if (obj.uuid){
             cleanObj.uuid = obj.uuid;
        }
        if (obj.title){ 
            cleanObj.title = obj.title;
        }
        if (obj.description){ 
            cleanObj.description = obj.description;
        }
        if (obj.imageUrl){
            cleanObj.imageUrl = obj.imageUrl;
        }
        if (obj.unit){ 
            cleanObj.unit = obj.unit;
        }
        if (obj.stock !== undefined) {
            cleanObj.stock = obj.stock;
        }
        if (obj.pricePerUnit !== undefined){
            cleanObj.pricePerUnit = obj.pricePerUnit;
        }
        if (obj.category){
            cleanObj.category = obj.category;
        }
        
        return cleanObj;
    }

    toHTML() {
        return `
            <div class="product-card" data-uuid="${this.uuid}">
                <img src="${this.imageUrl}" alt="${this.title}">
                <h3>${this.title}</h3>
                <p class="description">${this.description}</p>
                <p class="price">$${this.pricePerUnit} por ${this.unit}</p>
                <p class="stock">Disponibles: ${this.stock}</p>
                <p class="category">Categoría: ${this.category}</p>
            </div>
            `;
    }
}
class ProductException extends Error {
    constructor(message) {
        super(message);
        this.name = "ProductException";
    }
}

module.exports = { Product, ProductException };


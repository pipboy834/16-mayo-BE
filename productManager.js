const fs = require('fs');

class ProductManager {
  constructor(filename) {
    this.filename = filename;
  }

  async getAll() {
    try {
      const data = await this.readFile();
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file:', error);
      return [];
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getAll();
      const newProduct = { id: this.generateUniqueId(), ...product };
      products.push(newProduct);
      await this.save(products);
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      return null;
    }
  }

  async save(products) {
    try {
      const data = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.filename, data);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }

  async readFile() {
    try {
      const data = await fs.promises.readFile(this.filename, 'utf8');
      return data;
    } catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }

  generateUniqueId() {

    return Math.floor(Math.random() * 100000);
  }
}

module.exports = new ProductManager('productos.json');

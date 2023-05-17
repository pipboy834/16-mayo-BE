const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor() {
    this.filename = path.join(__dirname, 'productos.json');
    this.data = [];
  }

  
  async loadJSON() {
    try {
      const fileData = await fs.promises.readFile(this.filename, 'utf-8');
      this.data = JSON.parse(fileData);
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }

  
  async save() {
    try {
      await fs.promises.writeFile(this.filename, JSON.stringify(this.data, null, 2));
      console.log('array actualizado correctamente.');
    } catch (error) {
      console.error('Error al guardar el archivo JSON:', error);
    }
  }

  
  getAll() {
    this.data.forEach((obj) => console.log(obj));
  }

  
  async addObject(obj) {
    try {
      const newObj = { id: this.generateUniqueID(), ...obj };
      this.data.push(newObj);
      await this.save();
      console.log('Objeto agregado correctamente:', newObj);
    } catch (error) {
      console.error('Error al agregar el objeto:', error);
    }
  }

  async removeObjectByID(id) {
    try {
      const index = this.data.findIndex((obj) => obj.id === id);
      if (index !== -1) {
        const removedObj = this.data.splice(index, 1)[0];
        await this.save();
        console.log('Objeto eliminado correctamente:', removedObj);
      } else {
        console.log('No se encontró ningún objeto con el ID especificado.');
      }
    } catch (error) {
      console.error('Error al eliminar el objeto:', error);
    }
  }

  findObjectByID(id) {
    const obj = this.data.find((obj) => obj.id === id);
    if (obj) {
      console.log('Objeto encontrado:', obj);
    } else {
      console.log('No se encontró ningún objeto con el ID especificado.');
    }
  }
  
  generateUniqueID() {
    const ids = this.data.map((obj) => obj.id);
    let newID;
    do {
      newID = Math.floor(Math.random() * 1000) + 1;
    } while (ids.includes(newID));
    return newID;
  }
}

const productManager = new ProductManager();

(async () => {
  await productManager.loadJSON();


  await productManager.addObject({ name: 'langostinos' });
  await productManager.addObject({ name: 'calamar' });

  productManager.getAll();

  productManager.findObjectByID(1);

  await productManager.removeObjectByID(1);

  
})();

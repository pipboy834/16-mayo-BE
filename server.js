const express = require('express');
const productManager = require('./productManager');

const app = express();
const port = 8080;

app.use(express.json());

app.get('/products', async (req, res) => {
  const products = await productManager.getAll();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = req.body;
  const newProduct = await productManager.addProduct(product);
  res.json(newProduct);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

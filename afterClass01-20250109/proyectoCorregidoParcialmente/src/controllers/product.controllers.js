import productModel from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    console.log("getProducts")
    const { limit, page, filter, metFilter, ord } = req.query;

    const pag = page !== undefined ? page : 1; //Si la pagina es ingresada, consulto por ella sino es 1
    const lim = limit !== undefined ? limit : 10;
    const query = metFilter !== undefined ? { [metFilter]: filter } : {}; //Mandar status o category como metodo de filtro
    const orQuery = ord !== undefined ? { price: ord } : {}; //mandar asc o desc

    const prods = await productModel.paginate({}, {
      limit: lim,
      page: pag,
      orQuery,
      lean:true
    });

    console.log(prods);
    res.status(200).send(prods);
    //res.status(200).render('templates/home', {productos: prods, js: 'productos.js', css: 'productos.css'})
  } catch (e) {
    res.status(500).send('Error al consultar productos: ', e);
  }
};

export const getProduct = async (req, res) => {
  try {
    const idProd = req.params.pid;
    const prod = await productModel.findById(idProd);
    if (prod) res.status(200).send(prod);
    else res.status(404).send('Producto no existe');
  } catch (e) {
    res.status(500).send('Error al consultar producto: ', e);
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const respuesta = await productModel.create(product);
    console.log(respuesta);
    res.status(201).send('Producto creado correctamente');
  } catch (e) {
    console.log(e);

    res.status(500).send({error:'Error al crear producto: '+e.message});
  }
};

export const updateProduct = async (req, res) => {
  try {
    const idProd = req.params.pid;
    const updateProduct = req.body;
    const respuesta = await productModel.findByIdAndUpdate(
      idProd,
      updateProduct
    );
    res.status(200).send('Producto actualizado correctamente');
  } catch (e) {
    console.log(e);

    res.status(500).send('Error al actualizar producto: ', e);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const idProd = req.params.pid;
    const respuesta = await productModel.findByIdAndDelete(idProd);
    res.status(200).send('Producto eliminado correctamente');
  } catch (e) {
    res.status(500).send('Error al eliminar producto: ', e);
  }
};

/*
import { Router } from 'express';
import crypto from 'crypto';
import { __dirname } from '../path.js';
import { promises as fs } from 'fs';
import path from 'path';

const productRouter = Router();

// Ruta de productos
const productosPath = path.resolve(__dirname, '../src/db/productos.json');

// Leer archivo de productos
const productosData = await fs.readFile(productosPath, 'utf-8');
const productos = JSON.parse(productosData);

// Listar productos
productRouter.get('/', (req, res) => {
  const { limit } = req.query;
  const limitProducts = productos.slice(0, limit); //limitar la cantidad de productos a mostrar
  res.status(200),
    res.render('template/home', {
      productos: limitProducts,
      js: 'productos.js',
      css: 'productos.css',
    });
});

// Consultar producto por id
productRouter.get('/:pid', (req, res) => {
  const idProduct = req.params.pid;
  const product = productos.find((product) => product.id == idProduct);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ error: 'Producto no encontrado' });
  }
});

// Agregar nuevo producto
productRouter.post('/', async (req, res) => {
  const { title, description, code, price, category, stock } = req.body;

  const nuevoProducto = {
    id: crypto.randomBytes(10).toString('hex'),
    title: title,
    description: description,
    code: code,
    category: category,
    price: price,
    stock: stock,
    status: true,
    thumbnail: [],
  };

  productos.push(nuevoProducto);

  await fs.writeFile(productosPath, JSON.stringify(productos));
  res.status(201).send({
    mensaje: `nuevo producto agregado con el ID: ${nuevoProducto.id}`,
  });
});

// Actualizar producto
productRouter.put('/:pid', async (req, res) => {
  const idProduct = req.params.pid;
  const {
    title,
    description,
    code,
    price,
    category,
    stock,
    thumbnail,
    status,
  } = req.body;

  const indice = productos.findIndex((product) => product.id == idProduct);
  if (indice != -1) {
    productos[indice].title = title;
    productos[indice].description = description;
    productos[indice].code = code;
    productos[indice].category = category;
    productos[indice].price = price;
    productos[indice].stock = stock;
    productos[indice].thumbnail = thumbnail;
    productos[indice].status = status;

    await fs.writeFile(productosPath, JSON.stringify(productos));
    res.status(200).send({ mensaje: 'producto actualizado' });
  } else {
    res.status(404).send({ mensaje: 'Producto no encontrado' });
  }
});

// Eliminar producto
productRouter.delete('/:pid', async (req, res) => {
  const idProduct = req.params.pid;
  const indice = productos.findIndex((product) => product.id == idProduct);
  if (indice != -1) {
    productos.splice(indice, 1);
    await fs.writeFile(productosPath, JSON.stringify(productos));

    res.status(200).send({ mensaje: 'producto eliminado' });
  } else {
    res.status(404).send({ mensaje: 'Producto no encontrado' });
  }
});

export default productRouter; //exportar el router
*/

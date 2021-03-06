import express from 'express';
import Product from '../models/productModel';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get("/:id", async (req, res) => {
    const product = await Product.findOne({_id: req.params.id});
    if(product) {
        res.send(product);
    } else {
        res.status(404).send({message: "Producto no encontrado"})
    }
});

router.post("/",  async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        author: req.body.author,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: 'Error in creating Product.' });
});

router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.author = req.body.author;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const updateProduct = await product.save();
        if (updateProduct) {
            return res.status(200).send({ message: 'Product Updated', data: updateProduct });
        }
    }
    return res.status(500).send({ message: 'Error in updating Product.' });
});

router.delete("/:id",  async (req, res) => {
    const productId = req.params.id;
    const deleteProduct = await Product.findById(productId);
    if (deleteProduct) {
        await deleteProduct.remove();
        res.send({ message: "Product Deleted" });
    } else {
        res.send("Error in Deletion");
    }
});

export default router;
import express from 'express';
import {product , ProductStore} from '../models/product';

const store = new ProductStore;

const index = async(req:express.Request , res:express.Response)=>{
    const products = await store.getAllProduct();
    res.json(products);
}
const create = async(req:express.Request , res:express.Response)=>{
    try{
        const newProduct : product ={
            title : req.body.title,
            price : req.body.price,
            descripe : req.body.descripe,
            company : req.body.company
        }
        const postProduct = await store.createProdct(newProduct);
        console.log("from products posting");
        res.json(postProduct);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}
const show = async(req:express.Request , res:express.Response)=>{
    const product = await store.getOneProduct(req.params.id);
    res.json(product);
}

const destroy =async(req:express.Request , res:express.Response)=>{
    const deletedProduct = await store.deleteProduct(req.params.id);
    res.json(deletedProduct);
}
const update = async(req:express.Request , res:express.Response)=>{
    const originalProduct = await store.getOneProduct(req.params.id);
    try{
        const updatedProduct : product ={
            title : req.body.title ? req.body.title : originalProduct.title,
            price : req.body.price ? req.body.price : originalProduct.price,
            descripe : req.body.descripe ? req.body.descripe : originalProduct.descripe,
            company : req.body.company ?req.body.company : originalProduct.company 
        }
        const theUpdatedProduct = await store.updateProduct(req.params.id , updatedProduct);
        res.json(theUpdatedProduct); 

    }catch(err){
        res.status(404);
        res.json(err);
    }
    
}

const productsHandler = (app:express.Application)=>{
    app.get('/products',index);
    app.get('/products/:id' , show);
    app.post('/products' , create);
    app.put('/products/:id' , update);
    app.delete('/products/:id' , destroy);
}

export default productsHandler;
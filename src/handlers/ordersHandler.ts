import express from 'express';
import { order,OrderStore } from '../models/order';

const store = new OrderStore;
const index = async(req:express.Request , res:express.Response)=>{
    const orders = await store.index();
    res.json(orders);
}

const create = async(req:express.Request , res:express.Response)=>{
    try{
        const newOrder : order ={
            products : req.body.products,
            userId : req.body.userId,
            status : req.body.status
        }
        const postOrder = await store.create(newOrder);
        res.json(postOrder);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}

const show = async(req:express.Request , res:express.Response)=>{
    const order = await store.show(req.params.id);
    res.json(order);
}

const destroy =async(req:express.Request , res:express.Response)=>{
    const deletedOrder = await store.delete(req.params.id);
    res.json(deletedOrder);
}

const ordersHandler = (app:express.Application)=>{
    app.get('/orders',index);
    app.get('/orders/:id' , show);
    app.post('/orders' , create);
    app.delete('/orders/:id' , destroy);
}

export default ordersHandler;
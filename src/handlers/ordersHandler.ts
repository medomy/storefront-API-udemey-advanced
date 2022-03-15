import express from 'express';
import { order, OrderStore } from '../models/order';
import verifyAuthToken from '../middlewares/verifyAuth';

const store = new OrderStore;
const index = async (req: express.Request, res: express.Response) => {
    try {
        const orders = await store.index();
        res.json(orders);

    } catch (err) {
        res.status(400);
        res.json(err);
    }

}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const newOrder: order = {
            products: req.body.products,
            userId: req.body.userId,
            status: req.body.status
        }
        const postOrder = await store.create(newOrder);
        res.json(postOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req: express.Request, res: express.Response) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}

const destroy = async (req: express.Request, res: express.Response) => {
    try {
        const deletedOrder = await store.delete(req.params.id);
        res.json(deletedOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const ordersHandler = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app.delete('/orders/:id', verifyAuthToken, destroy);
}

export default ordersHandler;
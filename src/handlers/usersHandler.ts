import express from 'express';
import { cartItem, user, UserStore } from '../models/user-authentication';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../middlewares/verifyAuth';

dotenv.config();
// token secret passed into the sign method of jwt to generate and return the user's token (used ternary operator as a null safety);
const token_secret: string = process.env.TOKEN_SECRET ? process.env.TOKEN_SECRET : "";
const store = new UserStore;

const index = async (req: express.Request, res: express.Response) => {
    const users = await store.index();
    res.json(users);
}

const show = async (req: express.Request, res: express.Response) => {
    const user = await store.show(req.params.id);
    const token = jwt.sign({ user: user }, token_secret);
    res.json(token);
}

const create = async (req: express.Request, res: express.Response) => {
    try {
        const newUser: user = {
            fName: req.body.firstName,
            lName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password
        }
        const postedUser = await store.create(newUser);
        const token = jwt.sign({ user: postedUser }, token_secret);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);

    }
}

const destroy = async (req: express.Request, res: express.Response) => {
    const deletedUser = await store.delete(req.params.id);
    res.json(deletedUser);
}
const update = async (req: express.Request, res: express.Response) => {
    const user = await store.show(req.params.id);
    try{
        const updatedUser:user = {
            fName : req.body.fName ? req.body.fName : user.fName,
            lName : req.body.lName ? req.body.lName : user.lName,
            userName : req.body.userName ? req.body.userName : user.userName,
            password : req.body.password ? req.body.password : user.password
        }
        const theUpdatedUser = await store.update(req.params.id , updatedUser);
        const token = jwt.sign({ user: theUpdatedUser }, token_secret);
        res.json(token);
    }catch(err){
        res.status(400);
        res.json(err);
    }
    
}
const authenticate = async (req: express.Request, res: express.Response) => {
    const authenticatedUser = await store.authinticate(req.body.userName, req.body.password);
    const token = jwt.sign({ user: authenticatedUser }, token_secret);
    res.json(token);
}
// for cart table (many to many relation between users and products);
const postCart = async (req: express.Request, res: express.Response) => {
    try {
        const postedCart = await store.addCartItem(req.body.quantity, req.params.id, req.body.productId);
        res.json(postedCart);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}
const getCart = async (req: express.Request, res: express.Response)=>{
    const cartItems = await store.getCartItem(req.params.id);
    res.json(cartItems);
}



const usersHandler = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users/authenticate', authenticate);
    app.post('/users', create);
    app.put('/users/:id' , verifyAuthToken, update); 
    app.delete('/users/:id', verifyAuthToken, destroy);
    app.post('/users/:id/cart' , postCart);
    app.get('/users/:id/cart' , getCart);
}

export default usersHandler;


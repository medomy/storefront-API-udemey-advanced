import express from 'express';
import { Dashboard } from '../services/dashboard';

const dashboard = new Dashboard;

const userswithcart = async (req : express.Request , res : express.Response)=>{
    const userswithcarts = await dashboard.usersCarts();
    res.json(userswithcart);
}

const dashboardHandler = (app:express.Application)=>{
    app.get('/userswithcarts' , userswithcart);
}
export default dashboardHandler;
import express from 'express';
import { Dashboard } from '../services/dashboard';

const dashboard = new Dashboard;

const userswithcart = async (req: express.Request, res: express.Response) => {
    try {
        const userswithcarts = await dashboard.usersCarts();
        res.json(userswithcart);

    } catch (err) {
        res.status(404);
        res.json(err);
    }

}

const dashboardHandler = (app: express.Application) => {
    app.get('/userswithcarts', userswithcart);
}
export default dashboardHandler;
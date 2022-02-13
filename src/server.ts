import  express  from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import productsHandler from "./handlers/productsHandler";
import usersHandler from "./handlers/usersHandler";
import dashboardHandler from "./handlers/dashboardHandler";

const app : express.Application = express();
const port : number = 3000;
const address : string = `http://localhost:${port}`;
const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use([cors(corsOptions) , bodyParser.json()]);

app.get('/',(req:express.Request , res: express.Response)=>{
    res.send('halloha there into my first ever api');
})

// applying handlers
productsHandler(app);
usersHandler(app);
dashboardHandler(app);

app.listen(port,()=>{
    console.log (`server opened at ${address}`);
})


// my Restful apis routes:
/*app.get('/products',(req:express.Request , res : express.Response)=>{
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.get('/products/:id',(req:express.Request , res : express.Response)=>{
    try {
        res.send('this is the SHOW route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.post('/products',(req:express.Request , res : express.Response)=>{
    try {
        res.send('this is the CREATEE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})
app.put('/products/:id',(req:express.Request , res : express.Response)=>{
    try {
        res.send('this is the UPDATE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})
app.delete('/products/:id',(req:express.Request , res : express.Response)=>{
    try {
        res.send('this is the DELETE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})*/

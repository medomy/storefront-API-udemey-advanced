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



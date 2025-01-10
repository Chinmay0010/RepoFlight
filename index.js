import express from 'express'
import {establishConection } from './DbConfig.js';
import bookRouter from './router/bookingRouter.js';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(cors({
    origin: 'http://127.0.0.1:5500' // allow only this origin
  }));
app.use(express.json());
app.use('/flight',bookRouter);

const port=4300
app.listen(port, () =>{
    establishConection();
    console.log("Server is running on port no " + port) ;
})
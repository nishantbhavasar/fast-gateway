import dotenv from 'dotenv';
import express from 'express';
dotenv.config({path:'../../.env'});

const server2 = express();

server2.get('/list', (req, res) => {
  res.send('server 2 list');
});


export default server2;
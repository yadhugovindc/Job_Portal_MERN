require('dotenv').config();

const express=require('express');
const server=express();
const cors=require('cors');
require('./config/connection')

server.use(cors());
server.use(express.json())

const router=require('./route/route')

server.use(router);

server.use('/uploads',express.static('./uploads'))

const PORT=3000;

server.listen(PORT,()=>{
  console.log(`server running on ${PORT}`); 
})
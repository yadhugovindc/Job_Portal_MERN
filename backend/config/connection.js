const mongoose=require('mongoose');

const connectionString=process.env.URI;

mongoose.connect(connectionString)
.then(()=>console.log('mongodb connected successfully'))
.catch((err)=>console.log(err))
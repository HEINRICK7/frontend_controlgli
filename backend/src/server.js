const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());
app.use(router);

const PORT = 3334;


app.listen( PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
         console.log(`connected server http://localhost:${PORT}`);
    }     
})
    
   

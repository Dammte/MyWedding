import express from 'express';
import axios from 'axios'

const app = express();

app.get('/', (req, res)=>{
    res.send("Hello World");   
});

app.listen(4000, ()=>{
    console.log("Server running on port", 4000)
})
import app from "./app.js";
import {mongoDB} from "./db.js";

// Call the method to connect with mongoDB
mongoDB();

// Call some methods to show the port
app.get('/', (req, res)=>{
    res.send("Backend of the application");   
});

app.listen(4000, ()=>{
    console.log("Server running on port", 4000)
})
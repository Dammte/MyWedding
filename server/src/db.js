import mongoose from "mongoose";
/**
 * @description 
 * This is a function for connect with mongoose Compass.
 * Path:
 * 1. Go to this link: https://account.mongodb.com/account/login?n=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F667b1655972d84153c046394&nextHash=%23overview&signedOut=true
 * 2. Then, create a new Database and a new Cluster.
 * 3. Then, add the ip address with the message: "Current IP Address not added. You will not be able to connect to databases from this address."
 *    With that address you can complete the connection with mongoose.
 * 4. For more access, you can install the extensión of VSCode called "MongoDB for VS Code" and that's all.
 * @exports 
 * Method of connect with mongoDB
*/
export const mongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://1xtierrax1:GtNDbyx8MObCDYW4@clusterformywedding.qvve52z.mongodb.net/"); // Here you can change the database connection.
        console.log("Connected to Mongoose");
    } catch (error) {
        console.log(error);
    }
};
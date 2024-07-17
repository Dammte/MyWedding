import jwt from "jsonwebtoken";
import {TOKEN_SECRET} from "../config.js";

/**
 * @description
 * This is ejecuted before to show others pages with authentication required, in this case, when the user does'nt
 * login or register can't join into the pages allows after login or register.
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next data from the application
 */
export const authenticationRequired = (req, res, next) => {
    // Get the token from the request-cookies.
    const {token} = req.cookies;

    // If the token doesn't exits, then return a status code with message.
    if(!token) return res.status(400).json({message: "No token, authorization denied"});
    
    // Verify the token of the user with jsonwebtoken, and allows the user join into the application.
    jwt.verify(token, TOKEN_SECRET, (err, user) =>{
        if(err) return res.status(401).json({message: "Invalid token"});
        req.user = user;
        next();
    });
};
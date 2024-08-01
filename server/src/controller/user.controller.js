import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

/**
 * @description
 * Function to register a new user. And validate if the email exists or not.
 * @param {*} req request
 * @param {*} res response
 * @returns response with the status code and message.
 */
export const register = async (req, res) =>{
    // Save the parameters of the request-body into the variables
    const { name, lastname, email, password, rol = "user" } = req.body;
    try {
        // Found an user with the same email or not.
        const userFound = await User.findOne({email});
        if(userFound) return res.status(400).json(["Email is already in use."]);

        // Generate a hash for the password's user with length 10.
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new user with the Schema of User
        const newUser = new User({
            name,
            lastname,
            email,
            password: passwordHash,
            rol,
        });

        // Save the newUser into database with mongoose.
        const savedUser = await newUser.save();

        // Generate a token for the user with the id of the new user
        const token = await createAccessToken({id: savedUser._id});

        // Set the cookie with the new token created for the user 
        res.cookie('token', token);


        res.json({
            id: savedUser._id,
            name: savedUser.name,
            lastname: savedUser.lastname,
            email: savedUser.email,
            rol: savedUser.rol,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @description
 * Function to login like a user.
 * @param {*} req request
 * @param {*} res response
 * @returns response with a status code and message.
 */
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Research for the user with the email and return a code if the user doesn't exist.
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(500).json(["User not found"]);

        // Validate the password with bcryptjs, the hash and the password wrote.
        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json(["Incorrect email or password"]);

        // Generate a token for the user with the id of the new user 
        const token = await createAccessToken({id: userFound._id});

        // Set the cookie with the new token created for the user 
        res.cookie('token', token);

        res.json({
            id: userFound._id,
            name: userFound.name,
            lastname: userFound.lastname,
            email: userFound.email,
            rol: userFound.rol,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @description
 * Function to logout in the application.
 * @param {*} req request
 * @param {*} res response
 * @returns Status code 200 for successful logout.
 */
export const logout = async (req, res) => {
    // Set the token to void. This delete the token when logout the user.
    res.cookie("token", "", {
        expires: new Date(0),
    });
    // Return a status 200 code for successful logout.
    return res.sendStatus(200);
};

/**
 * @description
 * With this the user can see all their information like "name", "email", etc...
 * @param {*} req request
 * @param {*} res response
 * @returns response with all the information of the user.
 */
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json(["User not found"]);
    return res.json({
        id: userFound._id,
        name: userFound.name,
        lastname: userFound.lastname,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};


/**
 * @description
 * This verify the token from the cookies with the token for each user. Is used for don't allow the person not authorized if doesn't login
 * or register before. It doesn't allow to navigate into differents pages if doesn't authorized.
 * @param {*} req request
 * @param {*} res response
 * @returns response with a status code if the token or the user isn't found. But if the token and the user is found, then return the data. 
 */
export const verifyToken = async (req, res) => {
    // Get the token from the request-cookies.
    const {token} = req.cookies;

    // It the token doesn't exits, then return a status code with a message.
    if(!token) return res.status(401).json({message: "Unauthorized"}); 

    // With the function of jsonwebtoken, verify the token with the token of each user and found it if it exits.
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "Unauthorized"});

        const userFound = await User.findById(user.id);

        if(!userFound) return res.status(401).json({message: "Unauthorized"});

        return res.json({
            id: userFound._id,
            name: userFound.name,
            lastname: userFound.lastname,
            email: userFound.email, 
        });
    });
};
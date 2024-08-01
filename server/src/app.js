import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";


import userRoutes from "./routes/user.routes.js";

const app = express();

/**
 * @description
 * With the command "morgan('dev')", we can see the status codes with differents colors. Green for 200's codes, etc...
 * With "express.json()" we can see the request-body in format json, more easy to see the information.
 * With "cookieParser()" we can parse the cookies in a format that we can see it.
 * We need to use cors because we wanted to connect two ports for its own funtionality.
 * For cors we need to define a origin that it's the port of own frontend. And we need to allow the credentials
 * for the access to the front.
 * @exports 
 * app for the use in application.
 */
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api", userRoutes);

export default app;
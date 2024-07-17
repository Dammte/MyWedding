import { Router } from "express";
import { login, logout, profile, register, verifyToken } from "../controller/user.controller.js"
import {validateSchema} from "../middleware/validateSchema.js";
import {registerSchema, loginSchema} from "../schemas/user.schema.js";
import {authenticationRequired} from "../middleware/validateToken.js";

const router = Router();
/**
 * @description
 * Those routes are used to navigate into the application.
 * There are some levels to security, for example:
 *  In /register, first validate the schema and if the schema is valid, then continue with the method of register.
 *  Is the same with /login.
 *  /verify is for verify if the token is valid and exists for every user.
 *  /profile, first verify if the token exists for the user and then continue showing the profile of the user.
 */
router.post('/register', validateSchema(registerSchema),  register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout); 
router.get('/verify', verifyToken);
router.get('/profile', authenticationRequired, profile);

export default router;
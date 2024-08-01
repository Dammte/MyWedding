import axios from "./axios.js";

/**
 * @description This function sends a POST request to register a user.
 * @param {Object} user This is the user information provided from the frontend.
 * @returns {Promise} A promise that resolves to the response of the registration request.
 */
export const registerRequest = (user) => axios.post(`/register`, user);

/**
 * @description This function sends a POST request to login a user.
 * @param {Object} user This is the user information provided from the frontend.
 * @returns {Promise} A promise that resolves to the response of the login request.
 */
export const loginRequest = (user) => axios.post(`/login`, user);

/**
 * @description This function sends a GET request to verify a user's token.
 * @returns {Promise} A promise that resolves to the response of the token verification request.
 */
export const verifyTokenRequest = () => axios.get(`/verify`);
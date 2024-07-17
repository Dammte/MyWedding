import jwt from "jsonwebtoken";
import TOKEN_SECRET from "../config.js";

/**
 * @description
 * Function to create an access token for each user. This create a promise for use response with a result or error.
 * @param {*} payload Parameter for login into the application
 * @returns return a resolve or a reject. Depends if the token has access or not.
 */
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

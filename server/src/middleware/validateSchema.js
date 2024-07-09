/**
 * @description
 * Validate the schema created for the user.
 * @param {*} schema schema created for the user "userSchema".
 * @returns Status code with all the errors.
 */
export const validateSchema = (schema) => (req, res, next) => {
  try {
    // Parse the request-body into the schema created for the user.
    schema.parse(req.body);
    next();
  } catch (error) {
    // Return a response status code with all the errors that have been found
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};

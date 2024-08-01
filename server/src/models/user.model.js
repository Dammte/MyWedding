import mongoose from "mongoose";

/**
 * @description
 * We use a Schema for save all the information of a user.
 * type: is the value that can save a variable in the database.
 * required: true or false.
 * trim: This is when a parameter with a string wrote like this: " Hello", "Hello ", " Hello ". And it's save like this: "Hello".
 *       This delete the space.
 * timestamps is for save the time when the user login or register into the database.
 * @exports
 * We export the schema for use it in differents contexts.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
      trim: true,
    },
    lastname: {
      type: "string",
      required: false,
      trim: true,
    },
    email: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    rol: {
      type: "string",
      enum: ["user", "admin"],
      default: "user",
    }
  },
  {
    timestamps: true,
  }
);

// Export the model to be used in others class.
export default mongoose.model('User', userSchema);

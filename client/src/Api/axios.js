import axios from "axios";

/**
 * @description
 * This instance represents the connection with the server used axios for it.
 * @var baseURL This is for select the path that we want to connect with.
 * @var withCredentials This mean that when we want to verify all the information like cookies and the user for allow
 * the user use the pages with the true credentials.
 */
const instances = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
});

export default instances;
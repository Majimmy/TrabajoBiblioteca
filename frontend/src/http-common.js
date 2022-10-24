import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",//MUY IMPORTANTE ESTA LINEA, Si NO, NO ES POSIBLE HACER PUT/POST/CREATE
  }
});
// import http from "../http-common";
import axios from 'axios';



const http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});

class AllServices {
  getAll() {
    return http.get("/employees");
  }

  create(data) {
    return http.post("/employees", data);
  }
  update(id, data) {
    return http.put(`/employees/${id}`, data);
  }
  delete(id) {
    return http.delete(`/employees/${id}`);
  }
  get(id) {
    return http.get(`/employees/${id}`);
  }
}

export default new AllServices();
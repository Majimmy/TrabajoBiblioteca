import http from "../http-common";

class ServicioUsers {
    getAll() {
        return http.get("/users");
    }
    get(id) {
        return http.get(`/users/${id}`);
    }
    create(data) {
        return http.post("/users", data);
    }
    update(id, data) {
        return http.put(`/users/${id}`, data);
    }   
    // por fin solucionado problema que no respondian las funciones put/post/create (bieeen!)
    delete(id) {
        return http.delete(`/users/${id}`);
    }
    deleteAll() {
        return http.delete(`/users`);
    }
    findByTitle(nombre) {
        return http.get(`/users?nombre=${nombre}`);
    }
}
export default new ServicioUsers();
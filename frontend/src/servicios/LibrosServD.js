import http from "../http-common";

class ServicioLibros {
    getAll() {
        return http.get("/libros");
    }
    get(id) {
        return http.get(`/libros/${id}`);
    }
    create(data) {
        return http.post("/libros", data);
    }
    update(id, data) {
        return http.put(`/libros/${id}`, data);
    }   
    // por fin solucionado problema que no respondian las funciones put/post/create (bieeen!)
    delete(id) {
        return http.delete(`/libros/${id}`);
    }
    deleteAll() {
        return http.delete(`/libros`);
    }
    findByTitle(titulo) {
        return http.get(`/libros?titulo=${titulo}`);
    }
}
export default new ServicioLibros();
import http from "../http-common";
//se utiliza http para utilizar la ruta donde se leeran los datos
class ServicioLibros {
    getAll() {
        return http.get("/libros"); //pide todos los libros
    }
    get(id) {
        return http.get(`/libros/${id}`); //pide libro por id
    }
    create(data) {
        return http.post("/libros", data); //crea libro (post)
    }
    update(id, data) {
        return http.put(`/libros/${id}`, data); //actualiza libro (put)
    }   
    // por fin solucionado problema que no respondian las funciones put/post/create (bieeen!)
    delete(id) {
        return http.delete(`/libros/${id}`); //borra libro por id. NOTA:por id es lo mas seguro, podrian haber titulos repetidos y se presentrian problemas.
    }
    deleteAll() {
        return http.delete(`/libros`); //borra todos los libros (precaucion)
    }
    findByTitle(titulo) {
        return http.get(`/libros?titulo=${titulo}`); // pide libro por concurrencia de titulo
    }
}
export default new ServicioLibros(); //exporta todas las funciones

<!-- pagina modificadora de libros -->
<template>
    <div v-if="libroActual" class="formaEdicion">
        <h4>Libro</h4>
        <form>
            <div class="formaGrupo">
                <label for="titulo">Titulo</label>
                <input type="text" class="formaControl" id="titulo" v-model="libroActual.titulo"/>
            </div>
            <div class="formaGrupo">
                <label for="descripcion">Descripcion</label>
                <textarea rows = "5" cols = "60" id="descripcion" 
                v-model="libroActual.descripcion">
                </textarea>
            </div>
            <div class="formaGrupo">
                <label><strong>Estado:</strong></label>
                {{ libroActual.disponible ? "Disponible" : "No disponible" }}
            </div>
        </form>
        <button class="icono actu1" v-if="libroActual.disponible" @click="cambiaDisp(false)">Marcar Ocupado</button>
        <button v-else class="icono actu2" @click="cambiaDisp(true)">Marcar Disponible</button>
        <router-link :to="'/'">
            <button class="icono bor" @click="borrarLibro">Borrar</button>
        </router-link>
        <button type="submit" class="icono btn-success" @click="actualizarLibro">Actualizar</button>
        <p>{{ mensaje }}</p>
    </div>
    <div v-else>
        <br />
        <p>Porfavor, haga click en un Libro...</p>
    </div>
</template>

<script>
import ServicioLibros from "../servicios/LibrosServD.js"; //se importan funciones de LibrosServD
export default {
    name: "objeto-libro",
    data() {  //inicializa objetos para la pagina
        return {
            libroActual: null, // inicializa libro actual
            mensaje: ""
        };
    },
    methods: {
        getLibro(id) {
            ServicioLibros.get(id) //utiliza una de las funciones exportadas
            .then(response => {
                this.libroActual = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
        cambiaDisp(status) {
            var data = { //crea un grupo de datos que sea compatible con las funciones de LibrosServD.js
                id: this.libroActual.id,
                titulo: this.libroActual.titulo,
                descripcion: this.libroActual.descripcion,
                disponible: status
            };
            ServicioLibros.update(this.libroActual.id, data) //utiliza una de las funciones exportadas
            .then(response => {
                console.log(response.data);
                this.libroActual.disponible = status;
                this.mensaje = "Disponibilidad Actualizada";
            })
            .catch(e => {
                console.log(e);
            });
        },
        actualizarLibro() {
            ServicioLibros.update(this.libroActual.id, this.libroActual) //utiliza una de las funciones exportadas
            .then(response => {
                console.log(response.data);
                this.mensaje = "El libro ha sido actualizado exitosamente";
            })
            .catch(e => {
                console.log(e);
            });
        },
        borrarLibro() {
            ServicioLibros.delete(this.libroActual.id) //utiliza una de las funciones exportadas
            .then(response => {
                console.log(response.data);
                this.$router.push({ name: "libros" }); //nota: mejor estancia de borrado creada satisfactoriamente!
            })               
            .catch(e => {    //sugerencia: que surja un cuadro de advertencia y devuelva al usuario a la pagina inicial
                console.log(e);
            });
            alert("Libro borrado!");
        }
    },
    mounted() { //monta/prepara la primera funcion
        this.mensaje = "";
        this.getLibro(this.$route.params.id);
    }
};
</script>

<style>
.formaEdicion {
    max-width: 300px;
    margin: auto;
    color: rgb(242, 232, 238);
}
.icono{
    color: rgb(242, 232, 238);
    border-radius: 5px;
}
.bor{
    background-color: tomato;
}
.actu1{
    background-color: rgb(255, 177, 52);
}
.actu2{
    background-color: rgb(96, 158, 213);
}
</style>

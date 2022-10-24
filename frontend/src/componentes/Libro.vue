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
                <input type="text" class="formaControl" id="descripcion" v-model="libroActual.descripcion"/>
            </div>
            <div class="formaGrupo">
                <label><strong>Estado:</strong></label>
                {{ libroActual.disponible ? "Disponible" : "No disponible" }}
            </div>
        </form>
        <button class="icono iconoP mr2" v-if="libroActual.disponible" @click="cambiaDisp(false)">Marcar Ocupado</button>
        <button v-else class="icono iconoP mr2" @click="cambiaDisp(true)">Marcar Disponible</button>
        <button class="icono iconoW mr2" @click="borrarLibro">Borrar</button>
        <button type="submit" class="icono iconoS" @click="actualizarLibro">Actualizar</button>
        <p>{{ mensaje }}</p>
    </div>
    <div v-else>
        <br />
        <p>Porfavor, haga click en un Libro...</p>
    </div>
</template>

<script>
import ServicioLibros from "../servicios/LibrosServD.js";
export default {
    name: "objeto-libro",
    data() {
        return {
            libroActual: null,
            mensaje: ""
        };
    },
    methods: {
        getLibro(id) {
            ServicioLibros.get(id)
            .then(response => {
                this.libroActual = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
        cambiaDisp(status) {
            var data = {
                id: this.libroActual.id,
                titulo: this.libroActual.titulo,
                descripcion: this.libroActual.descripcion,
                disponible: status
            };
            ServicioLibros.update(this.libroActual.id, data)
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
            ServicioLibros.update(this.libroActual.id, this.libroActual)
            .then(response => {
                console.log(response.data);
                this.mensaje = "El libro ha sido actualizado exitosamente";
            })
            .catch(e => {
                console.log(e);
            });
        },
        borrarLibro() {
            ServicioLibros.delete(this.libroActual.id)
            .then(response => {
                console.log(response.data);
                this.$router.push({ name: "libros" }); //nota: crear una mejor estancia de borrado
            })               //La actual borra bien, pero congela la pagina en pantalla
            .catch(e => {    //sugerencia: que surja un cuadro de advertencia y te devuelva a la pagina inicial
                console.log(e);
            });
        }
    },
    mounted() {
        this.mensaje = "";
        this.getLibro(this.$route.params.id);
    }
};
</script>

<style>
.formaEdicion {
    max-width: 300px;
    margin: auto;
}
</style>
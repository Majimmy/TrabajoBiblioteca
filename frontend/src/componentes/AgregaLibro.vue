<template>
    <div class="formaEnvio">
        <div v-if="!enviado">
            <div class="formaGrupo">
                <label for="titulo">Titulo</label>
                <input type="text" class="formaControl" id="titulo"
                required v-model="libro.titulo" name="titulo"/>
            </div>
            <div class="formaGrupo">
                <label for="descripcion">Descripcion</label>
                <input class="formaControl" id="descripcion"
                required v-model="libro.descripcion" name="descripcion"/>
            </div>
            <button @click="guardaLibro" class="btn btn-success">Enviar</button>
        </div>
        <div v-else>
            <h4>Enviado correctamente</h4>
            <button class="btn btn-success" @click="nuevoLibro">Agregar</button>
        </div>
    </div>
</template>

<script>
import ServicioLibros from "../servicios/LibrosServD"; //se crea una funcion a base de lo exportado en LibrosServD
export default {
    name: "Agregar-Libro",
    data() {  // inicializa un modelo de datos el cual tiene la forma de un objeto libro 
        return {
            libro: {
                id: null,
                titulo: "",
                descripcion: "",
                disponible: false
            },
            enviado: false // booleano para determinar cuando ese mensaje se muestre.
        };
    },
    methods: {
        guardaLibro() { // funcion de pagina que realiza pasos para guardar libro
            var data = {  //crea un grupo de datos que sea compatible con las funciones de LibrosServD.js
                titulo: this.libro.titulo,
                descripcion: this.libro.descripcion
            };
            ServicioLibros.create(data) //utiliza una de las funciones exportadas
            .then(response => {
                this.libro.id = response.data.id;
                console.log(response.data);
                this.enviado = true;
            })
            .catch(e => {
                console.log(e);
            });
        },
        nuevoLibro() { //resetea el libro actual (de la pagina) para crear otro
            this.enviado = false;
            this.libro = {};
        }
    }
};
</script>
<!-- proxima semana se concentrará en el aspecto de las paginas -->
<style>
.formaEnvio {
    max-width: 300px;
    margin: auto;
}
</style>

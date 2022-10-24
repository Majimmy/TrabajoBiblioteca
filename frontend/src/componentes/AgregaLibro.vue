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
import ServicioLibros from "../servicios/LibrosServD";
export default {
    name: "Agregar-Libro",
    data() {
        return {
            libro: {
                id: null,
                titulo: "",
                descripcion: "",
                disponible: false
            },
            enviado: false
        };
    },
    methods: {
        guardaLibro() {
            var data = {
                titulo: this.libro.titulo,
                descripcion: this.libro.descripcion
            };
            ServicioLibros.create(data)
            .then(response => {
                this.libro.id = response.data.id;
                console.log(response.data);
                this.enviado = true;
            })
            .catch(e => {
                console.log(e);
            });
        },
        nuevoLibro() {
            this.enviado = false;
            this.libro = {};
        }
    }
};
</script>

<style>
.formaEnvio {
    max-width: 300px;
    margin: auto;
}
</style>
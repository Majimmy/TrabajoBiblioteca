<template>
  <div class="lista fila">
    <div class="columnaA">
      <div class="inputGrupo mb-3">
        <input type="text" class="formaControl" placeholder="Buscar por titulo"
          v-model="titulo"/>
        <div class="inputGrupoAp">
          <button class="btn btnSecundario" type="button" @click="buscaTitulo">Buscar</button>
        </div>
      </div>
    </div>
    <div class="columnaB">
      <h4>Lista de libros</h4>
      <ul class="grupoLista">
        <li class="grupoListaI" :class="{ active: index == currentIndex }"
          v-for="(libro, index) in libros" :key="index" @click="activaLibro(libro, index)">
          {{ libro.titulo }}
        </li>
      </ul>
      <button class="m-3 btn btnS btnD" @click="borraTodosLibros">Borrar Todos</button>
    </div>
    <div class="columnaB">
      <div v-if="libroActual">
        <h4>Libro</h4>
        <div>
          <label><strong>Titulo:</strong></label> {{ libroActual.titulo }}
        </div>
        <div>
          <label><strong>Descripcion:</strong></label> {{ libroActual.descripcion }}
        </div>
        <div>
          <label><strong>Disponibilidad:</strong></label> {{ libroActual.disponible ? "Disponible" : "No disponible" }}
        </div>
        <router-link :to="'/libros/' + libroActual.id" class="icono iconoW">Editar</router-link>
      </div>
      <div v-else>
        <br />
        <p>Porfavor, haga click en un Libro...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ServicioLibros from "../servicios/LibrosServD";
export default {
  name: "lista-libros",
  data() {
    return {
      libros: [],
      libroActual: null,
      currentIndex: -1,
      titulo: ""
    };
  },
  methods: {
    buscaLibros() {
      ServicioLibros.getAll()
        .then(response => {
          this.libros = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refrescarLista() {
      this.buscaLibros();
      this.libroActual = null;
      this.currentIndex = -1;
    },
    activaLibro(libro, index) {
      this.libroActual = libro;
      this.currentIndex = libro ? index : -1;
    },
    borraTodosLibros() {
      ServicioLibros.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refrescarLista();
        })
        .catch(e => {
          console.log(e);
        });
    },
    buscaTitulo() {
      ServicioLibros.findByTitle(this.titulo)
        .then(response => {
          this.libros = response.data;
          this.activaLibro(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.buscaLibros();
  }
};
</script>

<style>
.lista {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
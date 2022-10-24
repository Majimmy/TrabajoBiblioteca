<!-- parte de pagina inicial. lista de libros y buscador -->
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
import ServicioLibros from "../servicios/LibrosServD"; //se importan funciones de LibrosServD
export default {
  name: "lista-libros",
  data() { //inicializa objetos para la pagina
    return {
      libros: [], // para hacer un arreglo de libros
      libroActual: null, // refiere al libro actual
      currentIndex: -1, // valor para determinar su visualizacion
      titulo: ""
    };
  },
  methods: {
    buscaLibros() {
      ServicioLibros.getAll() //utiliza una de las funciones exportadas
        .then(response => {
          this.libros = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refrescarLista() { // esconde la descripcion y muestra solo lo que esta en busqueda
      this.buscaLibros();
      this.libroActual = null;
      this.currentIndex = -1;
    },
    activaLibro(libro, index) { // muestra la descripcion y opcion de editar de un libro al haber hecho click en el
      this.libroActual = libro;
      this.currentIndex = libro ? index : -1;
    },
    borraTodosLibros() {  // borra todos los libros de la base de datos (tenga cuidado, no es reversible)
      ServicioLibros.deleteAll() //utiliza una de las funciones exportadas
        .then(response => {
          console.log(response.data);
          this.refrescarLista();
        })
        .catch(e => {
          console.log(e);
        });
    },
    buscaTitulo() { //entrega los libros que concuerden con el titulo ingresado
      ServicioLibros.findByTitle(this.titulo) //utiliza una de las funciones exportadas
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
  mounted() { // utilizacion inicial del metodo para tener la lista inicial
    this.buscaLibros();
  }
};
</script>
<!-- proxima semana se concentrará en el aspecto de las paginas -->
<style>
.lista {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>

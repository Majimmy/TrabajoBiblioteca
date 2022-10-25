<!-- parte de pagina inicial. lista de libros y buscador -->
<template>
  <div id="total">
    <div class="seccion1">
      <div class="parteA">
        <div class="inputGrupo mb-3">
          <input type="text" class="formaControl" placeholder="Buscar por titulo"
            v-model="titulo"/>
          <div class="inputGrupoAp">
            <button class="btn btnSecundario" type="button" @click="buscaTitulo">Buscar</button>
          </div>
        </div>
      </div>
      <div class="parteB">
        <h4>Lista de libros</h4>
        <div class="grupo libro" :class="{ active: index == currentIndex }"
          v-for="(libro, index) in libros" :key="index" @click="activaLibro(libro, index)">
          <p>{{ libro.titulo }}</p>
        </div>
        <button class="m-3 btn btnS btnD" @click="borraTodosLibros">Borrar Todos</button>
      </div>
    </div>
    <div class="seccion2">
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
#total {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
#total > div {
  width: 50%;
}
.grupo {
  width: 380px;
  margin: 3px;
  padding: 5px 20px;
  color: rgb(242, 232, 238);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.libro {
  background-color: rgb(83, 146, 202);
  cursor: pointer;
  height: 36px;
  text-align: left;
  width: 350px;
}
.seccion2 {
  margin-top: 100px;
}
</style>

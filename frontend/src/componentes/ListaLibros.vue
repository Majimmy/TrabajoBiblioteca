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
        <h4>Lista de libros</h4><br/>
        <div class="grupo libro" :class="{ active: index == currentIndex }"
          v-for="(libro, index) in libros" :key="index" @click="activaLibro(libro, index)">
          <p>{{ libro.titulo }}</p>
        </div>
        <button v-if="adm" class="m-3 btn btnS btnD" @click="borraTodosLibros">Borrar Todos</button>
      </div>
    </div>
    <div class="seccion2">
      <div class= "cuadro" v-if="libroActual">
        <h4>Libro</h4>
        <div>
          <label><strong>Titulo:</strong></label><br /> {{ libroActual.titulo }}
        </div>
        <div>
          <br />
          <label><strong>Descripcion:</strong></label><br /> {{ libroActual.descripcion }}
        </div>
        <div>
          <br />
          <label><strong>Disponibilidad:</strong></label> {{ libroActual.disponible ? "Disponible" : "No disponible" }}
        </div>
        <div v-if="!libroActual.disponible">
          
          <label><strong>Usuario:</strong></label>
          <div class="usdesc">
            Nombre: {{ desc1 }}<br />Rut: {{ desc2 }}<br />Correo: {{ desc3 }}
          </div>
        </div>
        <router-link :to="'/libros/' + libroActual.id" class="icon iconoW">Editar</router-link>
      </div>
      <div v-else>
        <br />
        <p><strong>Porfavor, haga click en un Libro...</strong></p>
        <img src="../assets/list.png" alt="lista" width="500" height="500">
      </div>
    </div>
  </div>
</template>

<script>
import ServicioLibros from "../servicios/LibrosServD"; //se importan funciones de LibrosServD
import ServicioUsers from "../servicios/UsersServD";
export default {
  name: "lista-libros",
  data() { //inicializa objetos para la pagina
    return {
      libros: [], // para hacer un arreglo de libros
      libroActual: null, // refiere al libro actual
      currentIndex: -1, // valor para determinar su visualizacion
      titulo: "",
      adm: false,
      desc1: "",
      desc2: "",
      desc3: "",
      userActual: null
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
      this.desc1="";
      this.desc2="";
      this.desc3="";
    },
    activaLibro(libro, index) { // muestra la descripcion y opcion de editar de un libro al haber hecho click en el
      this.libroActual = libro;
      this.currentIndex = libro ? index : -1;
      if(this.libroActual.usuario){
        this.dataUser();
      }
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
    },
    dataUser(){
      ServicioUsers.get(this.libroActual.usuario)
        .then(response=> {
          this.userActual = response.data;
          this.desc1=this.userActual.nombre;
          this.desc2=this.userActual.rut;
          this.desc3=this.userActual.correo;
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
<style>
#total {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
#total > div {
  width: 45%;
}
.btnSecundario{
  width: 70px;
  margin: 6px 0px;
  padding: 4px;
}
.btn {
  color: rgb(242, 232, 238);
  background-color: rgb(85, 85, 85);
}
.parteB {
  color: rgb(242, 232, 238);
}
.grupo {
  width: 380px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.libro {
  padding: 0px 5px;
  background-color: rgb(83, 146, 202);
  cursor: pointer;
  min-height: 10px;
  text-align: left;
  width: 350px;
  
}
.seccion2 {
  margin-top: 100px;
  color: rgb(242, 232, 238);
}
.cuadro {
  border: 5px solid rgb(60, 60, 69);
  border-radius: 5px;
  min-height: 150px;
  padding: 20px;
  background-color: rgb(72, 72, 84);
}
.usdesc{
    margin: -10px 30px 5px 10px;
}
</style>

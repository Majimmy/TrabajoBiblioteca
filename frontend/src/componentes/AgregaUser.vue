<!-- parte donde se agregan nuevos libros -->
<template>
    <div id="total2">
        <div class="seccionA">
            <div class="formaEnvio2">
                <div v-if="!enviado">
                    <div class="formaGrupo2">
                        <h4>Agregar nuevo usuario</h4><br />
                        <label for="nombre">Nombre</label>
                        <input type="text" class="formaControl2" id="nombre"
                        required v-model="userRef.nombre" name="nombre"/>
                    </div>
                    <div class="formaGrupo2">
                        <label for="rut">Rut</label>
                        <input type="text" class="formaControl2" id="rut"
                        required v-model="userRef.rut" name="rut"/>
                    </div>
                    <button @click="guardaUser" class="btn2 btn-success">Enviar</button>
                </div>
                <div v-else>
                    <h4>Enviado correctamente</h4>
                    <button class="btn2 btn-success" @click="nuevoUser">Agregar Otro Usuario</button>
                </div>
            </div>
            <div class="parte2">
                <h4>Usuarios</h4><br/>
                <div class="grupo2 user" :class="{ active: index == currentIndex }"
                v-for="(user, index) in users" :key="index" @click="activaUser(user, index)">
                    <p>{{ user.nombre }}</p>
                </div>
            </div>
        </div>
        <div class="seccionB">
            <div class= "cuadro2" v-if="userActual">
                <br />
                <h4>Usuario</h4>
                <div>
                    <label><strong>Nombre:</strong></label><br /> {{ userActual.nombre }}
                </div>
                <div>
                    <br />
                    <label><strong>Rut:</strong></label><br /> {{ userActual.rut }}
                </div>
                    <button class="icono bor" @click="borrarUser">Borrar</button>
                </div>
            <div v-else>
                <br />
                <p><strong>Porfavor, haga click en un Usuario...</strong></p>
                <img src="../assets/list.png" alt="lista" width="500" height="500">
            </div>
        </div>
    </div>
</template>

<script>
import ServicioUsers from "../servicios/UsersServD"; //se importan funciones 
export default {
    name: "ver-agregar-usuario",
    data() {  // inicializa objetos para la pagina.
        return {
            userRef: {
                id: null,
                nombre: "",
                rut: null,
            },
            users: [], // para hacer un arreglo de libros
            userActual: null, // refiere al user actual
            currentIndex: -1, // valor para determinar su visualizacion
            enviado: false // booleano para determinar cuando ese mensaje se muestre.
        };
    },
    methods: {
        buscaUsers() {
            ServicioUsers.getAll() //utiliza una de las funciones exportadas
            .then(response => {
                this.users = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
        refrescarLista() { // esconde la descripcion y muestra solo lo que esta en busqueda
            this.buscaUsers();
            this.userActual = null;
            this.currentIndex = -1;
        },
        guardaUser() { // funcion de pagina que realiza pasos para guardar libro
            var data = {  //crea un grupo de datos que sea compatible con las funciones de LibrosServD.js
                nombre: this.userRef.nombre,
                rut: this.userRef.rut
            };
            ServicioUsers.create(data) //utiliza una de las funciones exportadas
            .then(response => {
                this.userRef.id = response.data.id;
                console.log(response.data);
                this.enviado = true;
            })
            .catch(e => {
                console.log(e);
                alert("Rut repetido o parametros invalidos!");
            });
            this.refrescarLista();
        },
        nuevoUser() { //resetea el user actual (de la pagina) para crear otro
            this.enviado = false;
            this.userRef = {};
        },
        activaUser(user, index) { // muestra la descripcion y opcion de editar de un libro al haber hecho click en el
            this.userActual = user;
            this.currentIndex = user ? index : -1;
        },
        borrarUser() {
            ServicioUsers.delete(this.userActual.id) //utiliza una de las funciones exportadas
            .then(response => {
                console.log(response.data);
                this.$router.push({ name: "users" }); //nota: mejor estancia de borrado creada satisfactoriamente!
            })               
            .catch(e => {
                console.log(e);
            });
            alert("Usuario borrado!");
            this.refrescarLista();
        }
    },
    mounted() { // utilizacion inicial del metodo para tener la lista inicial
        this.refrescarLista();
    }
};
</script>
<!-- proxima semana se concentrará en el aspecto de las paginas -->
<style>
.formaEnvio2 {
    max-width: 300px;
    margin: left;
    color: rgb(242, 232, 238);
}
.formaControl2{
    width: 400px;
}
.btn2{
    margin: 4px 0px;
}
#total2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
#total2 > div {
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
.parte2{
    color: rgb(242, 232, 238);
}
.grupo2 {
  width: 380px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.user {
  padding: 0px 5px;
  background-color: rgb(83, 146, 202);
  cursor: pointer;
  min-height: 10px;
  text-align: left;
  width: 350px;
  
}
.seccionB {
  margin-top: 100px;
  color: rgb(242, 232, 238);
}
.cuadro2 {
  border: 5px solid rgb(60, 60, 69);
  border-radius: 5px;
  min-height: 150px;
  padding: 20px;
  background-color: rgb(72, 72, 84);
}
</style>
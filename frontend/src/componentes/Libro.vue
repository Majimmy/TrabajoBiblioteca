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
            <div v-if="!libroActual.disponible" class="formaGrupo">
                <label><strong>Usuario:</strong></label>
                <div class="usdesc">
                    Nombre: {{ desc1 }}<br />Rut: {{ desc2 }}<br />Correo: {{ desc3 }}
                </div>
            </div>
        </form>
        <button class="icono actu1" v-if="libroActual.disponible" @click="muestraUsersL()">Marcar Ocupado</button>
        <button v-else class="icono actu2" @click="cambiaDisp(true, null)">Marcar Disponible</button>
        <div v-if="listUs">
            <br />
            <label>Lista de usuarios ingresados:</label>
            <br />
            <div class="grupo3" :class="{ active: index == currentIndex }"
                v-for="(user, index) in users" :key="index" @click="activaUser(user, index)">
                <p>{{ user.nombre }} ({{user.rut}})</p>
            </div>
        </div>
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
import ServicioUsers from "../servicios/UsersServD";
export default {
    name: "objeto-libro",
    data() {  //inicializa objetos para la pagina
        return {
            libroActual: null, // inicializa libro actual
            mensaje: "",
            listUs: false,
            users: [], // para hacer un arreglo de usuarios
            userActual: null,
            currentIndex: -1,
            desc1: "",
            desc2: "",
            desc3: ""
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
        getLibro(id) {
            ServicioLibros.get(id) //utiliza una de las funciones exportadas
            .then(response => {
                this.libroActual = response.data;
                if(this.libroActual.usuario){
                this.dataUser();
            }
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
        muestraUsersL(){
            this.listUs=true;
            alert("Seleccione un usuario.");
        },
        actualizarUser() {
            ServicioUsers.update(this.userActual.id, this.userActual) //utiliza una de las funciones exportadas
            .then(response => {
                console.log(response.data);
                this.mensaje = "El user ha sido actualizado exitosamente";
            })
            .catch(e => {
                console.log(e);
            });
        },
        cambiaDisp(status, str) {
            if(status){
                this.userActual.devolver--;
            }
            this.actualizarUser();
            var data = { //crea un grupo de datos que sea compatible con las funciones de LibrosServD.js
                id: this.libroActual.id,
                titulo: this.libroActual.titulo,
                descripcion: this.libroActual.descripcion,
                disponible: status,
                usuario: str
            };
            ServicioLibros.update(this.libroActual.id, data) //utiliza una de las funciones exportadas
            .then(response => {
                console.log(response.data);
                this.libroActual.disponible = status;
                this.libroActual.usuario = str;
                this.mensaje = "Disponibilidad Actualizada";
                this.listUs=false;
            })
            .catch(e => {
                console.log(e);
            });
        },
        activaUser(user, index) { 
            this.userActual = user;
            this.currentIndex = user ? index : -1;
            this.desc1=this.userActual.nombre;
            this.desc2=this.userActual.rut;
            this.desc3=this.userActual.correo;
            this.userActual.devolver++;
            this.cambiaDisp(false, this.userActual.id);
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
            if(!this.libroActual.disponible){
                alert("Debe marcar disponible: el libro debe ser devuelto primero!\nDe vuelta a la lista de libros..");
            }
            else{
                ServicioLibros.delete(this.libroActual.id) //utiliza una de las funciones exportadas
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "libros" }); //nota: mejor estancia de borrado creada satisfactoriamente!
                })               
                .catch(e => {
                    console.log(e);
                });
                alert("Libro borrado!");
            }
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
    mounted() { //monta/prepara la primera funcion
        this.mensaje = "";
        this.buscaUsers();
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
.grupo3{
    background-color: rgb(174, 176, 166);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    padding: 0px 5px;
    cursor: pointer;
    min-height: 10px;
    text-align: left;
    width: 300px;
}
.usdesc{
    margin: -10px 30px 5px 10px;
}
</style>

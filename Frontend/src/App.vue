<template>
  <h1>Biblioteca mini</h1>
  <input type="text" v-model="input" placeholder="Busca libros..." />    /* cuadro de busqueda */
  <button @click="update"> Actualizar Lista </button>                    /*boton para actualizar la lista llamando una funcion get (por ahora añande 1 solo elemento)*/
 <div class="item libro" v-for="libro in filteredList()" :key="libro">   /*lista de libros disponobles, y filtra la lista disponible segun lo que hay en el cuadro de busqueda*/
   <p>{{ libro }}</p>
 </div>
 <div class="item error" v-if="input&&!filteredList().length">           /*cuadro que avisa que el elemento del cuadro de busqueda, no se encuentra*/
    <p>No se encontraron resultados</p>
 </div>  
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios'

let input = ref("");
let codLibro = ref(0)         /* codigo de libro referencial que recive el valor desde el backend*/
let libros = ref(["Libro 0","Libro 2","Libro 3"]);    /* lista de libros referencial*/
let update = function(){
  axios
  .get('http://localhost:3000/libros')
  .then(response => {
    codLibro.value = response.data.libros  /* recive datos de la funcion get*/
    libros.value[0] = "Libro "+codLibro.value /*ejemplo de actualizacion de la lista*/
  })
}
function filteredList() {  /* filtra la lista de libros segun las caracteristicas de la variable "input"*/
  return libros.value.filter((libro) =>
    libro.toLowerCase().includes(input.value.toLowerCase())
  );
}
</script>

<style>
#app {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
  text-align: center;
  font-size: xx-large;
  color: #d5dde2;
  margin-top: 10px;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  padding: 20px;
  min-height: 100vh;
  background-color: rgb(41, 41, 43);
}
input {      /* estilo para el cuadro de busqueda*/
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("assets/search.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: rgb(242, 232, 238);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.libro {       /*estilo para los elementos de la lista*/
  background-color: rgb(83, 146, 202);
  cursor: pointer;
}
.error {       /*estilo para cuando se muestre el error (no encontrar el elemento deseado)*/
  background-color: tomato;
}
</style>

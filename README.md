## montar backend
- crear carpeta llamada "backend"
- abrir una terminal dentro de esta carpeta.

- utilizar los siguentes comandos:<br>
  npm init
(presionar enter a todas las opciones del armado)
- despues:
  npm install mongoose body-parser express cors --save <br>
(para instalar los modules necesarios)
- despues se integra todo lo que se tiene en la carpeta backend en el repositorio de github.
- iniciar servidor con el comando: node server.js

## montar mongo data base
- instalar docker y hacerlo funcionar
- ir a terminal en la carpeta backend y escribir:<br>
   docker run --name mongodb -d -p 27017:27017 mongo
 (docker debe estar encendido)
- iniciar la instancia mongodb

## visualizar los datos del container mongodb:
- instalar mongo compass
- utilizar la ruta de la base de datos default:<br>
  (mongodb://localhost:27017)
- ver la base de datos "test"

## montar frontend
- abrir terminal en la carpeta donde se quiera tener el frontend, y escribir:<br>
  vue create frontend (esto crea la carpeta frontend)
- durante la instalacion, elegir la opcion: "Default ([Vue 3] babel, eslint)"
- despues, instalar los siguientes elementos:<br>
  npm install bootstrap@4.6.0 jquery popper.js<br>
  npm install vue-router@4<br>
  npm install axios
- encender servidor frontend con el comando: npm run serve

## importar datos pre definidos
- encender la base de datos en docker
- visualizar los datos con mongo compass
- abrir el modelo de dato o carpeta "libros"
- utilizar la opción "add data" mendiante importar un archivo
- utilizar el archivo "librospredata.js" que se encuentra en la carpeta "cargaDatos", dentro de backend<br>
   Esto ingresará 10 libros listos y disponibles para trabajar.

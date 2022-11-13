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

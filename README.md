### montar backend
- crear carpeta llamada "backend"
- abrir una terminal dentro de esta carpeta.

- utilizar los siguentes comandos:
  npm init
(presionar enter a todas las opciones del armado)
- despues:
  npm install mongoose body-parser express cors --save 
(para instalar los modules necesarios)
- despues se integra todo lo que se tiene en la carpeta backend en el repositorio de github.
- iniciar servidor con el comando: node server.js

### montar mongo data base
- instalar docker y hacerlo funcionar
- ir a terminal en la carpeta backend y escribir:
   docker run --name mongodb -d -p 27017:27017 mongo
 (docker debe estar encendido)
- iniciar la instancia mongodb

###vvisualizar los datos de el nuevo container mongodb:
- instalar mongo compass
- utilizar la ruta de la base de datos default:
  (mongodb://localhost:27017)
- ver la base de datos "test"

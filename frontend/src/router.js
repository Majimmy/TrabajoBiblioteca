import { createWebHistory, createRouter } from "vue-router";
// para hacer referencia a las componentes de la pagina web (frontend) y moverse entre paginas (sus partes).
const routes =  [
  {
    path: "/",
    alias: "/libros", // puede usar el alias o el path
    name: "ver-libros",
    component: () => import("./componentes/ListaLibros") // refiere a la pagina principal
  },
  {
    path: "/libros/:id",
    name: "detalles-de-libros",
    component: () => import("./componentes/Libro") // refiere a la pagina que presenta las herramientas para modificar/borrar libro
  },
  {
    path: "/add",
    name: "agregar-libro",
    component: () => import("./componentes/AgregaLibro") // refiere a la pagina que presenta herramientas para agregar libro
  },
  {
    path: "/add2",
    name: "ver-agregar-usuario",  // refiere a la pagina donde se utilizarán las herramientas para manipular el dato usuario
    component: () => import("./componentes/AgregaUser")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes, // aqui toma la parte con forma routes
});
export default router; // se exporta para ser utilizado

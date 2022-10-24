import { createWebHistory, createRouter } from "vue-router";
// para hacer referencia a las componentes de la pagina web (frontend).
const routes =  [
  {
    path: "/",
    alias: "/libros",
    name: "ver-libros",
    component: () => import("./componentes/ListaLibros")
  },
  {
    path: "/libros/:id",
    name: "detalles-de-libros",
    component: () => import("./componentes/Libro")
  },
  {
    path: "/add",
    name: "agregar-libro",
    component: () => import("./componentes/AgregaLibro")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
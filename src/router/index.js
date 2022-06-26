import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/categories",
    name: "categories",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CategoriesView.vue"),
  },
  {
    path: "/subcategories",
    name: "subcategories",
    component: () => import("../views/SubcategoriesView.vue"),
  },
  {
    path: "/properties",
    name: "properties",
    component: () => import("../views/PropertiesView.vue"),
  },
  {
    path: "/shops",
    name: "shops",
    component: () => import("../views/ShopsView.vue"),
  },
  {
    path: "/distributors",
    name: "distributors",
    component: () => import("../views/DistributorsView.vue"),
  },
  {
    path: "/news",
    name: "news",
    component: () => import("../views/NewsView.vue"),
  },
  {
    path: "/news/edit/:id",
    name: "news-edit",
    component: () => import("../views/NewsEditView.vue"),
  },
  {
    path: "/news/add",
    name: "news-add",
    component: () => import("../views/NewsAddView.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductsView.vue"),
  },
  {
    path: "/products/edit/:id",
    name: "products-edit",
    component: () => import("../views/ProductsEditView.vue"),
  },
  {
    path: "/products/add",
    name: "products-add",
    component: () => import("../views/ProductsAddView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/components/home/Home.vue'
import Login from '@/components/login/Login.vue'

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];


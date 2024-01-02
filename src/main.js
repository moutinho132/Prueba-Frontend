import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { createApp } from 'vue'
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/login/Login.vue'
import Home from '@/components/home/Home.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', component: Home },
    { path: '/', component: Login },
    // Otras rutas si es necesario
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
    // Si se requiere autenticación y el usuario no ha iniciado sesión, redirige a /login
    next('/');
  } else {
    // Si no se requiere autenticación o el usuario ha iniciado sesión, permite la navegación
    next();
  }
});

const app = createApp(App);
app.use(router);
app.mount('#app');

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter();
function logout(){
  const confirmacion = window.confirm('¿Deseas cerrar tu sesión?');
  if (confirmacion) {
    localStorage.removeItem('userData');
    setTimeout(() => {
      router.push("/"); // Redirige a la ruta principal (ajusta según tu configuración)
    }, 1000);
  }
}
</script>

<template>
  <div class="green">
    <header>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/list-task">List Task</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/create-task">Create Task</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/create-task">Create Customer</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#/logout" tabindex="-1" aria-disabled="true" v-on:click="logout()">Logout</a>
        </li>
      </ul>
      <!--div class="green">
        <a href="/home" class="green">Home</a> |
        <a href="/list-task" class="green">List Task</a> |
        <a href="/create-task" class="green">Create Task</a> |
        <a href="#/about" class="green">About</a> |
        <a href="#/logout" class="green" v-on:click="logout()">Logout</a>
      </div-->
      <!--nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav-->
    </header>
  </div>
</template>

<style scoped>

</style>
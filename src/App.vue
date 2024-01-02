<script setup>
import Login from '@/components/login/Login.vue'
</script>

<template>
  <header class="header">

    <!--div class="wrapper">
      <HelloWorld msg="Hola comenzando mi prueba con vue js!" msg2="Prueba" />
    </div-->

    <!--div class="wrapper" style="align-content: center">
      <Login  />
    </div-->
    <div id="app"  style="align-content: center">
      <router-view></router-view>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: center;
    flex-wrap: wrap;
  }
}
</style>

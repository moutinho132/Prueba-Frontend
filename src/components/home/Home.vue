<script setup>
import { onMounted,ref } from 'vue'
import Customer from '../Customer.vue'
const userDataInf = ref(null);
const accessToken = ref(null);

const userName=ref(String);
const surname=ref(String);

onMounted(() => {
  const  usertData = localStorage.getItem('userData');
  if (usertData){
    userDataInf.value = JSON.parse(usertData);
    accessToken.value = userDataInf.value.token;
    userName.value =userDataInf.value.name;
    surname.value = userDataInf.value.surname;
  }
  accessToken.value = userDataInf.value.token;
  console.log('userData: ',usertData);
  console.log('Token access : ',userDataInf.value)
  console.log('Name Del User: ',userDataInf.value.name)
  console.log('Token: ',accessToken.value)

});
</script>

<template>
  <div class="green">
    <header>
      <div class="green">
        <a href="#/" class="green">Home</a> |
        <a href="#/" class="green">List Task</a> |
        <a href="#/" class="green">Create Task</a> |
        <a href="#/about" class="green">About</a> |
        <a href="#/non-existent-path" class="green">Logout</a>
      </div>
    </header>
  </div>
  <br>
  <div id="main" class="container">
    <div class="-summary">
      <!-- Contenido del cuerpo del modal -->
      ¡Bienvenido  Sr.{{userName}} {{surname}}
    </div>
  </div>
<br>
<br>
  <div class="row col-12" style="align-content: center">
    <div class="row col-6 table-customer">
      <Customer />
    </div>
  </div>

</template>

<style scoped>
.table-customer{
  flex: 0 0 auto;
  width: 50%;
  align-content: center;
  padding: initial;
  flex: auto;
}
</style>
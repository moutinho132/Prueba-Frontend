<script setup>
import { onMounted,ref } from 'vue'
import Customer from '../Customer.vue'
import HeaderComponent from './HeaderComponent.vue'
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

});
</script>

<template>
<header-component/>
  <br>
  <div id="main" class="container">
    <div class="card">
      <div class="card-body">
        ¡Bienvenido  Sr.{{userName}} {{surname}}
      </div>
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
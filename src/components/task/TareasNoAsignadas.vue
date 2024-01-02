<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
const baseURL ='http://localhost:8080/api';
defineProps({
  msg: {
    type: String,
    required: true
  }
})
function say(message) {
  alert(message)
}

const microserviceData = ref(null);

function getAllUser(){
  axios.get(`${baseURL}/security/users`)
    .then(response => {
      // Manejar la respuesta del microservicio
      console.log('Data Microservicio: ', response.data)
      return  microserviceData.value = response.data;
    })
    .catch(error => {
      console.error('Error al llamar al microservicio:', error);
    });
}
onMounted(() => {
  getAllUser()
});
</script>

<template>
<div class="green">
  <h1 v-show="msg!=null">Binvenido</h1>
</div>

  <div class="greetings">
    <div>
      <li v-for="item in microserviceData">
        {{ item.name }}
      </li>
    </div>
  </div>
  <div>
    <button @click="say('hello')">Say hello</button>
    <button @click="say('bye')">Say bye</button>
  </div>
</template>

<style scoped>

</style>
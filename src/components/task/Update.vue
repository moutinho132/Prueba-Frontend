<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import { useRouter } from 'vue-router'
const reponseStatus = ref(null)
const baseURL = 'http://localhost:8080/api'
const selectedCustomer = ref(null);
const customers = ref([])
const userDataInf = ref(null)
const accessToken = ref(null)
const router = useRouter();
const formTask = ref({
  name: '',
  description: '',
  selectCustomer:''
});
function getAllCustomers() {
  const usertData = localStorage.getItem('userData')
  userDataInf.value = JSON.parse(usertData)
  accessToken.value = userDataInf.value.token
  var token = accessToken.value
  axios.get(`${baseURL}/customer`, {
    headers: {
      'Authorization': `${token}`
    }
  })
    .then(response => {
      // Manejar la respuesta del microservicio
      console.log('Data Microservicio: ', response.data.items)
      customers.value = response.data.items // Asigna solo el array de items
    })
    .catch(error => {
      console.error('Error al llamar al microservicio:', error)
    })
}

const submitFormTask = async () => {
  try {
    const usertData = localStorage.getItem('userData')
    userDataInf.value = JSON.parse(usertData)
    accessToken.value = userDataInf.value.token
    var token = accessToken.value
    console.log('Evento del enviar task')
    const response = await axios.post('http://localhost:8080/api/task', {
      name: formTask.value.name,
      description:formTask.value.description,
      customer: {
        id:formTask.value.selectCustomer
      }
    },{headers: {
        'Authorization': `${token}`
      }});
    reponseStatus.value = response.status;
    const responseData = response.data;
    console.log('Respuesta del servidor:', responseData);
    const codOk = 200
    if(reponseStatus.value== codOk){
      setTimeout(() => {
        router.push("/list-task"); // Redirige a la ruta principal (ajusta según tu configuración)
      }, 2000)

    }

  } catch (error) {
    // Maneja errores de la solicitud
    console.error('Error al realizar la solicitud:', error);
  }
};
onMounted(() => {
  getAllCustomers()
})
</script>

<template>
  <form @submit.prevent="submitFormTask">
    <div class="mb-3">
      <!--label for="exampleInputEmail1" class="form-label">Name tarea </--label-->
      <label for="nameTak" class="form-label"> Name Task</label>
      <input
        type="text"
        class="form-control"
        id="username"
        v-model="formTask.name"
        required
      />
    </div>
    <div class="mb-3">
      <!--label for="exampleInputEmail1" class="form-label">Name tarea </--label-->
      <label for="description" class="form-label"> Description</label>
      <input
        type="text"
        class="form-control"
        id="username"
        v-model="formTask.description"
        required
      />    </div>
    <div class="form-group mb-3">
      <div>
        <label for="selectCustomer">Select customer</label>
        <select class="form-control" id="idSelectCustomer" v-model="formTask.selectCustomer"  v-on:click="getAllCustomers" >
          <option value="" disabled selected>Selection</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.person.name }}</option>
        </select>
      </div>
    </div>
    <div class="form-group mb-3">
      <div class="form-group mb-12">
        <!--button type="reset" class="btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Update Task" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">
          <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg> </button-->
        <button type="submit" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download" viewBox="0 0 16 16">
          <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
          <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
        </svg> </button>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>
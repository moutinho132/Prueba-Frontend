<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted, reactive, ref } from 'vue'

const tableData = ref(null)
const perPage = 5
const fields = computed(() => Object.keys(tableData.value))
const isTableDataValid = computed(() => Array.isArray(tableData.value) && 'length' in tableData.value)


const userDataInf = ref(null)
const accessToken = ref(null)
const customers = ref([])
const taskCustomerData = ref([])
const baseURL = 'http://localhost:8080/api'
const stateTask = reactive({ isActive: false })
const stateCustomer = reactive({ isActive: true })

function getTaskCustomer(idCustomer) {
  const usertData = localStorage.getItem('userData')
  console.log('Customer ID:', idCustomer)
  console.log('token para consumir task customer :', usertData)
  userDataInf.value = JSON.parse(usertData)
  accessToken.value = userDataInf.value.token
  var token = accessToken.value
  axios.get(`${baseURL}/task/customer/${idCustomer}`, {
    headers: {
      'Authorization': `${token}`
    }
  })
    .then(response => {
      // Manejar la respuesta del microservicio

      if (response.data != null) {
        stateTask.isActive = true
        stateCustomer.isActive = false
        console.log(stateCustomer)
      }
      console.log('Data Microservicio Task: ', response)
    })
    .catch(error => {
      console.error('Error al llamar al microservicio:', error)
    })


}


function handleTasks(tasks) {
  // Aquí manejas las tareas como desees
  // Por ejemplo, puedes asignarlas a una variable reactiva o realizar otras operaciones
  taskCustomerData.value = tasks
}

function confirmNoTasks() {
  // Cierra el modal si es necesario
  $('#noTasksModal').modal('hide')

  // Redirige al componente de registro de tareas o realiza otras operaciones
  // Puedes usar el enrutador de Vue para navegar a la página de registro de tareas
  // router.push('/registro-tareas');
}


function cancelNoTasks() {
  // Cierra el modal si es necesario
  $('#noTasksModal').modal('hide')

  // Realiza otras operaciones o simplemente libera
}

function showNoTasksModal(idCustomer) {
  // Aquí deberías mostrar tu modal de confirmación
  // Puedes usar Bootstrap o cualquier otra biblioteca que prefieras
  // Asegúrate de tener un modal en tu componente con un ID, por ejemplo, 'noTasksModal'
  // Luego, puedes mostrar el modal usando jQuery o la API de Bootstrap
  $('#noTasksModal').modal('show')

  // También puedes utilizar la lógica de Vue para mostrar el modal, dependiendo de tu implementación
  // Puedes usar una variable reactiva para controlar la visibilidad del modal
  // modalVisibility.value = true; // Ajusta según tu implementación
}

function getAllCustomers() {
  axios.get(`${baseURL}/customer`)
    .then(response => {
      // Manejar la respuesta del microservicio
      console.log('Data Microservicio: ', response.data.items)
      customers.value = response.data.items // Asigna solo el array de items
    })
    .catch(error => {
      console.error('Error al llamar al microservicio:', error)
    })
}

onMounted(() => {
  getAllCustomers()
})
</script>

<template>
  <div class="col-12">
    <h1>List Customers</h1>
  </div>
  <div class="col-12">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">NAME</th>
        <th scope="col">SURNAME</th>
        <th scope="col">DATE OF BIRTH</th>
        <th scope="col">ACCIONES</th>
      </tr>
      </thead>
      <tbody v-for="(items, key, index) in customers">
      <tr>
        <th scope="row">{{ items.person.id }}</th>
        <td>{{ items.person.name }}</td>
        <td>{{ items.person.surname }}</td>
        <td>{{ items.person.dateOfBirth }}</td>
        <td>
          <button type="button" class="btn col" v-on:click="getTaskCustomer(items.id)">
            View
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <div>
    <div class="col-12" v-if="stateTask.isActive === true">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">SURNAME</th>
          <th scope="col">DATE OF BIRTH</th>
          <th scope="col">ACCIONES</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">--</th>
          <td>--</td>
          <td>--</td>
          <td>--</td>
          <td>
            <button type="button" class="btn col">
              View
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>


</template>
<style scoped>
/* Estilos si es necesario */
</style>

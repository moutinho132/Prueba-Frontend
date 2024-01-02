<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted, reactive, ref } from 'vue'
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import CreateTask from './task/CreateTask.vue'
import Update from './task/Update.vue'
const tableData = ref(null)
const perPage = 5
const fields = computed(() => Object.keys(tableData.value))
const isTableDataValid = computed(() => Array.isArray(tableData.value) && 'length' in tableData.value)

const showModal = ref(false);
const loading = ref(false);
const error = ref(null);
const data = ref(null);

const userDataInf = ref(null)
const accessToken = ref(null)
const customers = ref([])
const taskCustomerData = ref([])
const taskCompleted = ref([])

const reponseStatus = ref(null)
const baseURL = 'http://localhost:8080/api'

const stateTask = reactive({ isActive: false })
const stateCustomer = reactive({ isActive: true })
const noContent = reactive({ isActive: true })

function updateTask(item){
  console.log('Invoca al modal y muestra el contenido del item')
  const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
  updateModal.show();
 /* setTimeout(() => {
    updateModal.hide();
  }, 2000);*/
}

function getTaskCustomer(idCustomer) {
  loading.value = true;
  stateTask.isActive = true
  const usertData = localStorage.getItem('userData')
  console.log('Customer ID:', idCustomer)
  console.log('token para consumir task customer :', usertData)
  userDataInf.value = JSON.parse(usertData)
  accessToken.value = userDataInf.value.token
  var token = accessToken.value

  try {
    axios.get(`${baseURL}/task/customer/${idCustomer}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(response => {
        // Manejar la respuesta del microservicio
        reponseStatus.value = response.status;
        const codStatusConflict = 409
        if (reponseStatus.value === codStatusConflict) {
          noContent.isActive=true;
        }
        const codOk = 200
        if(reponseStatus.value== codOk){
          stateCustomer.isActive = false
          console.log(stateCustomer)
          taskCustomerData.value = response.data;
        }
        console.log('Data Microservicio Task: ', taskCustomerData.value)
      })
      .catch(error => {
        console.error('Error al llamar al microservicio:', error)
      })
  }catch (err){
    console.error('Error al obtener datos:', err);
    error.value = 'Error al cargar datos';
  }finally {
    loading.value = false;
    showModal.value = true;
  }
}

const resetModal = () => {
  loading.value = false;
  error.value = null;
  data.value = null;
};

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
function completed(idTask){
  console.log('Funcion para completar id:',idTask)
  const usertData = localStorage.getItem('userData')
  console.log('token para consumir task customer :', usertData)
  userDataInf.value = JSON.parse(usertData)
  accessToken.value = userDataInf.value.token
  var token = accessToken.value
  try {
    axios.get(`${baseURL}/task/${idTask}/completed`, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(response => {
        // Manejar la respuesta del microservicio
        reponseStatus.value = response.status;
        const codStatusConflict = 409
        if (reponseStatus.value === codStatusConflict) {
          noContent.isActive=true;
        }
        const codOk = 200
        if(reponseStatus.value== codOk){
          taskCompleted.value = response.data;
          window.location.reload();

        }
        console.log('Data Microservicio Task: ', taskCustomerData.value)
      })
      .catch(error => {
        console.error('Error al llamar al microservicio:', error)
      })
  }catch (err){
    console.error('Error al obtener datos:', err);
    error.value = 'Error al cargar datos';
  }
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

  <div class="card table-card-data">
    <div class="card-header">
      List Customers
    </div>
    <div class="card-body">
      <h5 class="card-title">Detaild</h5>
      <div class="col-12" >

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
                <button type="button" class="btn col" data-bs-toggle="modal" data-bs-target="#modalListTask" v-on:click="getTaskCustomer(items.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                  </svg>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>





  <div class="modal fade" id="modalListTask" tabindex="-1" aria-labelledby="c" aria-hidden="true" size="lg"  >
    <div class="modal-dialog modal-lg">
    <div class="modal-dialog" >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalCreateUser">LIST TASK CUSTOMER</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="taskCustomerData.length > 0">
            <div class="col-12" >
              <table class="table">
                <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">DESCRIPTION</th>
                  <th scope="col">CUSTOMER</th>
                  <th scope="col">DNI</th>
                  <th scope="col">CREATION TIME</th>
                  <th scope="col">ACCIONES</th>
                </tr>
                </thead>
                <tbody v-for="(itemTask, key, index) in taskCustomerData" >
                <tr>
                  <th scope="row">{{itemTask.id}}</th>
                  <td>{{itemTask.description}}</td>
                  <td>{{itemTask.customer.person.name}} {{itemTask.customer.person.surname}}</td>
                  <td>{{itemTask.customer.person.dni}}</td>
                  <th scope="row">{{itemTask.creationTime}}</th>
                  <td>
                    <!--button type="button" class="btn "  v-on:click="updateTask(items)" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                      <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                    </svg></button-->
                    <button type="button" class="btn " v-on:click="completed(itemTask.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"/>
                    </svg></button>

                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div  class="col-12"  v-if="taskCustomerData.length ===0">
          <h1><span>No content</span></h1>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn " data-bs-dismiss="modal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">
            <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg></button>
        </div>
      </div>
    </div>
      </div>
  </div>


  <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Contenido del cuerpo del modal -->
          <Update/>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>


  <!--div-- class="modal-delete" id="modalDelete" tabindex="-1"  aria-hidden="true" size="lg"  >
    <div class="modal-dialog modal-lg">
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCreateUser">Estas seguro de elminar esta tarea?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p v-if="taskCustomerData.length > 0">
              <div class="col-12" v-for="(itemTask, key, index) in taskCustomerData">
                <table class="table">

                </table>
              </div>
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" style="margin: 10px">Ok </button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div-->



  <!--div>
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
  </div-->


</template>
<style scoped>
.table-card-data{
  margin-left: 33px;
}
/* Estilos si es necesario */
</style>

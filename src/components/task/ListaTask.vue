<script setup lang="ts">
import axios from 'axios'
import HeaderComponent from '../home/HeaderComponent.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const baseURL = 'http://localhost:8080/api'
const userDataInf = ref(null)
const accessToken = ref(null)
const reponseStatus = ref(null)
const taskData = ref([])
const taskView = ref([])
const customers = ref([])
const router = useRouter();

const formTask = ref({
  id:null,
  name: '',
  description: '',
  selectCustomer:''
});

const submitFormTask = async () => {
  try {
    const usertData = localStorage.getItem('userData')
    userDataInf.value = JSON.parse(usertData)
    accessToken.value = userDataInf.value.token
    var token = accessToken.value
    const response = await axios.post('http://localhost:8080/api/task', {
      id:formTask.value.id,
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
    const codOk = 200
    if(reponseStatus.value== codOk){
      window.location.reload();
      setTimeout(() => {
        router.push("/list-task"); // Redirige a la ruta principal (ajusta según tu configuración)
      }, 2000);
    }

  } catch (error) {
    // Maneja errores de la solicitud
    console.error('Error al realizar la solicitud:', error);
  }
};
function getTask() {
  const usertData = localStorage.getItem('userData')
  userDataInf.value = JSON.parse(usertData)
  accessToken.value = userDataInf.value.token
  var token = accessToken.value

  try {
    axios.get(`${baseURL}/task`, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(response => {
        // Manejar la respuesta del microservicio
        reponseStatus.value = response.status
        taskData.value = response.data.items

      })
      .catch(error => {
        console.error('Error al llamar al microservicio:', error)
      })
  } catch (err) {
    console.error('Error al obtener datos:', err)
    err.value = 'Error al cargar datos'
  }
}

function view(idTask) {
  const usertData = localStorage.getItem('userData')
  userDataInf.value = JSON.parse(usertData)
  accessToken.value = userDataInf.value.token
  var token = accessToken.value
  try {
    axios.get(`${baseURL}/task/${idTask}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(response => {
        // Manejar la respuesta del microservicio
        reponseStatus.value = response.status
        taskView.value = response.data
        formTask.value.id=taskView.value.id,
        formTask.value.name=taskView.value.customer.person.name;
        formTask.value.description=taskView.value.description;

      })
      .catch(error => {
        console.error('Error al llamar al microservicio:', error)
      })
  } catch (err) {
    console.error('Error al obtener datos:', err)
    err.value = 'Error al cargar datos'
  }
}

function deleteTask(idTask) {
  const usertData = localStorage.getItem('userData')
  userDataInf.value = JSON.parse(usertData)
  accessToken.value = userDataInf.value.token
  var token = accessToken.value
  try {
    axios.delete(`${baseURL}/task/${idTask}`, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(response => {
        // Manejar la respuesta del microservicio
        reponseStatus.value = response.status
        taskData.value = response.data.items
        window.location.reload();

      })
      .catch(error => {
        console.error('Error al llamar al microservicio:', error)
      })
  } catch (err) {
    console.error('Error al obtener datos:', err)
    err.value = 'Error al cargar datos'
  }
}

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
      customers.value = response.data.items // Asigna solo el array de items
    })
    .catch(error => {
      console.error('Error al llamar al microservicio:', error)
    })
}

onMounted(() => {
  getAllCustomers();
  getTask()
})
</script>

<template>
  <header-component />
  <div class="modal-body">
    <div v-if="taskData.length > 0">
      <div class="col-12">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">TASK NAME</th>
            <th scope="col">CUSTOMER</th>
            <th scope="col">STATUS</th>
            <th scope="col">CREATION TIME</th>
            <th scope="col">ACCIONES</th>
          </tr>
          </thead>
          <tbody v-for="(itemTask, key, index) in taskData">
          <tr>
            <th scope="row">{{ itemTask.id }}</th>
            <td>{{ itemTask.description }}</td>
            <td>{{ itemTask.name }}</td>
            <td>{{ itemTask.customer.person.name }} {{ itemTask.customer.person.surname }}</td>
            <td>{{ itemTask.status }}</td>
            <th scope="row">{{ itemTask.creationTime }}</th>
            <td>
              <button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#modalViewTaskDetail" v-on:click="view(itemTask.id)" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </button>

              <button type="button" class="btn" style="margin: 10px" data-bs-toggle="modal" data-bs-target="#deleteModal" v-on:click="deleteTask(itemTask.id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>


  <div class="modal fade" id="modalViewTaskDetail" tabindex="-1" aria-labelledby="modalViewTaskDetail" aria-hidden="true" size="lg"  >
    <div class="modal-dialog modal-lg">
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-body">
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

            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn " data-bs-dismiss="modal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">
              <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg></button>
            <button type="button" class="btn " data-bs-dismiss="modal" v-on:click="submitFormTask"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
              <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
            </svg></button>
          </div>
        </div>

      </div>

    </div>
  </div>

  <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true" size="lg"  >
    <div class="modal-dialog modal-lg">
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-body">
            <span>
              Task delete
            </span>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
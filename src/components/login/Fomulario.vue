<script setup>
import { computed, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import { useRouter } from 'vue-router';
import axios from 'axios';
const router = useRouter();
const loginForm = ref({
  username: '',
  password: ''
});

const submitFormLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/security/login', {
      email: loginForm.value.username,
      password:loginForm.value.password
    });
    const responseData = response.data;
    console.log('Respuesta del servidor:', responseData);
    if (responseData!=null) {
      // Utiliza Bootstrap para mostrar el modal
      // eslint-disable-next-line no-undef
      localStorage.setItem('userData', JSON.stringify(responseData));
      const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
      welcomeModal.show();

      setTimeout(() => {
        welcomeModal.hide();
        router.push("/home"); // Redirige a la ruta principal (ajusta según tu configuración)
      }, 2000); // Tiempo en milisegundos antes de cerrar el modal y redirigir
    }
  } catch (error) {
    // Maneja errores de la solicitud
    console.error('Error al realizar la solicitud:', error);
  }
};
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <!-- Primera columna -->
        <h2>Inicio de Sesión</h2>
        <form @submit.prevent="submitFormLogin">
          <div class="mb-4">
            <label for="username" class="form-label">Nombre de Usuario:</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="loginForm.username"
              required
            />
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">Contraseña:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="loginForm.password"
              required
            />
          </div>

          <div class="row mb-12 lg-12">
            <div class="col-6 col-lg-6">
              <button type="submit" class="btn col">Login</button>

            </div>
            <div class="col-6 col-lg-6">
              <button type="button" class="btn col" data-bs-toggle="modal" data-bs-target="#modalCreateUser">
                Register user
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalCreateUser" tabindex="-1" aria-labelledby="modalCreateUser" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalCreateUser">Create User</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Contenido del modal -->
          Formulario.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="welcomeModal" tabindex="-1" aria-labelledby="welcomeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="welcomeModalLabel">Bienvenido</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Contenido del cuerpo del modal -->
          ¡Bienvenido! Has iniciado sesión correctamente.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

</template>



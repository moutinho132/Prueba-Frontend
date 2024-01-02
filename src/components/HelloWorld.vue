<script setup>
import { reactive, computed, ref, onMounted } from 'vue'
import Home from '@/components/home/Home.vue'
import About from '@/components/about/About.vue'


defineProps({
  msg: {
    type: String,
    required: true
  },
  msg2: {
    type: String,
    required: false
  }
})
const state = reactive({ count: 0 })
const stateActive = reactive({ isActive: false})
const stateLogin = reactive({messageLogin:''})
const count = ref(0)
const firstName = ref('John')
const lastName = ref('Doe')
const message = ref('')
const checked = ref(true)
const routes = {
  '/': Home,
  '/about': About
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes['/']
})

const author = reactive({
  name: 'John Doe',
  books: [
    'Java 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'JavaScripts 4 - The Mystery'
  ]
})
function increment() {
  // .value is needed in JavaScript
  count.value++
}
const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})


const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})


function changeStatusProperties(){
  console.log('Prueba de concepto: ',stateActive.isActive)
  if(stateActive.isActive===true){
    console.log('Esta activo cambiara a false')
    stateActive.isActive=false;
    stateLogin.messageLogin=''
  }else{
    console.log('Esta inaactivo cambiara a true')
    stateActive.isActive=true;
    stateLogin.messageLogin='ok'
  }
  return stateActive.isActive;
}


onMounted(() => {
});
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
  <div class="greetings">

    <h1 class="green">{{ msg }}</h1>
    <h3 class="green" v-html="msg2">
    </h3>
  </div>

  <div>
    <p>Has publicado unos libros</p>
    <span>{{ publishedBooksMessage }}</span>

  </div>

  <div>
    <button v-on:click="increment">
      {{ count }}
    </button>
  </div>
  <div>
    <button @click="state.count++">
      {{ state.count }}
    </button>
  </div>
  <div>
    <button v-on:click="increment">
      {{ fullName }}
    </button>
  </div>

  <div>
    <button v-on:click="changeStatusProperties">
      ChangeStatus
    </button>
  </div>

  <div v-if="stateActive.isActive === true">
    <Tarea  msg="Probando active true" />
  </div>
  <div v-else-if="stateActive.isActive === false">
    <TareasNoAsignadas msg="stateLogin.messageLogin"/>
  </div>

  <div>
    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>
  </div>

  <div>
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>.

  </div>


</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

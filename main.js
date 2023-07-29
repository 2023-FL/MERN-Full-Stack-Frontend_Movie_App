import { createApp } from 'vue';
import {createStore} from 'vuex';
import {Quasar} from 'quasar';
import App from './App.vue';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import router from './router'
import Home from './components/Home.vue'
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/brands.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import './components/About/css/font-awesome.min.css';

const sessionStore = createStore({
  state: {
    session: null, //key will be stored here
    encodedToken: null,
    userName: null,
    passWord: null
  },
  getters: { //Read key function
    getSession: state=>{
      return state.session
    },
    getToken: state=>{
      return state.encodedToken
    },
    getUsername: state=>{
      return state.userName
    },
    getPassword: state=>{
      return state.passWord
    }
  },
  mutations: { //Write function: write key into session of state object
      updateSession(state, keyRole){
        state.session = keyRole
      },
      updateToken(state, encodedToken){
        state.encodedToken = encodedToken
      },
      updateUsername(state, userName){
        state.userName = userName
      },
      updatePassword(state, passWord){
        state.passWord = passWord
      }
  },
})
//import './assets/main.css'

//createApp(App).use.(router).use(Quasar).mount('#app')

// Set "/home" as the default page
const defaultPage = '/home'
if (window.location.pathname === '/') {
  window.history.replaceState(null, '', defaultPage)
}

const app = createApp(App);
// Register the Home component globally
app.component('Home', Home)
app.use(router);
app.use(Quasar);
app.use(sessionStore);
app.mount('#app');
app.use(Quasar, { config: {} });
app.mount('#q-app');




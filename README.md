# VueJS-with-Vite

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```
### Install dependenacies contains of:
npm install vue, vue-vite, axios, buffer, moment, vue-router --save
Then, import { ref, computed, watchEffect } from 'vue'
import axios from 'axios'
import { Buffer } from 'buffer'
import monment from 'moment'
import useRouter from 'vue-route'

In addition, it is necessary to import external url from http-common.js and external weather information from WeatherCard.vue shown as follows:
import url from './http-common.js'
import WeatherCard from './components/WeatherCard.vue';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/brands.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import './components/About/css/font-awesome.min.css';

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
### The structure of Vue3 files:
Root
|- Public
      |-favicon.ico
|- src
.   |-assests
        |-base.css
        |-main.css
        |-movie_poster1.jpg
        |-movie_poster2.jpg
        |-movie_poster3.jpg
        |-movie_poster4.jpg
        |-movie_poster5.jpg
        |-movie_poster6.jpg
        |-movie_poster7.jpg
        |-movie_poster8.jpg
.   |-components
          |-icons
          |-.DS_Store
          |-Home.vue
              |-DetailsMovie.vue
          |-About.vue
          |-staff.vue
              |-DetailsFilm.vue
              |-StaffAccount.vue
          |-user.vue
          |-WeatherCard.vue
          |-NotFound.vue
          |-EssentialLink.vue
.   |-.DS_Store
.   .-App.vue
.   .-http-common.js
.   .-main.js
.   .router.js
.
|-index.html
|-README.md
|-package-lock.json
|-package.json

### Demon Live
If you would like to watch the demonstration on how to operate the Fron-end Webpage, please go to youtube by clicking below link at [https://youtu.be/IOZYQBaRMzU](https://youtu.be/89ntFfa6a3M). (Please use of your vac email address for login to watch this YouTube)

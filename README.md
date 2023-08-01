# Construction in progress, not completed yet
# VueJS-with-Quasar Framework

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```
Install dependenacies contains of:
npm install vue, vue-vite, axios, buffer, moment, vue-router --save
Then, import { ref, computed, watchEffect } from 'vue'
import axios from 'axios'
import { Buffer } from 'buffer'
import monment from 'moment'
import useRouter from 'vue-route'

In addition, it is necessary to import external url from http-common.js and external weather information from WeatherCard.vue shown as follows:
import url from './http-common.js'
import WeatherCard from './components/WeatherCard.vue';

### Compile and Hot-Reload for Development

```sh
npm run dev
```


### Compile and Minify for Production

```sh
npm run build
```
### preparation of opening your a free account for two movie api, weather api and MongoDB:
- Please try to look for an appropriate free movie API, such as https://rapidapi.com/juanroldan1989/api/moviequotes/ 
  to register a user account and get a free API key, e.g. 'https://juanroldan1989-moviequotes-v1.p.rapidapi.com/api/v1/quotes' and then 
  place the url link, which is provided by the website of https://rapidapi.com, into below statement in the file of http-common.js for 
  fetching what movie you want with the input title
  const url = "https://xxxxFREE_MOVIE_API"
- Please go to Open Weather website of r opening a new user account and get API Key for your own account; then,place your own API Key 
  and url link of the openweather into below statements in the file of WeatherCard.js
  const apiKey = "XXXXXXXXXXXX"; //Go to OpenWeather website for registering your own account for getting API Key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&units=metric&appid=${apiKey}`;
- Please go to the website of https://www.omdbapi.com/ for opening your own user account and get your own API Key; then, place API Key and url link into below enpoint statements in the file of staff.js
try {
        let endpoint = '';
        switch (sortBy.value) {
        case 'title':
          endpoint = `https://www.omdbapi.com/?s=${searchTerm.value}&apikey=XXXXXX`; //Please go to a free movie API website for getting your own API Key
          break;
        case 'year':
          endpoint = `https://www.omdbapi.com/?t=${searchTerm.value}&y=${Yearsearch.value}&apikey=XXXXXX`; //Please go to a free movie API website for getting your own API Key
          break;
        default:
          break;
  }
- 
### Replit for trail
https://lab320233.francisleung.repl.co/staff
![image](https://github.com/2023-FL/MERN-Full-Stack-Frontend_Movie_App/assets/57984642/46a542ca-29c5-47a2-ab8c-7be94e9ca69b)

![image](https://github.com/2023-FL/MERN-Full-Stack-Frontend_Movie_App/assets/57984642/9caca64c-1cfd-460a-8a7f-a700f4bd0036)

![image](https://github.com/2023-FL/MERN-Full-Stack-Frontend_Movie_App/assets/57984642/8fcae14b-b197-4603-b713-e5d6ad88b8d5)

![image](https://github.com/2023-FL/MERN-Full-Stack-Frontend_Movie_App/assets/57984642/2058b4a3-8b39-4b75-8dde-85c943afc34c)







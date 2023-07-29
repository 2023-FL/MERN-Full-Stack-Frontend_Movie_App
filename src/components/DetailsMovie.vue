<template>
  <div class="column" style="height: 950px; max-height: 100%">
  <div class="q-pa-md row">
    <q-card class="card1">
      <q-card-section class="align-left">
        <q-input v-model="film.name" label="Movie Title:" :readonly="readonly" />
        <q-input v-model="film.year" label="Year:" :readonly="readonly"/>
        <q-input v-model="film.director" label="by Director:" :readonly="readonly"/>
        <q-img :src="film.img"/>
        <q-input v-model="film.release" label="release:" :readonly="readonly"/>
        <q-input v-model="film.duration" label="Duration in minutes:" :readonly="readonly"/>
        <q-input v-model="film.genre" label="Genre:" :readonly="readonly"/>
        <q-card-actions>
          <q-btn color=primary @click="$router.replace('/')">Back</q-btn>
        </q-card-actions> 
      </q-card-section>
    </q-card>
  </div>
 </div> 
</template>

<script>
  import axios from 'axios';
  import url from '../http-common.js';
   export default {
     data(){
       return {
         film: {},
         readonly: true,
        }
     },
     created() {
 //mutiple import url.a and url.b     //axios.get(`${url.a}/film/${this.$route.params.id}`)
      axios.get(`${url}/film/${this.$route.params.id}`)
        .then((response)=>{
          //console.log(response.data)
         const filmDetail = response.data
         //const filmDetail = response.data[0]
         this.film = {
           name: filmDetail[0].title,
           year: filmDetail[0].year,
           release: filmDetail[0].released,
           duration: filmDetail[0].runtime,
           genre: filmDetail[0].genre,
           director: filmDetail[0].director,
           img: filmDetail[0].poster
         }
       })
       .catch((err)=>{
         console.log(err)
       })
     }
}
</script>

<style>
.card1 {
  width: 360px;
}
</style>
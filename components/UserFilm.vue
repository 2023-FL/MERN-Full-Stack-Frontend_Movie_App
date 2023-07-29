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
          console.log(this.$route.params.title)
         const filmDetail = response.data
         //const filmDetail = response.data[0]
          console.log(filmDetail.title)
         this.film = {
           name: filmDetail.title,
           //year: filmDetail[0].year,
           year: filmDetail.year,
           release: filmDetail.released,
           duration: filmDetail.runtime,
           genre: filmDetail.genre,
           director: filmDetail.director,
           img: filmDetail.poster
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
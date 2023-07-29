<template>

  <div class="column" style="height: 900px; max-height: 100%">
    <div class="q-pa-md row">
      <q-card class="card"> 
        <q-img :src="movie.Poster" alt="Movie Poster" :disable="disabled"/>
            <q-card-section class="align-left">
              <q-input v-model="movie.Title" label="Title" :readonly="readonly" />
              <q-input v-model="movie.Year" label="Year" />
              <q-input v-model="movie.Runtime" label="Duration" />
              <q-input v-model="movie.Language" label="Language" />
              <q-input v-model="movie.Genre" label="Genre" />
              <q-input v-model="movie.Director" label="Director" />
              <q-input v-model="movie.Type" label="Movie Category" />
              <q-input v-model="movie.Rate" label="Rating" />
            </q-card-section>
            <q-card-actions>
              <q-btn label="Save" color="primary" @click="addMovie" />
              <q-btn color=black @click="$router.replace('/staff')">Cancel</q-btn> 
              <q-btn color="secondary" @click="$router.replace('/')">Back Main Page</q-btn>
            </q-card-actions>
          </q-card>
      </div>

    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <q-dialog-message v-if="success">
            Successfully saved the movie!
          </q-dialog-message>
          <q-dialog-message v-else>
            Error saving the movie. Please try again later.
          </q-dialog-message>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="OK" color="primary" @click="closeDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
import url from '../http-common.js';

  
export default { 
  data() {
    return {
      movie: {},
      //dialogVisible: false,
      success: false,
      showDialog: false,
      readonly: true,
      disabled: true,
      session: this.$store.getters.getSession,
      encodedToken: this.$store.getters.getToken,
    };
  },
  mounted() {
    this.fetchMovieDetails();
  },
  methods: {
    async fetchMovieDetails() {
      const imdbID = this.$route.params.id;
      try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=bff6445f&i=${imdbID}`);
        this.movie = response.data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    },
    addMovie() {
        const Title = this.movie.Title
        const titleString = Title.toString();

        const Year = this.movie.Year
        const yearString = Year.toString();

        const runtime = parseInt(this.movie.Runtime, 10);

        const Language = this.movie.Language
        const languageString = Language.toString();

        const Genre = this.movie.Genre
        const genreString = Genre.toString();

        const Director = this.movie.Director
        const directorString = Director.toString();

        const Type = this.movie.Type
        const typeString = Type.toString();

        const rating = parseInt(this.movie.Rate, 10);

        axios.post(`${url}/film`, {
          
          "title": titleString,
          "year": yearString,
          "runtime": runtime,
          "language": languageString,
          "genre": genreString,
          "director": directorString,
          "poster": this.movie.Poster,
          "type": typeString,
          "rating": rating,
        },{
          headers: {
            'Authorization': `${this.$store.getters.getSession}`,
            //k: `${this.$store.getters.getSession}`
          }, //Authorization
        })
        .then((response) => {
          console.log('Movie added successfully', response.data);
          this.showDialog = true;
          this.success = true;
        })
        .catch((error) => {
          console.error('Error adding movie:', error);
          this.showDialog = true;
          this.success = false;
        })
        .finally(() => {
          this.showDialog = true;
        })  
    },
    closeDialog() {
      this.showDialog = false;
    },
  } //methods
}
</script>

<style>
.card {
  width: 289px;
}

.align-left{
  align: left;
}
</style>
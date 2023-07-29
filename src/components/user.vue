<template>

    <div class="search-container">
        <q-input
          :input-style="{ color: 'white' }"
          outlined
          v-model="searchTerm"
          placeholder="Search movies"
          class="search-input"
        />
        <q-btn label="Search" color="primary" @click="searchMovies" class="search-button" />
  </div>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="movies.length === 0">No movies found.</div>
    <!--<q-card class="movie-card" v-else>-->
      <q-card-section>
        <div class="row">
          <div class="col-3" v-for="movie in displayedMovies" :key="movie.title">
            <q-card class="custom-card q-h-full q-flex q-flex-column q-justify-between">
            <q-card-section class="align-center">
            <q-img :src="movie.poster" alt="movie.title"/>

            <q-input v-model="movie.title" label="Title" :readonly="readonly" />
            <q-input v-model="movie.year" label="Year" :readonly="readonly" />
              <q-input v-model="movie.runtime" label="Duration" :readonly="readonly"/>
              <q-input v-model="movie.language" label="Language" :readonly="readonly"/>
              <q-input v-model="movie.genre" label="Genre" :readonly="readonly"/>
              <q-input v-model="movie.director" label="Director" :readonly="readonly"/>
            </q-card-section>
          <div id="q-app" style="min-height: 1vh;">
            <div class="q-pa-md">
              <div class="q-gutter-y-md column">
                <q-rating
                  v-model="rate"
                  max="7"
                  size="3em"
                  color="amber"
                  color-selected="amber-6"
                  icon="favorite_border"
                  icon-selected="favorite"
                  icon-half="favorite"
                  no-dimming
                ></q-rating>
              </div>
            </div>
          </div>
          <div class="flex-center">
              <q-card-actions align="right">
              <q-btn color="primary" @click="$router.replace('/')">Cancel</q-btn>
            </q-card-actions>
            </div>
            </q-card>
          </div>
        </div>
      <!--</q-card>-->
      </q-card-section>
    <!--<q-card-actions>-->
        <q-pagination
          v-model="currentPage"
          :min="1"
          :max="totalPages"
          :disable="isLoading"
        ></q-pagination>
      <!--</q-card-actions>-->
    
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import url from '../http-common.js';
  
export default {
  name: 'MovieSearch',
  data() {
    return {
      searchTerm: '',
      movies: [],
      isLoading: false,
      currentPage: 1,
      itemsPerPage: 4,
      rate: ref(''),
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.movies.length / this.itemsPerPage);
    },
    displayedMovies() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.movies.slice(startIndex, endIndex);
    }
  },
  methods: {
    async searchMovies() {
      this.isLoading = true;
      this.movies = [];

      try {
        const response = await axios.get(
          `${url}/ofilm/${this.searchTerm}`
        );
        
        //const data = response.data;
        
        const movieData = response.data;
        console.log(movieData)
        const movie = {
          title: movieData.title || '',
          year: movieData.year || '',
          released: movieData.released || '',
          runtime: movieData.runtime || '',
          language: movieData.language || '',
          genre: movieData.genre || '',
          director: movieData.director || '',
          poster: movieData.poster || '',
          rating: this.randomNumber(),
        };
        this.rate = movie.rating;
        this.movies = [movie];
      } catch (error) {
        console.error(error);
      }

      this.isLoading = false;
    }, //serachMovie
    randomNumber() {
      const randomNum = Math.floor(Math.random() * 10) + 1;
      return randomNum;
    },
  }
};
</script>

<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
  
.movie-card {
  max-width: 800px;
  max-height: 1000px;
  margin: 0 auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.col-3 {
  width: 65%;
  height: 80%;
  padding: 8px;
  margin: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.search-input {
  flex: 1;
  width: 100%;
  max-width: 1000px;
  align-items: left;
}

.search-button {
  margin-left: 10px;
  height: 54px;
  align-items: right;
}

@media (max-width: 800px) {
  .search-input {
    max-width: 800px;
    width: auto;
  }
}
</style>
<template>
  <q-tabs align="left">
    <q-route-tab to="/staffaccount" label="Staff Account"/>
  </q-tabs>
  
  <div v-if='error'>
    <q-banner inline-actions class="text-white bg-red">
      Sorry that there is a problem connecting to the API
    </q-banner>
  </div>
  
  <div v-if="!error">
    <div>
      <div class="search-container">
        <q-input
          :input-style="{ color: 'white' }"
          outlined
          v-model="searchTerm"
          placeholder="Search movies"
          class="search-input"
        />
        <q-input
          :input-style="{ color: 'white' }"
          outlined
          v-model="searchYear"
          placeholder="Movie Year"
          class="search-year"
        />
        <q-select
          v-model="sortBy"
          :options="sortByOptions"
          input-debounce="300"
          outlined
          placeholder="Sort By"
          bg-color="yellow"
          class="sort-select"
        ></q-select>
        <q-btn label="Search" color="primary" @click="searchMovies" class="search-button" />
  </div>
      <q-pagination
        v-model="currentPage"
        :max="totalPages"
        direction-links
        unelevated
        color="grey"
        active-color="primary"
    />
    <div class="movies-container">
      <q-card class="movie-card" v-for="movie in paginatedMovies" :key="movie.imdbID">
        <q-card-section>
          <img :src="movie.Poster" alt="Movie Poster" @click="$router.replace(`/film/${ movie.imdbID }`)" />
        </q-card-section>
        <q-card-actions>
          <q-btn flat text-color="black" class="card-title" @click="$router.replace(`/film/${ movie.imdbID }`)">{{ movie.Title }}</q-btn>
          </q-card-actions>
          <q-btn flat text-color="black" class="card-subtitle">{{ movie.Year }}</q-btn>
            <div class="rating-container">
                <template v-for="i in movie.qRating">
                    <q-icon name="thumb_up" color="amber-6" size="20px"></q-icon>
                </template>
            </div>
            <q-row>
              <q-card-actions>
                <q-btn label="+Add" color="primary" class="pull-right on-left" @click="addMovie(movie)"/>
              <q-btn color="accent">Rate {{ movie.qRating }}</q-btn>
              </q-card-actions>
            </q-row>

        <q-dialog v-model="showMovieDialog">
          <q-card>
            <q-card-section>
              <q-dialog-message v-if="success === true">
                Successfully saved the movie of "{{this.movieTitle}}" !
              </q-dialog-message>
              <q-dialog-message v-else-if="success === false">
                Error saving the movie. Please try again later.
              </q-dialog-message>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="OK" color="primary" @click="closeDialog" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </div>
  </div>
</div>  
  
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import axios from 'axios';
import url from '../http-common.js';
import { useRouter } from 'vue-router';


let films = [];
  
export default {
  name: 'MovieSearch',
  setup () {
    const showMovieDialog = ref(false);
    const session = ref(null);
    const success = ref(null);
    const router = useRouter();
    const searchTerm = ref(''); 
    const searchYear = ref('');
    const movies = ref([]);
    const movieTitle = ref(''); 
    const currentPage = ref(1); 
    const itemsPerPage = 4 // 4 columns per row, 1 rows per page
    const totalPages = computed(() => Math.ceil(movies.value.length / itemsPerPage))
    const sortBy = ref('title');
    const sortByOptions = ref([
      { label: 'Title', value: 'title' },
      { label: 'Year', value: 'year' },
    ]);
    
    const columns = computed(() => {
      const colArray = []
      for (let i = 0; i < totalPages.value; i++) {
        const col = []
        for (let j = 0; j < itemsPerPage; j++) {
          const index = i * itemsPerPage + j
          if (movies.value[index]) {
            col.push(movies.value[index])
          }
        }
        colArray.push(col)
      }
      return colArray
    })
    const paginatedMovies = computed(() => columns.value[currentPage.value - 1])
    
    const searchMovies = async () => {
      console.log(sortBy.value, searchYear.value);
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
        const response = await axios.get(endpoint)
        const data = response.data;
        movies.value = data.Search || [];

        // Generate random q-rating for each movie
        movies.value.forEach((movie) => {
          movie.qRating = randomNumber();
        });
      
        currentPage.value = 1;
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    };

    watchEffect(() => {
      if (movies.value.length > 0) {
        currentPage.value = 1
      }
    });

    const addMovie = (movie) => {
      const titleString = movie.Title ? movie.Title.toString() : '';
      const yearString = movie.Year ? movie.Year.toString() : '';
      const runtime = movie.Runtime ? parseInt(movie.Runtime, 10) : 0;
      const languageString = movie.Language ?movie.Language.toString() : '';
      const genreString = movie.Genre ? movie.Genre.toString() : '';
      const directorString = movie.Director ? movie.Director.toString() : '';
      
    axios.post(`${url}/film`, {
          title: titleString,
          year: yearString,
          runtime: runtime,
          language: languageString,
          genre: genreString,
          director: directorString,
          poster: movie.Poster,
        }, {
          headers: {
            'Authorization': `${session.value}`,
          },
        })
        .then((response) => {
          console.log('Movie added successfully', response.data);
          success.value = true;
          //success = true;
          movieTitle.value = movie.Title;
          console.log(movieTitle)
          showMovieDialog.value = true;
        })
        .catch((error) => {
          console.error('Error adding movie:', error);
          success.value = false;
          showMovieDialog.value = true;
        })
        //.finally(() => {
          //showMovieDialog.value = true;
        //});
    };
    const closeDialog = () => {
      showMovieDialog.value = false;
    };
    // Generate a random q-rating between 0 and 10
    const randomNumber = () => {
      return Math.floor(Math.random() * 9);
    };
    return {
      searchTerm,
      searchYear,
      movies,
      currentPage,
      itemsPerPage,
      totalPages,
      columns,
      paginatedMovies,
      searchMovies,
      movieTitle,
      addMovie,
      showMovieDialog,
      closeDialog,
      success,
      sortBy,
      sortByOptions,
      randomNumber,
    }
  }, //setup
  data() {
      return {
        error: false,
        filmsList:[], //by default null before call api
        films:[],
        movieTitle: '',
        session: this.$store.getters.getSession,
        ratingModel: {},
    }
  }, //data
}
</script>

<style scoped>
.movies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-color: black;
}

img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
  
.movie-card {
  width: 25%;
  margin-bottom: 1rem;
  text-color: black;
}

.q-pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.card-title{
  color: #0a0a0a;
}
  
.card-subtitle{
  color: #0a0a0a;
}

.custom-card {
  margin: 1px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

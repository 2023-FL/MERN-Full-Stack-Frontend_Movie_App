<template>
  <div>
    <q-input outlined v-model="searchTerm" placeholder="Search movies" @keyup.enter="searchMovies" />
    <div class="movies-container">
      <q-card class="movie-card" v-for="movie in paginatedMovies" :key="movie.imdbID">
        <q-card-section>
          <img :src="movie.Poster" alt="Movie Poster" />
        </q-card-section>
        <q-card-section>
          <q-card-title>{{ movie.Title }}</q-card-title>
          <q-card-subtitle>{{ movie.Year }}</q-card-subtitle>
        </q-card-section>
      </q-card>
    </div>

    <q-pagination
        v-model="currentPage"
        :max="totalPages"
        direction-links
        unelevated
        color="grey"
        active-color="primary"
    />

  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'

export default {
  name: 'MovieSearch',
  setup () {
    const searchTerm = ref('')
    const movies = ref([])
    const currentPage = ref(1)
    const itemsPerPage = 4// 4 columns per row, 1 rows per page
    const totalPages = computed(() => Math.ceil(movies.value.length / itemsPerPage))
    
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
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm.value}&apikey=bff6445f`)
      const data = await response.json()
      movies.value = data.Search || []
      currentPage.value = 1
    }

    watchEffect(() => {
      if (movies.value.length > 0) {
        currentPage.value = 1
      }
    })

    return {
      searchTerm,
      movies,
      currentPage,
      itemsPerPage,
      totalPages,
      columns,
      paginatedMovies,
      searchMovies
    }
  }
}
</script>

<style scoped>
.movies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.movie-card {
  width: 23%;
  margin-bottom: 1rem;
}

.q-pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
</style>

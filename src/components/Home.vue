<template>
  <div v-if="error">
    <q-banner inline-actions class="text-white bg-red">
      Sorry that there is a problem connecting to the API
    </q-banner>
  </div>
  <q-pagination
    v-model="currentPage"
    :min="1"
    :max="totalPages"
    @input="changePage"
    unelevated
    color="grey"
    active-color="primary"
  />
  <div v-if="!error">
    <template v-for="(row) in paginatedFilmsList" :key="row">
      <div class="row">
        <template v-for="(item) in row" :key="item.id">
          <div class="col-3">
          <q-card class="custom-card q-h-full q-flex q-flex-column q-justify-between">
            <!--<q-card>-->
            <q-img :src="item.poster" />
              <q-card-actions>
                <q-btn
                  flat
                  text-color="black"
                  @click="$router.replace(`/d/${item.id}`)"
                >{{ item.name }}</q-btn>
                <div id="q-app">
                  <div class="q-pa-md">
                    <div class="q-gutter-y-md column">
                      <q-row>
                      <q-btn color=accent>Rate {{item.rating}}</q-btn>  
                      <q-rating
                        v-model="ratingModel[item.id]"
                        v-for="n in getLimitedRating(item.rating)"
                        :key="n"
                        :value="1"
                        name="thumb_up"
                        size="1.3em"
                        color="amber-5"
                        :color="getIconColor(n)"
                      ></q-rating>
                      </q-row>
                    </div>
                  </div>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import url from '../http-common.js';

export default {
  data() {
    return {
      error: false,
      filmsList: [], // by default null before call api
      currentPage: 1,
      perPage: 6,
      totalPages: 0,
      ratingModel: {},
    }
  },
  created() {
    axios
      .get(`${url}/films`)
      .then((response) => {
        const films = response.data;
        let rowItems = [];
        for (let i = 0; i < films.length; i++) {
          const filmObj = {
            name: films[i].title,
            poster: films[i].poster,
            id: films[i]._id,
            rating: this.randomNumber(),
          };
          
          this.ratingModel[filmObj.id] = filmObj.rating;
          rowItems.push(filmObj);
          if (i % 4 === 3) {
            this.filmsList.push(rowItems);
            rowItems = [];
          }
        }
        this.totalPages = Math.ceil(this.filmsList.length / this.perPage);
      })
      .catch((err) => {
        console.log(err);
        this.error = true;
      });
    },
    computed: {
      paginatedFilmsList() {
        const start = (this.currentPage - 1) * this.perPage;
        const end = start + this.perPage;
        return this.filmsList.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    randomNumber() {
      return Math.floor(Math.random() * 10) + 1;
    },
    getLimitedRating(rating) {
      return Math.ceil(rating / 5); // Divide rating by 2 and round up to the nearest integer
    },
    getIconColor(rating) {
      const brightness = Math.ceil(rating / 2);
      return this.ratingModel[item.id] >= brightness ? 'positive' : 'negative';
    },
  }
};
</script>

<style>
.q-pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.custom-card {
  margin: 3px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  height: 93%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
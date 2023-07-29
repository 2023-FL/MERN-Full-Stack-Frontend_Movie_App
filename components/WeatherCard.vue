<template>
  <q-card class="weather-card">
    <q-card-section class="weather-section" v-if="weather">
      <div class="weather-icon">
        <img :src="weatherIconUrl" :alt="weather.description">
      </div>
      <div class="weather-info">
        <div class="weather-temperature">
          {{ weather.temperature }}°C
        </div>
        <div class="weather-description">
          {{ weather.description }}
        </div>
        <div class="weather-date">
          Updated:{{ lastUpdated }}
        </div>
        <div class="date">
          <p>Date: {{currentDate()}}</p>
        </div>  
      </div>
    </q-card-section>
    <q-card-section v-else>
      Loading...
    </q-card-section>
  </q-card>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      weather: null,
      lastUpdated: ''
    };
  },
  computed: {
    weatherIconUrl() {
      if (this.weather && this.weather.icon) {
        return `http://openweathermap.org/img/wn/${this.weather.icon}.png`;
      }
      return '';
    }
  },
  mounted() {
    this.getWeatherData();
    setInterval(() => {
      this.getWeatherData();
    }, 60000); // Fetch weather data every minute
  },
  methods: {
    getWeatherData() {
      const API_KEY = '39aff41e62423a3b8a4daed359f5cb30'; // Replace with your OpenWeatherMap API key
      const CITY = 'Hong Kong'; // Replace with the desired city name

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`;

      axios.get(url)
        .then(response => {
          this.weather = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon
          };

          this.lastUpdated = moment().format('HH:mm:ss');
        })
        .catch(error => {
          console.error(error);
        });
    },
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
      return date;
    }
  }
};
</script>

<style scoped>
.weather-card {
  max-width: 152px;
  max-height: 90px;
  margin: 0 auto;
  background-color: #FEF9D2;
  color: #FF8000;
  font-weight: bold;
}

.weather-section {
  display: flex;
  align-items: center;
}

.weather-icon img {
  width: 50px;
  height: 50px;
}

.weather-temperature {
  font-size: 15px;
  font-weight: bold;
}

.weather-description {
  font-size: 10px;
}

.weather-date {
  font-size: 10px;
  color: #1c1c1c;
}

.date{
  font-size: 10px;
  color: purple;
  }
</style>

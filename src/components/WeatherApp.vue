<template>
  <div>
    <h1>Weather App</h1>
    <weather-card :location="location" :weather="weather" />
  </div>
</template>

<script>
import axios from "axios";
import WeatherCard from "./WeatherCard.vue";

export default {
  components: {
    WeatherCard
  },
  data() {
    return {
      location: "Hong Kong",
      weather: {}
    };
  },
  mounted() {
    this.fetchWeatherData();
  },
  methods: {
    fetchWeatherData() {
      const apiKey = "39aff41e62423a3b8a4daed359f5cb30";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&units=metric&appid=${apiKey}`;

      axios
        .get(apiUrl)
        .then(response => {
          this.weather = {
            description: response.data.weather[0].description,
            icon: "wi-owm-" + response.data.weather[0].id,
            temperature: response.data.main.temp
          };
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

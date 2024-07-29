<template>
  <div :class="['weather-block', { favorite: isFavorite }]">
    <section class="head-section" v-if="showCityAutocomplete">
      <CityAutocomplete @city-selected="fetchWeather" />
      <button v-if="weatherData" @click="toggleFavorite">
        {{ isFavorite ? $t('removeFromFavorites') : $t('addToFavorites') }}
      </button>
    </section>
    <section class="card-section" v-if="weatherData">
      <div class="set-chart-buttons">
        <button @click="setView(true)">{{ $t('day') }}</button>
        <button @click="setView(false)">{{ $t('week') }}</button>
      </div>
      <WeatherCard :city="city" :weatherData="weatherData" />
    </section>
    <section class="chart-section">
      <button v-if="!isFavoritesView" @click="removeBlock">{{ $t('remove') }}</button>
      <TemperatureChart
        v-if="weatherData"
        :chartData="isHourly ? hourlyData : dailyData"
        :isHourly="isHourly"
        :chartId="city"
      />
    </section>
    <div v-if="isLoading" class="preloader">{{ $t('loading') }}</div>
  </div>
</template>

<script>
import CityAutocomplete from '@/components/CityAutocomplete.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import TemperatureChart from '@/components/TemperatureChart.vue'
import { getWeather, getForecast } from '@/api'

export default {
  components: {
    CityAutocomplete,
    WeatherCard,
    TemperatureChart
  },
  props: {
    initialCity: {
      type: String,
      default: ''
    },
    removeBlock: {
      type: Function,
      required: true
    },
    showCityAutocomplete: {
      type: Boolean,
      default: true
    },
    isFavoritesView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      city: this.initialCity,
      weatherData: null,
      hourlyData: [],
      dailyData: [],
      isHourly: true,
      isFavorite: false,
      isLoading: false
    }
  },
  mounted() {
    if (this.city) {
      this.fetchWeather({ name: this.city })
      this.checkFavorite()
    }
  },
  methods: {
    async fetchWeather(cityName) {
      this.city = cityName.name
      this.isLoading = true
      try {
        const weatherResponse = await getWeather(cityName.name)
        const forecastResponse = await getForecast(cityName.name)

        this.weatherData = {
          temp: weatherResponse.data.main.temp,
          description: weatherResponse.data.weather[0].description,
          humidity: weatherResponse.data.main.humidity,
          windSpeed: weatherResponse.data.wind.speed
        }

        this.processForecastData(forecastResponse.data.list)
      } catch (error) {
        console.error('Error fetching weather:', error)
      } finally {
        this.isLoading = false
      }
    },
    processForecastData(forecastData) {
      const currentDate = new Date().toISOString().split('T')[0]

      this.hourlyData = forecastData
        .filter((entry) => entry.dt_txt.split(' ')[0] === currentDate)
        .map((entry) => ({
          time: entry.dt_txt,
          temp: entry.main.temp
        }))

      const dailyTemps = forecastData.reduce((acc, entry) => {
        const date = entry.dt_txt.split(' ')[0]
        if (!acc[date]) acc[date] = []
        acc[date].push(entry.main.temp)
        return acc
      }, {})

      this.dailyData = Object.keys(dailyTemps).map((date) => ({
        date,
        temp: dailyTemps[date].reduce((sum, temp) => sum + temp, 0) / dailyTemps[date].length
      }))
    },
    setView(isHourly) {
      this.isHourly = isHourly
    },
    toggleFavorite() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || []
      if (this.isFavorite) {
        favorites = favorites.filter((favCity) => favCity !== this.city)
      } else {
        if (favorites.length < 5) {
          favorites.push(this.city)
        } else {
          alert('Maximum 5 cities can be added to favorites. Remove one to add another.')
          return
        }
      }
      localStorage.setItem('favorites', JSON.stringify(favorites))
      this.isFavorite = !this.isFavorite
      this.$emit('favorites-updated')
    },
    checkFavorite() {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || []
      this.isFavorite = favorites.includes(this.city)
    },
    removeBlock() {
      this.removeBlock(this.city)
    }
  }
}
</script>

<style scoped>
.weather-block {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  margin: 1rem 0;
  position: relative;
  min-height: 20rem;
}

.favorite {
  border-color: gold;
}

.set-chart-buttons {
  position: absolute;
  top: 1rem;
  left: 1rem;
}

button {
  margin-left: 5px;
}

section {
  margin: 1rem;
}

.head-section {
  display: flex;
  justify-content: space-between;
}

.card-section {
  position: relative;
  margin-top: 10rem;
}

.preloader {
  text-align: center;
  margin: 20px 0;
}
</style>

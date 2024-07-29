<template>
  <div class="weather-card">
    <h2>{{ city }}</h2>
    <p>{{ $t('temperature') }}: {{ weatherData.temp }}°C</p>
    <p>{{ $t('weather') }}: {{ weatherData.description }}</p>
    <p>{{ $t('humidity') }}: {{ weatherData.humidity }}%</p>
    <p>{{ $t('windSpeed') }}: {{ weatherData.windSpeed }} m/s</p>
  </div>
</template>

<script>
export default {
  props: ['city', 'weatherData']
}
</script>

<style scoped>
.weather-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}

@media (max-width: 600px) {
  .weather-card {
    padding: 12px;
  }
}
</style>

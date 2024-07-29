<template>
  <main>
    <h1>{{ $t('favorites') }}</h1>
    <section v-if="favorites.length">
      <WeatherBlock
        v-for="city in favorites"
        :key="city"
        :initialCity="city"
        :removeBlock="() => removeFavorite(city)"
        :showCityAutocomplete="false"
        :isFavoritesView="true"
        @favorites-updated="loadFavorites"
      />
    </section>
    <section v-else>
      <p>{{ $t('noFavorites') }}</p>
    </section>
  </main>
</template>

<script>
import WeatherBlock from '@/components/WeatherBlock.vue'

export default {
  components: {
    WeatherBlock
  },
  data() {
    return {
      favorites: []
    }
  },
  mounted() {
    this.loadFavorites()
  },
  methods: {
    loadFavorites() {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
    },
    removeFavorite(city) {
      this.favorites = this.favorites.filter((favCity) => favCity !== city)
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
      this.loadFavorites()
    }
  }
}
</script>

<style>
main {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  main {
    padding: 0 20px;
  }
}

@media (max-width: 600px) {
  main {
    padding: 0 10px;
  }
}
</style>

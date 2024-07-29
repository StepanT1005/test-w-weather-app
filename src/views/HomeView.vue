<template>
  <main>
    <section v-if="isLoading">
      <div class="preloader">{{ $t('loading') }}</div>
    </section>
    <WeatherBlock
      v-for="block in weatherBlocks"
      :key="block.id"
      :initialCity="block.city"
      :removeBlock="() => showConfirmModal(block.id)"
      :isFavoritesView="false"
      @favorites-updated="updateFavorites"
      @remove-block="removeBlock"
    />
    <button class="add-city-btn" @click="addCity">{{ $t('addCity') }}</button>
    <section v-if="error">
      <p class="error">{{ error }}</p>
    </section>
    <ConfirmModal
      :isVisible="showConfirmModalFlag"
      @confirm="confirmRemoveCity"
      @cancel="cancelRemoveCity"
    />
  </main>
</template>

<script>
import WeatherBlock from '@/components/WeatherBlock.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { v4 as uuidv4 } from 'uuid'
import { getUserLocation } from '@/api.js'

export default {
  components: {
    WeatherBlock,
    ConfirmModal
  },
  data() {
    return {
      weatherBlocks: [],
      isLoading: false,
      error: null,
      showConfirmModalFlag: false,
      cityToRemove: null
    }
  },
  mounted() {
    this.fetchDefaultWeather()
  },
  methods: {
    addCity() {
      if (this.weatherBlocks.length < 5) {
        this.weatherBlocks.push({ id: uuidv4(), city: '' })
      } else {
        alert(this.$t('maxBlocks'))
      }
    },
    showConfirmModal(cityId) {
      this.cityToRemove = cityId
      this.showConfirmModalFlag = true
    },
    confirmRemoveCity() {
      if (this.cityToRemove !== null) {
        this.weatherBlocks = this.weatherBlocks.filter((block) => block.id !== this.cityToRemove)
        this.cityToRemove = null
        this.showConfirmModalFlag = false
      }
    },
    cancelRemoveCity() {
      this.cityToRemove = null
      this.showConfirmModalFlag = false
    },
    removeBlock(cityId) {
      this.showConfirmModal(cityId)
    },
    async fetchDefaultWeather() {
      this.isLoading = true
      try {
        const response = await getUserLocation()
        const city = response.data.city
        this.weatherBlocks.push({ id: uuidv4(), city })
      } catch (error) {
        console.error('Error fetching default weather:', error)
        this.error = this.$t('fetchError')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  min-width: 360px;
  margin: 0 auto;
}
.preloader {
  text-align: center;
  margin: 20px 0;
}
.error {
  color: red;
  text-align: center;
  margin: 20px 0;
}
</style>

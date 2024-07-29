<template>
  <div class="autocomplete">
    <input type="text" v-model="search" @input="handleInput" placeholder="Enter city name" />
    <ul v-if="suggestions.length">
      <li v-for="suggestion in suggestions" :key="suggestion.id" @click="selectCity(suggestion)">
        {{ suggestion.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getCitySuggestions } from '@/api'

export default {
  data() {
    return {
      search: '',
      suggestions: []
    }
  },
  methods: {
    handleInput() {
      if (this.search.length < 2) {
        this.suggestions = []
        return
      }
      getCitySuggestions(this.search)
        .then((suggestions) => {
          this.suggestions = suggestions
        })
        .catch((error) => {
          console.error('Error fetching cities:', error)
          this.suggestions = []
        })
    },
    selectCity(suggestion) {
      this.$emit('city-selected', suggestion)
      this.search = ''
      this.suggestions = []
    }
  }
}
</script>

<style scoped>
.autocomplete {
  position: relative;
  width: 100%;
  max-width: 300px;
}
.autocomplete input {
  padding: 8px;
  width: 100%;
}
.autocomplete ul {
  position: absolute;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  background: rgb(80, 56, 56);
  border: 1px solid #ccc;
}
.autocomplete li {
  padding: 8px;
  cursor: pointer;
}
.autocomplete li:hover {
  background-color: #7599b6;
}

@media (max-width: 600px) {
  .autocomplete {
    max-width: 100%;
  }
}
</style>

<template>
  <header>
    <img alt="weather logo" class="logo" src="@/assets/logo.png" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">{{ $t('home') }}</RouterLink>
        <RouterLink to="/favorites">{{ $t('favorites') }}</RouterLink>
      </nav>
      <select v-model="$i18n.locale">
        <option value="en">English</option>
        <option value="uk">Українська</option>
      </select>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  margin-right: auto;
}

nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  font-weight: bold;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

@media (max-width: 600px) {
  nav {
    flex-direction: column;
    align-items: center;
  }

  nav a {
    margin: 5px 0;
  }
}
</style>

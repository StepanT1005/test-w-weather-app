import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    home: 'Home',
    weather: 'Weather',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    addCity: 'Add City',
    remove: 'Remove',
    day: 'Day',
    week: 'Week',
    favorites: 'Favorites',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
    loading: 'Loading...',
    fetchError: 'Failed to fetch default weather. Please try again.',
    maxBlocks: 'Maximum 5 cities can be added. You need to remove at least one',
    maxFavorites: 'Maximum 5 cities can be added to favorites. Remove one to add another.',
    noFavorites: 'No favorite cities added yet.',
    night: 'Night',
    confirmRemoveCity: 'Are you sure you want to remove this city?'
  },
  uk: {
    home: 'Головна',
    weather: 'Погода',
    temperature: 'Температура',
    humidity: 'Вологість',
    windSpeed: 'Швидкість вітру',
    addCity: 'Додати місто',
    remove: 'Видалити',
    day: 'День',
    week: 'Тиждень',
    favorites: 'Обране',
    addToFavorites: 'Додати в обране',
    removeFromFavorites: 'Видалити з обраного',
    loading: 'Завантаження...',
    fetchError: 'Не вдалося отримати погоду за замовчуванням. Будь ласка, спробуйте ще раз.',
    maxBlocks: 'Максимум 5 міст можна додати. Вам потрібно видалити хоча б одне',
    maxFavorites: 'Максимум 5 міст можна додати до обраного. Видаліть одне, щоб додати інше.',
    noFavorites: 'Ще не додано жодного улюбленого міста.',
    night: 'Ніч',
    confirmRemoveCity: 'Ви впевнені, що хочете видалити це місто?'
  }
}

const i18n = createI18n({
  locale: 'en',
  messages
})

export default i18n

<template>
  <div class="search-container-wrap">
    <div class="search-container">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Введите город..."
          @keyup.enter="searchWeather"
          name="city-search"
      />
      <button @click="searchWeather" :disabled="loading">
        {{ loading ? 'Загрузка...' : 'Найти' }}
      </button>
    </div>
    <div class="list-city">
      <div
          v-for="item of useDestinationStore.listLocations"
          :key="item.lat"
          class="list-city__item"
          @click="handleCityClick(item)"
      >
        {{ item.local_names?.ru || item.name }}  ({{item.country}}{{item.state ? ` - ${item.state}` : ''}})
      </div>
    </div>
  </div>
</template>

<script>
import {useDestinationStore} from "@/store/DestinationStore";

export default {
  name: 'SearchBar',
  data(){
    return {
      searchQuery: "",
    }
  },
  computed: {
    useDestinationStore(){
      return useDestinationStore()
    },
    loading(){
      return useDestinationStore().loading
    },
    error(){
      return useDestinationStore().error
    }
  },
  methods: {
    searchWeather(){
      const city = this.searchQuery.trim()
      if (city) {
        useDestinationStore().fetchGetLocations(city)
        this.searchQuery = '' // очистка поля  после отправки
      }
    },
    handleCityClick(item) {
      const city_name = item.local_names?.ru || item.name;
      const country_name = item.country;

      useDestinationStore().fetchFindCityWeather(city_name, country_name);
      useDestinationStore().listLocations = [] //очистка списка после выбора города
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container-wrap{
  max-width: 500px;
  width: 100%;
  margin: 5px auto 20px;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px auto 0;
  position: relative;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  outline: 1px solid #2A4C5E;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #2A4C5E;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.2s;

  &:active{
    opacity: 0.8;
    transition: 0.2s;
  }
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.list-city {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
}

.list-city__item {
  padding: 8px 0;
  background-color: #f9f9fb;
  font-size: 16px;
  line-height: 120%;
  color: #2d3748;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:first-child{
    border-radius: 8px 8px 0 0;
  }

  &:last-child{
    border-radius: 0 0 8px 8px;
  }
}

.list-city__item:hover {
  background-color: #edf2f7;
}
</style>
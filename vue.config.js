const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/forecast-weather-project/' : '/',
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        //устанавливаю файл с глобальными переменными и миксинами - становятся доступны во всех файлах
        additionalData: `
        @import "@/assets/styles/_variables.scss"; 
        @import "@/assets/styles/_breakpoints.scss";`
      }
    }
  }
})

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/forecast-weather-project/',
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        //устанавливаю файл с глобальными переменными и миксинами - становятся доступны во всех файлах
        additionalData: `
        @import "@/assets/styles/_variables.scss"; 
        @import "@/assets/styles/_mixins.scss";
        @import "@/assets/styles/_breakpoints.scss";`
      }
    }
  }
})

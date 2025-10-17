<template>
  <footer>
    <block-wrap>
      <div class="footer-container">
        <span>Источник данных о погоде: OpenWeather.org</span>
      </div>
    </block-wrap>
  </footer>
</template>

<script>
import BlockWrap from "@/components/Common/BlockWrap.vue";

export default {
  components: { BlockWrap },
};
</script>

<style lang="scss" scoped>
footer {
  padding: 20px;
  box-sizing: border-box;
  background: $background_color_footer;
}

.footer-container {
  span {
    font-size: 20px;
    line-height: 114%;
    color: $light_color;
  }
}
</style>

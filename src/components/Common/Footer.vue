<template>
  <footer>
    <block-wrap></block-wrap>
  </footer>
</template>

<script>
import BlockWrap from "@/components/Common/BlockWrap.vue";

export default {
  components: {BlockWrap}

}
</script>

<style lang="scss" scoped>
  footer{
    padding: 20px;
    box-sizing: border-box;
    background: $background_color_footer;
}
</style>
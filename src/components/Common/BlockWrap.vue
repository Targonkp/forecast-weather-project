<template>
  <div class="block-wrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BlockWrap',
}
</script>

<style lang="scss" scoped>
  .block-wrap{
    max-width: 1920px;
    padding: 20px 3%;
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
  }
</style>
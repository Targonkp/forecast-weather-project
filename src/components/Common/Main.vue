<template>
  <main>
    <block-wrap>
      <slot></slot>
    </block-wrap>
  </main>
</template>

<script>
import BlockWrap from "@/components/Common/BlockWrap.vue";

export default {
  name: 'Main',
  components: {BlockWrap}
}
</script>

<style lang="scss" scoped>
  main{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
</style>
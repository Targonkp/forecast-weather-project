<template>
  <div class="button-wrap">
    <button class="button-block">
      <slot />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseButton",
});
</script>

<style scoped lang="scss">
.button-wrap {
  width: clamp(120px, 10%, 140px);
  margin: 40px auto;
}

.button-block {
  border: none;
  border-radius: 5%;
  outline: none;
  font-size: 18px;
  line-height: 120%;
  width: 100%;
  padding: 5px 7px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: $white_color;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    background: $light_color;
    opacity: 0.55;
    width: 0;
    height: 0;
    top: 0;
    left: 0;
    transition: 0.22s;
    border-radius: 50%;
  }

  &:hover::before {
    width: 100%;
    height: 100%;
    transform: scale(1.7);
    transition: 0.3s;
  }
}
</style>

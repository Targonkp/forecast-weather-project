<template>
  <div class="switch-wrap">
    <label class="switch-label">
      <input
        type="checkbox"
        class="switch-input"
        :checked="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <span class="switch-slider" :style="cssVars"></span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppSwitch",
  props: {
    modelValue: {
      type: Boolean,
      required: false,
    },
    switchColor: {
      type: String,
      default: "#2c3e50",
    },
  },
  computed: {
    cssVars(): Record<string, string> {
      return {
        "--switch-color": this.switchColor,
      };
    },
  },
});
</script>

<style scoped lang="scss">
.switch-wrap {
  margin: 8px 0;
}

.switch {
  &-label {
    width: 56px;
    height: 28px;
    display: inline-block;
    position: relative;
  }

  &-input {
    display: none;
  }

  &-slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: #ccc;
    border-radius: 30px;

    &:before {
      position: absolute;
      content: "";
      height: 24px;
      width: 24px;
      background: var(--switch-color);
      border-radius: 50%;
      top: 50%;
      left: 3px;
      transition: transform 0.3s;
      transform: translateY(-50%) translateX(0);
    }
  }
}

.switch-input:checked + .switch-slider:before {
  transition: transform 0.35s;
  transform: translateY(-50%) translateX(26px);
}
</style>

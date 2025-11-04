<template>
  <div class="select-wrap">
    <div class="select-wrap__selected" :class="{ open: open }" @click="toggleOpen">{{ selectedValue }}</div>
    <div class="select-wrap__items-list" :class="{ selectHide: !open }">
      <div class="select-wrap__item" v-for="(option, i) of options" :key="i" @click="selectOption(option)">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomDropdown",
  props: {
    options: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: false,
      default: "Выбрать",
    },
  },
  data() {
    return {
      open: false,
      selectedValue: this.selected,
    };
  },
  methods: {
    selectOption(option: string): void {
      this.selectedValue = option;
      this.open = false;
      this.$emit("change", option);
    },
    toggleOpen() {
      this.open = !this.open;
    },
  },
});
</script>

<style scoped lang="scss">
.select-wrap {
  position: relative;
  width: 180px;
  outline: none;
  text-align: left;

  &__selected {
    padding: 8px 16px;
    border-radius: 6px;
    background: rgba(129, 139, 144, 0.35);
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    line-height: 110%;
    transition: background-color 0.3s;

    &.open {
      background: rgba(32, 44, 57, 0.35);
      border-radius: 6px 6px 0 0;
      border-bottom: 1px solid #101910;
    }
  }

  &__items-list {
    position: absolute;
    width: 100%;
    background: rgba(129, 139, 144, 0.35);
    box-sizing: border-box;
    padding: 2px 8px 8px 8px;
    font-size: 18px;
    line-height: 110%;
    cursor: pointer;
  }

  &__item {
    border-bottom: 1px solid #42465a;
    padding: 4px 0;
  }
}

.selectHide {
  display: none;
}
</style>

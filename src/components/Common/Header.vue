<template>
  <header>
    <block-wrap>
      <nav>
        <router-link to="/" v-slot="{ isActive }"
          ><span :class="['menu-link', isActive && 'menu-link-active']">Главная</span></router-link
        >
        |
        <router-link to="/forecast" v-slot="{ isActive }"
          ><span :class="['menu-link', isActive && 'menu-link-active']">Прогноз</span></router-link
        >
        |
        <router-link to="/map" v-slot="{ isActive }"
          ><span :class="['menu-link', isActive && 'menu-link-active']">Карта</span></router-link
        >
      </nav>
    </block-wrap>
  </header>
</template>

<script>
import BlockWrap from "@/components/Common/BlockWrap.vue";

export default {
  components: { BlockWrap },
};
</script>

<style lang="scss" scoped>
header {
  padding: 10px;
  box-sizing: border-box;
  background: $background_color_header;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

nav {
  display: inline-block;
  background: #558bae;
  padding: 10px 80px;
  box-sizing: border-box;
  border-radius: 5px;

  a {
    text-decoration: none;
  }
}

.menu-link {
  color: $link_color;
  font-size: 24px;
  line-height: 110%;
  transition: 0.2s;
  opacity: 0.85;

  &:hover {
    opacity: 0.7;
    transition: 0.2s;
  }

  &-active {
    color: $link_color_active;
    border-bottom: 1px solid $link_color_active;
    opacity: 1;
  }
}
</style>

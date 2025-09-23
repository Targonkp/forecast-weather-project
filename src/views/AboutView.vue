<template>
  <Header/>
  <Main>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </Main>
  <Footer/>
</template>

<script>
import Header from "@/components/Common/Header.vue";
import Footer from "@/components/Common/Footer.vue";
import Main from "@/components/Common/Main.vue";

export default {
  name: 'About',
  components: {Footer, Header, Main}
}
</script>

<style lang="scss" scoped>

</style>
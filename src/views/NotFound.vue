<template>
  <div class="not-found">
          <h1>404</h1>
          <p>Страница не найдена</p>
          <router-link to="/" class="btn">На главную</router-link>
        </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style lang="scss" scoped>
  :deep(.block-wrap) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

  .not-found {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5rem;
    color: #333;
  }

  .not-found h1 {
    font-size: 64px;
    line-height: 110%;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: #6c757d;

    @include medium{
      font-size: 58px;
    }

    @include small{
      font-size: 50px;
    }
  }

  .not-found p {
    font-size: 40px;
    line-height: 110%;
    margin: 0 0 20px 0;
    opacity: 0.8;

    @include medium{
      font-size: 36px;
    }

    @include small{
      font-size: 30px;
    }
  }

  .btn {
    display: inline-block;
    padding: 8px 20px;
    background: #7b8183;
    color: $white_color;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
    transition: opacity 0.2s;
  }

  .btn:hover {
    opacity: 0.7;
  }

</style>
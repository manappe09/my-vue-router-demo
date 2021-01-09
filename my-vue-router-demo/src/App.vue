<template>
  <div id="app">
    <h1>うさぎとかめ大会</h1>
    <nav class="nav">
      <router-link
        to="/"
        class="p-router_link"
        active-class="router_link--active"
        exact
        >ホーム</router-link
      >
      <router-link
        to="/tournament/list/1"
        class="p-router_link"
        active-class="router_link--active"
        >大会一覧</router-link
      >
      <router-link
        :to="{
          name: 'categories-root',
          params: { category: 'beginner' },
          query: { hoge: 1, type: 'test' },
        }"
        class="p-router_link"
        active-class="router_link--active"
        >カテゴリ一覧</router-link
      >
    </nav>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["category"],
};
</script>

<style scoped>
.router_link--active {
  font-size: 1.1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
</style>

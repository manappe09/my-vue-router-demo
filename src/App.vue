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
        to="/tournament/level/1"
        class="p-router_link"
        active-class="router_link--active"
        >大会一覧</router-link
      >
      <!-- 動的に変更できないのわからん -->
      <router-link
        :to="{
          name: 'categories-route',
          params: { category: 1 },
          hash: '#category-target',
        }"
        class="p-router_link"
        active-class="router_link--active"
        >カテゴリ一覧</router-link
      >
    </nav>
    <transition name="fade" mode="out-in" @before-enter="beforeEnter">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['category'],
  methods: {
    showLog() {
      console.log(this.$route.params);
    },
    beforeEnter() {
      this.$root.$emit('triggerScroll');
    }
  }
};
</script>

<style scoped>
.router_link--active {
  font-size: 1.1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
</style>

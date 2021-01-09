<template>
  <div>
    <h1>トーナメント</h1>
    <p @click="toList" class="p-router_link" active-class="router_link--active">
      大会一覧
    </p>
    <router-link
      :to="{path: '/tournament/level/1', query: {id: 1, lang: 'ja'}, hash: 'hogehoge'}"
      class="p-router_link"
      active-class="router_link--active"
      exact
      >大会レベル一覧</router-link
    >
    <router-view name="header"></router-view>
    <router-view></router-view>
    <!-- <p>{{ $route.param.listNumber }}</p>
    <p>{{ $route.param.levelNumber }}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    listNumber: String,
    levelNumber: String,
  },
  methods: {
    toList() {
      this.$router.push({
        name: 'list-number-route',
        params: {
          listNumber: 1,
        }
      }).catch(() => {});
    },
    beforeRouteEnter(to, from, next) {
      next()
    }
  },
};
</script>

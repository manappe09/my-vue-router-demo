<template>
  <div>
    <h1>トーナメント</h1>
    <p @click="toList" class="p-router_link" active-class="router_link--active">
      大会一覧
    </p>
    <router-link
      :to="{
        name: 'level-number-route',
        params: { level: level + 1},
        query: { id: 1, lang: 'ja' },
        hash: 'hogehoge',
      }"
      class="p-router_link"
      active-class="router_link--active"
      @click.native="showLog"
      exact
      >大会レベル一覧</router-link
    >
    <router-view name="header"></router-view>
    <transition enter-active-class="animate__animated animate__flipInX" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 1
    },
    list: {
      type: Number
    }
  },
  methods: {
    toList() {
      this.$router
        .push({
          name: "list-number-route",
          params: {
            list: 1,
          },
        })
        .catch(() => {});
      console.log(this.$route.params);
    },
    showLog() {
      console.log(this.$route.params);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm.level);
    })
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    if(confirm('本当にこのページを離れますか？')) {
      next();
    } else {
      next(false);
    }
  }
};
</script>

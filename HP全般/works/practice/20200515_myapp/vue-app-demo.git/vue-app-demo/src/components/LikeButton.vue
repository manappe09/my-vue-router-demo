<template>
  <div class="like_button_component">
   <button class="like_button" @click="incrementCount">いいね&nbsp;{{ count }}</button>
  </div>
</template>

<script>
  export default {
    props: ['totalCount'],
    computed: {
      count() {
        return Math.floor(this.totalCount / 3);
      }
    },
    methods: {
      incrementCount() {
        this.$emit('my-count', this.totalCount++);
      }
    }
  }
</script>

<style scoped>
.like_button {
  display: inline-block;
  margin: 2rem 1rem;
}
</style>
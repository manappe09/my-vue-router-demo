<template>
  <div>
    <button @click="pageReload">Page Reload</button>
  </div>
</template>

<script>
  export default {
    methods: {
      pageReload() {
        location.reload();
      }
    }
  }
</script>

<style scoped>
  button {
    margin: 1em 0;
    padding: .5em 1em;
    background-color: rgb(180, 190, 167);
    color: rgb(32, 51, 7);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all .2s;
  }
  button:hover {
    opacity: .7;
  }
</style>
<template>
  <div id="app">
    <h1>This is <span>Vue</span> App!!</h1>
    <label for="test">enter any message here!!</label>
    <input id="test" type="text" v-model="test">
    {{ test }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 'default message',
    }
  }
}
</script>
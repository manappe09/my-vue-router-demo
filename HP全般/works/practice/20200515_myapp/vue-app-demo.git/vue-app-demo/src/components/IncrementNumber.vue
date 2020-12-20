<template>
    <button @click="incrementNumber">ボタン{{ buttonName }}: {{ number }}</button>
</template>

<script>
  export default {
    props: {
      'buttonName': String,
      'totalNumber': {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        number: 0,
      }
    },
    methods: {
      incrementNumber() {
        this.number++;
        this.$emit('my-click', + 1);
      }
    }
  }
</script>
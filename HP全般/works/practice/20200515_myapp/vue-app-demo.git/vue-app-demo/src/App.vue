<template>
  <div id="app">
    <h1>Hello, Vue.js!!</h1>
    <p>Let's enjoy the practice for Vue.js!!</p>
    <h3>合計いいね数: {{ totalCount }}</h3>
    <div class="buttons l-flex">
      <LikeButton :total-count="totalCount" @my-count="totalCount = $event"></LikeButton>
      <LikeButton :total-count="totalCount" @my-count="totalCount = $event"></LikeButton>
      <LikeButton :total-count="totalCount" @my-count="totalCount = $event"></LikeButton>
    </div>
    <PageReload></PageReload>
    <hr>
    <h4>合計クリック数:&nbsp;{{ totalNumber }}</h4>
    <IncrementNumber :button-name="buttonNames[0].name" @my-click="totalNumber += $event"></IncrementNumber>
    <IncrementNumber :button-name="buttonNames[1].name" @my-click="totalNumber += $event"></IncrementNumber>
    <IncrementNumber :button-name="buttonNames[2].name" @my-click="totalNumber += $event"></IncrementNumber>
    <br>
    <hr>
    <br>
    <form>
      <input type="text" v-model="value" required autofocus>
      <button @click.prevent="pushButtonLists">行きたいところを追加</button>
    </form>
    <h4>行きたいところリスト</h4>
    <ul>
      <li v-for="(item, index) in colorList" :key="index">{{ item }}<button class="delete_button" @click="deleteSelf(index)">削除</button></li>
    </ul>
  </div>
</template>

<script>
  import LikeButton from './components/LikeButton.vue';
  import PageReload from './components/PageReload.vue';
  import IncrementNumber from './components/IncrementNumber.vue';

  export default {
    data: function() {
      return {
        totalCount: 5,
        buttonNames: [
          {name: '赤', id: 1},
          {name: '青', id: 2},
          {name: '緑', id: 3},
        ],
        totalNumber: 0,
        colorList: [],
        value: ''
      }
    },
    components: {
      LikeButton,
      PageReload,
      IncrementNumber
    },
    methods: {
      pushButtonLists() {
        if(this.value) {
          this.colorList.push(this.value);
        } else {
          alert('Fill the form, please!')
        }
        this.value = '';
      },
      deleteSelf(index) {
        this.colorList.splice(index, 1);
      }
    }
  }
</script>

<style>
  .l-flex {
    display: flex;
  }
  button {
    cursor: pointer;
    transition: all .2s;
  }
  * + button {
    margin-left: .5em;
  }
  button:hover {
    opacity: .7;
  }
  .delete_button {
    margin-left: 1rem;
    margin-bottom: .5rem;
  }
</style>




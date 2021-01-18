<template>
  <div>
    <h1>ホーム</h1>
    <p>
      速さ自慢のうさぎと、根気自慢のかめ。12kmの道のりを先に制すのはどちらだ？！
    </p>
    <h3>みんなの予想</h3>
    <br />
    <label for="name">ニックネーム</label>&nbsp;
    <input
      type="text"
      id="name"
      placeholder="ニックネーム"
      v-model="name"
    /><br />
    <label for="prediction">予想</label>&nbsp;
    <textarea
      id="prediction"
      placeholder="予想を入力してね"
      v-model="prediction"
    ></textarea
    ><br /><br />
    <button @click="createPost">投稿する！</button>
    <hr>
    <div v-for="post in posts" :key="post.name">
      <h5>{{ post.fields.name.stringValue }}</h5>
      <p>{{ post.fields.prediction.stringValue }}</p>
      <hr>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      prediction: "",
      posts: []
    };
  },
  created() {
    axios
      .get(
        "https://firestore.googleapis.com/v1/projects/vuejs-http-7bfff/databases/(default)/documents/posts")
      .then(response => {
          this.posts = response.data.documents;
        }
      );
  },
  methods: {
    createPost() {
      axios
        .post(
          "https://firestore.googleapis.com/v1/projects/vuejs-http-7bfff/databases/(default)/documents/posts",
          {
            fields: {
              name: {
                stringValue: this.name,
              },
              prediction: {
                stringValue: this.prediction,
              },
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

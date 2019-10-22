<template>
  <div class="article-detail">
    <wxParse :content="content"/>
  </div>
</template>

<script>
import { get, post } from "../../utils";
import { mapState, mapMutations } from "vuex";
import wxParse from "mpvue-wxparse";
export default {
  onShow() {
    this.id = this.$root.$mp.query.id
    this.id && this.getArticleContent(this.id)
  },
  computed: {
  },
  mounted() {},
  data() {
    return {
      id: null,
      content: ''
    };
  },
  components: {
    wxParse
  },
  created() {},
  onLoad () {},
  methods: {
    // 获取轮播图
    getArticleContent(articleId) {
      post(`/article/getArticleContent?articleId=${articleId}`).then(res => {
        if (res.success) {
          this.content = res.result
        }
      })
    },
  }
};
</script>

<style lang='scss' scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
@import "./style.scss";
</style>

<template>
  <div class="publish_task">
    <!-- --{{list.length}}-- -->
    <template v-if="list.length > 0">
      <div class="weui-form-preview" v-for="(item, index) in list" :key="index">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__label">发布的任务1</div>
          <div class="weui-form-preview__value_in-hd">{{item.taskName}}&#12288;</div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">完成奖励</div>
            <div class="weui-form-preview__value">{{item.complete}}积分</div>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">对象</div>
            <div class="weui-form-preview__value">{{item.targetType == 'ALL' ? '全体员工' : '部分人'}}</div>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">开始时间</div>
            <div class="weui-form-preview__value">2019-09-10</div>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">结束时间</div>
            <div class="weui-form-preview__value">2019-09-11</div>
          </div>
        </div>
      </div>
    </template>

    <div v-else>
      <div class="page__bd" style="padding-top: 150rpx; text-align: center;">
        <div class="icon-box">
          <icon type="info" size="93"></icon>
          <div class="icon-box__ctn">
            <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">暂无数据</div>
          </div>
        </div>
      </div>
    </div>

<!--
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">发布的任务2</div>
        <div class="weui-form-preview__value_in-hd">&#12288;</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">完成奖励</div>
          <div class="weui-form-preview__value">100积分</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">对象</div>
          <div class="weui-form-preview__value">全体员工</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">开始时间</div>
          <div class="weui-form-preview__value">2019-09-10</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">结束时间</div>
          <div class="weui-form-preview__value">2019-09-11</div>
        </div>
      </div>
    </div>

    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">发布的任务3</div>
        <div class="weui-form-preview__value_in-hd">&#12288;</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">完成奖励</div>
          <div class="weui-form-preview__value">100积分</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">对象</div>
          <div class="weui-form-preview__value">全体员工</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">开始时间</div>
          <div class="weui-form-preview__value">2019-09-10</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">结束时间</div>
          <div class="weui-form-preview__value">2019-09-11</div>
        </div>
      </div>
    </div>

 -->

    <div class="sureBth">
      <button class="weui-btn" type="primary" @click="handleCreate">创建新任务</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      // banner: [],
      list: []
    };
  },
  components: {},
  methods: {
    handleCreate(){
      wx.navigateTo({
        url: '/pages/adminPublishTaskCreate/main'
      })
    },
    // ...mapMutations(["update"]),
    async getData() {
      const data = await post(`/shop/task/queryPublishedTasks?shopId=${this.$store.state.userInfo.shopId}`)
      if(data.success){
        this.list = data.result ? data.result : []
      }
      // const data = await get("/index/index");
      // this.banner = data.banner;
    },
    // topicdetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/topicdetail/main?id=" + id
    //   });
    // },
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>

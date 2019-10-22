<template>
  <div class="login-container">
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_vcode">
        <view class="weui-cell__bd">
          <input class="weui-input" type="number" placeholder="请输入您的手机号" />
        </view>
      </view>
      <view class="weui-cell weui-cell_vcode">
        <view class="weui-cell__bd">
          <input class="weui-input" type="number" placeholder="请输入验证码" />
        </view>
        <view class="weui-cell__ft">
          <view class="weui-vcode-btn">获取验证码</view>
        </view>
      </view>
    </view>
    <view class="weui-btn-area">
      <button class="weui-btn" type="primary" @click="login">登录</button>
    </view>
  </div>
</template>

<script>
import { get, post } from "../../utils";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      banner: [
        'https://oss.chlpartner.com/distribution/gold/images/index/swiper1.png',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
      activeNav: '1',
      navData: [{
        text: '推荐',
        value: '1'
      }, {
        text: '美容',
        value: '2'
      }, {
        text: '美体',
        value: '3'
      }, {
        text: '丰胸',
        value: '4'
      }, {
        text: '美白',
        value: '5'
      }, {
        text: '整形',
        value: '6'
      }, {
        text: '微整',
        value: '7'
      }],
    };
  },
  components: {},
  methods: {
    ...mapMutations(["update"]),

    getData() {
      post("/commPoster/getPoster").then(res => {
        console.log(3333, res)
      })
    },

    // 切换类别
    changeNav(item) {
      this.activeNav = item.value
    },

    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    },

  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

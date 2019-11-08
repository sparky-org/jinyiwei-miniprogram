<template>
  <div class="my-center">
    <!-- 个人中心
    <div class="weui-cells__title">带说明的列表项</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">标题文字</div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div> -->
    <div class="weui-toptips weui-toptips_warn" v-if="showErrorTips">错误提示</div>

    <div class="weui-cells weui-cells_after-title">

      <div class="weui-cell weui-cell_input weui-cell_vcode" style="padding-top: 20rpx; padding-bottom: 20rpx;">
        <div class="weui-cell__hd">
          <div class="weui-label">头像</div>
        </div>
        <div class="weui-cell__bd">
          &#12288;
        </div>
        <div class="weui-cell__ft">
          <image class="weui-vcode-img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" style="border-radius: 50%; width: 50px; height: 50px; margin-right: 30rpx;" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">用户名</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" :disabled="type==null" placeholder="请输入姓名" v-model="form.name" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" :disabled="type==null" placeholder="请输入手机号" v-model="form.tel" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">职位</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" :disabled="type==null" placeholder="请输入职位" v-model="form.position" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">工号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" :disabled="type==null" placeholder="请输入工号" v-model="form.no" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">总积分</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" :disabled="type==null" placeholder="请输入总积分" v-model="form.score" />
        </div>
      </div>
    </div>




    <div class="add-customer" v-if="type=='edit'">
      <button class="weui-btn" type="primary">提交</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
export default {
  onShow() {
    this.type = this.$root.$mp.query.type;
    console.info(this.type)
    wx.setNavigationBarTitle({
      title: this.type ? '修改个人信息' : '个人信息'
    })
  },
  computed: {

  },
  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role)
    // this.getData();
  },
  data() {
    return {
      showErrorTips: false,
      // role: ''
      type: null,
      form: {
        name: '邹志辉',
        tel: 18210982345,
        position: '美容师',
        no: 12,
        score: 109
      }
    };
  },
  components: {},
  methods: {


    // async getData() {
    //   const data = await get("/index/index");
    //   this.banner = data.banner;
    //   this.channel = data.channel;
    //   this.brandList = data.brandList;
    //   this.newGoods = data.newGoods;
    //   this.hotGoods = data.hotGoods;
    //   this.topicList = data.topicList;
    //   this.newCategoryList = data.newCategoryList;
    // }
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

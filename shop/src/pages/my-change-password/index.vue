<template>
  <div class="page">
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


      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">原始密码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="password" placeholder="请输入原始密码" v-model="form.password" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">新密码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="password" placeholder="请输入新密码" v-model="form.newPwd" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">确认新密码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="password" placeholder="请再次输入新密码" v-model="form.repPwd" />
        </div>
      </div>

    </div>




    <div class="add-customer">
      <button class="weui-btn" type="primary">确认修改</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
export default {
  onShow() {
    // this.type = this.$root.$mp.query.type;
    // console.info(this.type)
    // wx.setNavigationBarTitle({
    //   title: this.type ? '修改个人信息' : '个人信息'
    // })
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
      // type: null,
      form: {
        password: '',
        newPwd: '',
        repPwd: ''
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

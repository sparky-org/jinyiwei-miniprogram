<template>
  <div class="customer">


    <div class="weui-cells__title">数据统计</div>
    <div class="count">
      <div class="weui-flex ">
        <div class="weui-flex__item">
          <div class="placeholder">&#12288;今日新增：10人</div>
        </div>
        <div class="weui-flex__item">
          <div class="placeholder">本月新增：100人</div>
        </div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="placeholder">本季度新增：200人</div>
        </div>
        <div class="weui-flex__item">
          <div class="placeholder">今年新增：1010人</div>
        </div>
      </div>
    </div>


    <div class="weui-cells__title">活跃客户曲线</div>
    <div class="echart-area" style="line-height: 150px; text-align: center; color: #ccc;">
      这个是一个图表
    </div>


    <div class="weui-cells__title">我的客户</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">张三&#12288;<span style="color: #ccc;">182****8238</span></div>
        <div class="weui-cell__ft">2019-10-02</div>
      </div>
      <div class="weui-cell">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">刘德华&#12288;<span style="color: #ccc;">171****0217</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </div>
      <div class="weui-cell">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">赵本山&#12288;<span style="color: #ccc;">152****8643</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </div>
      <div class="weui-cell">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">林俊杰&#12288;<span style="color: #ccc;">181****3212</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </div>
      <div class="weui-cell">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">刘德华&#12288;<span style="color: #ccc;">171****0217</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </div>
      <div class="weui-cell">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">赵本山&#12288;<span style="color: #ccc;">152****8643</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </div>
      <div class="weui-cell">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">林俊杰&#12288;<span style="color: #ccc;">181****3212</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </div>
    </div>

    <div class="add-customer">
      <navigator style="padding:0;" url="/pages/customer-operate/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <button class="weui-btn" type="primary" style="width: 100%;">添加客户</button>
      </navigator>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
export default {
  onShow() {
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
      // role: ''
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

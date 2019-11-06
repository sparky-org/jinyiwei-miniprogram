<template>
  <div class="my_data" v-if="data">
    <!-- 数据大盘   -->
    <!-- <view class="page-section-spacing">
    <scroll-view class="scroll-view_H" scroll-x="true" scroll-y="true" style="width: 100%; height: 100%;">
      <view id="demo1" class="scroll-view-item_H demo-text-1" style="width:1000px; height: 3000px;">1212</view>
      <view id="demo2"  class="scroll-view-item_H demo-text-2">1212</view>
      <view id="demo3" class="scroll-view-item_H demo-text-3">1212</view>
     </scroll-view>
    </view> -->
    <div class="page__hd">
      <div class="page__title" style="padding-top: 10px;">总用户数：{{data.shopCount}}</div>
      <div class="page__desc">月&#12288;&#12288;份：{{data.month}}</div>
    </div>
    <div style="padding: 5px;">
      <scroll-view scroll-x="true" scroll-y="true" :style="{'height': '100%'}">
        <ul class="my-data-table" style="border-left: 1rpx solid #ccc; border-top: 1rpx solid #ccc;">
          <li v-for="(item,index) in title" :key="index">{{item}}</li>
        </ul>
        <ul class="my-data-table" v-for="(item,index) in data.dataItemList" :key="index" style="border-left: 1rpx solid #ccc;">
          <li>{{item.shopName}}</li>
          <li>{{item.purchasGoodNum}}</li>
          <li>{{item.saleAmount}}</li>
          <li>{{item.employCount}}</li>
          <li>{{item.customerCount}}</li>
          <li>{{item.customerPrepayAmount}}</li>
        </ul>
        <!-- <div :style="{'height': '200px','width': '1200px','background-color':'#ccc'}">tyuiolpo</div>
        <div :style="{'height': '200px','background-color':'red'}">dsdsd</div>
        <div :style="{'height': '200px','background-color':'red'}">grytyju</div> -->
        <!-- <div class="page__bd">
            <div class="weui-grids">
                <block v-for="(item,index) in data.dataItemList" :key="index">
                  <div class="weui-grid__label">{{item.name}}</div>
                </block>
            </div>
        </div> -->
      </scroll-view>
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
    title(){
      return Object.keys(this.enmu).map(item => {
        return this.enmu[item]
      })
    }
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      // banner: [],
      data:null,
      enmu: {
        // shopCount: '总用户数',
        // month: '月份',
        shopName: '商户名称',
        purchasGoodNum: '月进货量',
        saleAmount: '月销售额',
        employCount: '注册美容师',
        customerCount: '会员数',
        customerPrepayAmount: '会员消费额'
      }
    };
  },
  components: {},
  methods: {
    // ...mapMutations(["update"]),
    async getData() {
      const data = await post(`/agency/info/getData?agencyId=${this.$store.state.userInfo.agencyId}`);
      if(data.success){
        this.data = data.result
      }
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

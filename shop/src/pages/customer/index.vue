<template>
  <div class="customer">


    <div class="weui-cells__title">数据统计</div>
    <div class="count" v-if="info">
      <div class="weui-flex ">
        <div class="weui-flex__item">
          <div class="placeholder">&#12288;今日新增：{{info.today}}人</div>
        </div>
        <div class="weui-flex__item">
          <div class="placeholder">本月新增：{{info.thisMonth}}人</div>
        </div>
      </div>
      <div class="weui-flex">
        <div class="weui-flex__item">
          <div class="placeholder">本季度新增：{{info.thisSeason}}人</div>
        </div>
        <div class="weui-flex__item">
          <div class="placeholder">今年新增：{{info.thisYear}}人</div>
        </div>
      </div>
    </div>


    <div class="weui-cells__title">活跃客户曲线</div>
    <div class="echart-area">
      <mpvue-echarts :echarts="echarts" :onInit="onInit" />
    </div>


    <div class="weui-cells__title">我的客户</div>


    <div class="page__bd">
      <div class="weui-search-bar">
      <div class="weui-search-bar__form">
        <div class="weui-search-bar__box">
        <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
        <input type="text" class="weui-search-bar__input" placeholder="搜索顾客" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
        <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
          <icon type="clear" size="14"></icon>
        </div>
        </div>
        <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
        <icon class="weui-icon-search" type="search" size="14"></icon>
        <div class="weui-search-bar__text">搜索顾客</div>
        </label>
      </div>
      <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
      </div>
      <div class="weui-cells searchbar-result" v-if="inputVal.length > 0">
      <navigator url="" class="weui-cell" hover-class="weui-cell_active">
        <div class="weui-cell__bd">
        <div>实时搜索文本</div>
        </div>
      </navigator>
      <navigator url="" class="weui-cell" hover-class="weui-cell_active">
        <div class="weui-cell__bd">
        <div>实时搜索文本</div>
        </div>
      </navigator>
      <navigator url="" class="weui-cell" hover-class="weui-cell_active">
        <div class="weui-cell__bd">
        <div>实时搜索文本</div>
        </div>
      </navigator>
      <navigator url="" class="weui-cell" hover-class="weui-cell_active">
        <div class="weui-cell__bd">
        <div>实时搜索文本</div>
        </div>
      </navigator>
      </div>
    </div>


    <div class="weui-cells weui-cells_after-title no-t">
      <navigator url="/pages/customer-detail/main?customerId=1" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">陈菊&#12288;<span style="color: #ccc;">182****8238</span></div>
        <div class="weui-cell__ft">2019-11-18</div>
      </navigator>
      <navigator url="/pages/customer-detail/main?customerId=2" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">杨华&#12288;<span style="color: #ccc;">171****0217</span></div>
        <div class="weui-cell__ft">2019-01-16</div>
      </navigator>
      <navigator url="/pages/customer-detail/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">李本山&#12288;<span style="color: #ccc;">152****8643</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </navigator>
      <navigator url="/pages/customer-detail/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">李俊杰&#12288;<span style="color: #ccc;">181****3212</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </navigator>
      <navigator url="/pages/customer-detail/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">陈小平&#12288;<span style="color: #ccc;">171****0217</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </navigator>
      <navigator url="/pages/customer-detail/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">张磊&#12288;<span style="color: #ccc;">152****8643</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </navigator>
      <navigator url="/pages/customer-detail/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">李杰&#12288;<span style="color: #ccc;">181****3212</span></div>
        <div class="weui-cell__ft">2019-10-16</div>
      </navigator>
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
import { get, post } from "../../utils";

import * as echarts from 'echarts/dist/echarts.simple.min'
import mpvueEcharts from 'mpvue-echarts'




export default {
  onShow() {
    this.getDetail()
    this.getEchartData()
  },
  computed: {

  },
  components: {
    mpvueEcharts
  },
  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role)
    // this.getData();

  },
  data() {
    return {
      info: null,
      echartData: null,
      // role: ''
      echarts,
      onInit: null,
      inputShowed: false,
      inputVal: ''
    };
  },
  methods: {
    initChart (canvas, width, height) {

      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(chart)

      let xData = this.echartData.map(item => {
        return item.yearMonth.split('-')[1]+'月'
      })
      let yData = this.echartData.map(item => {
        return item.count
      })

      console.info(xData,yData)
      var option = {
        backgroundColor: '#fff',
        color: ['#37A2DA'],

        // legend: {
          // data: ['A', 'B']
        // },
        // grid: {
        //   containLabel: true
        // },
        xAxis: {
          type: 'category',
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: xData
        },
        yAxis: {
          // x: 'center',
          type: 'value',
          // splitLine: {
          //   lineStyle: {
          //     type: 'dashed'
          //   }
          // }
        },
        series: [{
          data: yData,
          type: 'line'
        }]

      }
      chart.setOption(option)
      return chart
    },
    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = '';
      this.inputShowed = false;
    },
    clearInput() {
      this.inputVal = '';
    },
    inputTyping(e) {
      console.log(e);
      this.inputVal = e.mp.detail.value;
      console.log('输入信息为：'+e.mp.detail.value);
    },
    async getDetail() {
      const data = await post("/myCustomer/getGrowthStatistics?empNo="+this.$store.state.userInfo.shopEmployee.id);
      if(data.success){
        this.info = data.result
      }
    },
    async getEchartData(){
      const data = await post("/myCustomer/activeCustomerStatistics?empNo="+this.$store.state.userInfo.shopEmployee.id);
      if(data.success){
        this.echartData = data.result
        this.onInit = this.initChart
      }

    }
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

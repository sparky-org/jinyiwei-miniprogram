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
      <!-- <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div> -->
      </div>
      <!-- <div class="weui-cells searchbar-result" v-if="inputVal.length > 0">
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
      </div> -->
    </div>


    <div class="weui-cells weui-cells_after-title no-t">

      <template v-if="list.length">
        <navigator v-for="(item, index) in list" :key="index" :url="'/pages/customer-detail/main?customerNo='+item.customerNo" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
          <!-- <div class="weui-cell__hd">
            <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
          </div> -->
          <div class="weui-cell__bd">{{item.name}}&#12288;<span style="color: #ccc;">{{item.phone}}</span></div>
          <div class="weui-cell__ft">{{item.addDate}}</div>
        </navigator>
        <div style="padding: 30rpx 0; margin-top:-20rpx;" class="no-more" v-if="list.length >= totalCount">没有更多了</div>
      </template>
      <no-data v-else></no-data>
      <div v-if="inputVal && list.length==0" style="color: #ccc; padding: 20rpx 0; text-align: center;">搜索不到此顾客</div>

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
import { get, post, queryParams } from "../../utils";
import noData from '@/components/no-data'
import * as echarts from 'echarts/dist/echarts.simple.min'
import mpvueEcharts from 'mpvue-echarts'

  let chart = null;
  let timer = null;
  let monthArr = [1,2,3,4,5,6,7,8,9,10,11,12];
  let _year = new Date().getFullYear();

  // 初始化数据
  let echartData = monthArr.map(item => {
    return {
     yearMonth: _year+ '-' + item,
     count: 0
    }
  });

  console.info('echartData--------',echartData)

  let xData = echartData.map(item => {
    return item.yearMonth.split('-')[1]+'月'
  })
  let yData = echartData.map(item => {
    return item.count
  })

  function initChart (canvas, width, height) {

    chart = echarts.init(canvas, null, {
      width: width,
      height: height
    })
    canvas.setChart(chart)

    chart.showLoading(); // 首次显示加载动画

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
      grid: {
        left: '5%',
        top: '10%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
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
    chart.hideLoading(); // 隐藏加载动画
    return chart
  }


export default {
  onShow() {
    this.getDetail()
    this.getMyCustomer()

    timer = setInterval(() => {
      if(chart){
        this.getEchartData()
      }
    },10000)
  },
  computed: {

  },
  components: {
    mpvueEcharts
  },
  onReady(){

  },
  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role)
    // this.getData();
    let mountedTimer = null
    mountedTimer = setInterval(() => {
      console.info('chart--mounted',chart)
      if(chart){
        this.getEchartData()
        clearInterval(mountedTimer)
      }
    }, 200)



  },
  onHide(){
    clearInterval(timer)
  },
  data() {
    return {
      info: null,
      echartData: null,
      // role: ''
      echarts,
      onInit: initChart,
      inputShowed: false,
      inputVal: '',

      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      list: [],
      copyList: []
    };
  },

  //上拉加载
  onReachBottom() {
    if(this.copyList.length < this.totalCount) {
      this.getMyCustomer(true)
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.getDetail()
    this.getEchartData()
    this.getMyCustomer()
  },

  watch: {
    inputVal(val){
      if(val){
        this.list = this.copyList.filter(item => {
          return item.name.indexOf(val) > -1
        })
      }else{
        this.list = this.copyList
      }
    }
  },

  methods: {

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
        // this.onInit = this.initChart
        console.info('echart',chart)
        data.result.reverse()
        console.info('data.result',data.result)
        let xData = data.result.map(item => {
          return item.yearMonth.split('-')[1]+'月'
        })
        let yData = data.result.map(item => {
          return item.count
        })

        chart.setOption({
          xAxis: {
            data: xData
          },
          series: [{
            data: yData
          }]
        });

      }
    },
    async getMyCustomer(append){
      if(append){
        this.currentPage++
      }else{
        this.currentPage = 1
      }
      let params = {
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "empNo": this.$store.state.userInfo.shopEmployee.id
      }
      console.info('queryParams(params)',queryParams(params))
      const data = await post(`/myCustomer/myCustomers?${queryParams(params)}`);
      if(data.success){
        this.totalCount = data.total
        this.list = append ? this.list.concat((data.result) || []) : (data.result || [])
        this.copyList = JSON.parse(JSON.stringify(this.list))
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

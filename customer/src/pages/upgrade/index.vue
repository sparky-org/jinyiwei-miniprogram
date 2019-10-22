<template>
  <div class="upgrade-container">
    <div class="degree">
      <h3>您的当前等级</h3>
      <p class="level">{{vipLevel}}</p>
      <p v-if="levelDiff.pointBalance">距离{{levelDiff.name}}还差{{levelDiff.pointBalance}}积分</p>
    </div>
    <div class="tip">
      升级助手
      <i class="iconfont icon-ques" @click="showHelp"></i>
    </div>
    <div class="wrap">
      <mpvue-echarts :echarts="echarts" :onInit="onInit" />
    </div>

    <div class="weui-dialog" v-if="showDialog">
      <div class="weui-mask" @click="closeDialog"></div>
      <div class="weui-dialog__wrp" @click="closeDialog">
        <div class="box">
          <h3>帮助</h3>
          <ul>
            <li>
              <h3>什么是合伙人？</h3>
              <div class="content">合伙人享有分红的权利</div>
            </li>
            <li>
              <h3>积分怎么获得？</h3>
              <div class="content">普通消费1元兑换1积分</div>
            </li>
            <li>
              <h3>积分的用途？</h3>
              <div class="content">下单的时候可以使用积分付款</div>
            </li>
            <li>
              <h3>如果遇到积分问题怎么办？</h3>
              <div class="content">联系客服</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/dist/echarts.simple.min'
import mpvueEcharts from 'mpvue-echarts'
let chart = null
function initChart (canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)
  var option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['铜牌', '铁牌', '金牌', '钻石', '合伙人'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'等级',
            type:'bar',
            barWidth: '60%',
            data:[100, 10000, 40000, 60000, 100000]
        }
    ]
  }
  chart.setOption(option)
  return chart
}
export default {
  data () {
    return {
      echarts,
      onInit: initChart,
      vipLevel: '铜牌会员',
      showDialog: false,
      pointBalance: 0,
      levelList: [{
        text: '铜牌会员',
        value: 100
      },{
        text: '铁牌会员',
        value: 10000
      },{
        text: '金牌会员',
        value: 40000
      },{
        text: '钻石会员',
        value: 60000
      },{
        text: '合伙人',
        value: 100000
      }],
      levelDiff: {
        pointBalance: 0
      }
    }
  },
  onShow() {
    let {vipLevel, pointBalance} = this.$root.$mp.query
    this.vipLevel = vipLevel || this.vipLevel
    this.pointBalance = pointBalance || this.pointBalance
    let findIndex = this.levelList.findIndex(level => level.text == this.vipLevel)
    if (findIndex !== -1 && findIndex !== this.levelList.length -1) {
      this.levelDiff = {
        name: this.levelList[findIndex+1].text,
        pointBalance: this.levelList[findIndex+1].value - this.pointBalance
      }
    }
  },
  components: {
    mpvueEcharts
  },
  methods: {
    showHelp() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    }
  },
  onShareAppMessage () {}
}
</script>

<style scoped lang="scss">
@import "./style";
</style>
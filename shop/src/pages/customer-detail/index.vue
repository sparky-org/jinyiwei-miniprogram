<template>
<div class="customer-detail">
    <!-- <i class="iconfont iconai-user"></i> -->
    <!-- <i class="iconfont iconbodadianhua"></i> -->
  <template v-if="customerData">
    <div class="weui-panel__bd">
      <div class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="padding: 20rpx 0;">
        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg" style="width: 80rpx; margin-right: 20rpx; text-align: right;">
          <!-- <image class="weui-media-box__thumb" :src="icon60" /> -->
          <i class="iconfont iconai-user weui-media-box__thumb" style="color: #999; font-size: 50rpx;"></i>
        </div>
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg" style="position: relative;" @click="handleCall(customerData.phone)">
          <div class="weui-media-box__title">{{customerData.name?customerData.name:''}}</div>
          <div class="weui-media-box__desc">{{customerData.phone?customerData.phone:''}}</div>
          <i class="iconfont iconbodadianhua" style="position: absolute; right: 50rpx; top: 50%; margin-top: -56rpx; font-size: 70rpx; color: #0BB20C;"></i>
        </div>
      </div>
    </div>

    <div style="padding: 0 20rpx; background-color: #fff; box-sizing: border-box;">
      <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
        </div>
        <div class="weui-tab__panel">
          <div class="weui-tab__content" v-if="activeIndex == 0">
            <!-- 选项一的内容 -->
            <div class="weui-form-preview">
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">客户性别</div>
                  <div class="weui-form-preview__value tl">{{customerData.sex=='FEMALE'?'女':'男'}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">客户生日</div>
                  <div class="weui-form-preview__value tl">{{customerData.baseInfo.birthDay?customerData.baseInfo.birthDay:''}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">客户爱好</div>
                  <div class="weui-form-preview__value tl">{{customerData.baseInfo.favor?customerData.baseInfo.favor:''}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">备注</div>
                  <div class="weui-form-preview__value tl">{{customerData.baseInfo.remark?customerData.baseInfo.remark:''}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">年度规划</div>
                  <div class="weui-form-preview__value tl">{{customerData.baseInfo.yearPlan?customerData.baseInfo.yearPlan:''}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">关联员工</div>
                  <div class="weui-form-preview__value tl">{{customerData.baseInfo.relatedEmp?customerData.baseInfo.relatedEmp:''}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">添加日期</div>
                  <div class="weui-form-preview__value tl">{{customerData.baseInfo.addDate?customerData.baseInfo.addDate:''}}</div>
                </div>
              </div>
            </div>

          </div>
          <div class="weui-tab__content" v-if="activeIndex == 1">
            <!-- 选项二的内容 -->
            <div class="weui-form-preview">
              <div class="weui-form-preview__bd">
                <template v-if="list.length">
                  <div class="weui-form-preview__item" v-for="(item, index) in list" :key="index">
                    <div class="weui-form-preview__label">{{enumStateObj[item.content]}}</div>
                    <div class="weui-form-preview__value">{{item.date}}</div>
                  </div>
                  <div style="padding:30rpx 0 0 0;" class="no-more" v-if="list.length >= totalCount">没有更多了</div>
                </template>
                <no-data v-else></no-data>
                <!-- <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">颈部护理项目</div>
                  <div class="weui-form-preview__value">2019-11-04</div>
                </div>

                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">背部按摩护理项目</div>
                  <div class="weui-form-preview__value">2019-11-07</div>
                </div> -->
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>






    <div class="add-customer">
      <button class="weui-btn" type="primary">预约</button>
      <button class="weui-btn modify" type="default" style="margin-top: 20rpx;" @click="handleToOperate">修改</button>
    </div>
  </template>
</div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, queryParams } from "../../utils";
import noData from '@/components/no-data'
export default {
  onload(options){
    // console.log("options is :", options)
    // this.customerId = options.customerId
    // if (this.customerId == 1){
    //   this.user = this.chenju
    // }
    // if (this.data.customerId == 2){
    //   this.user = this.yanghua
    // }
  },
  onShow() {
    this.id = this.$root.$mp.query.customerNo;
    console.info('customerNo', this.id)
    this.getData()
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex === 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex === 1) {
        return 'weui-navbar__slider_1'
      }
    }
  },
  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role)
    // this.getData();
  },
  data() {
    return {
      id: -1,
      // role: ''
      tabs: ['客户信息', '跟踪信息'],
      activeIndex: 0,
      // customerNo: -1,
      customerData: null,


      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      list: [],

      enumStateObj:{
        "TASK_RECORD": "任务奖励",
        "SAL_PERF": "业绩奖励",
        "SERVICE_ITEM": "项目完成奖励",
        "DAILY_RECORD": "日记奖励",
        "APPOINTMENT": "预约客户奖励",
        "ATTENDANCE": "按时打卡奖励",
        "REWARD_PUNISH": "员工奖罚"
      },

      // enumStateObj:{
      //   'NEW': '待审批',
      //   'REVERTED': '已撤回',
      //   'PASSED': '审批通过',
      //   'REFUSED': '审批拒绝'
      // },

      // chenju:{
      //   name:'陈菊',
      //   phone:'182****8238',
      //   birthday:':1975-9-1',
      //   favor:'旅游，游泳，书法，看书（爱看张爱玲的书',
      //   remark:'1.年龄45岁，有一个儿子18岁正在读大一。老公是公司总经理，年薪50万左右。自己开服装店，有两个员工，月入2万以上不等' +
      //     '2.性格开朗，喜欢聊孩子，没什么禁忌。但很注重细节。\r\n' +
      //     '3.消费习惯:没有主见，需要替她做决定，要多肯定效果。偶尔喜欢赊账。\n',
      //   yearPlan:'年消费10万\n' +
      //     '面部年消费5万，延生肽原液面膜各3套共2万元，因肤定制年卡3万。\n' +
      //     '身体年消费5万，肩颈，胸部，淋巴，瑶浴。',
      //   related:'刘小红',
      //   addDate:'2018-11-18'
      // },
      // yanghua:{
      //   name:'杨华',
      //   phone:'171****0217',
      //   birthday:':1976-12-1',
      //   favor:'户外，潜水，读书',
      //   remark:'1.年龄43岁，是公司高管，年收入500万左右。2015年跟老公离婚了，独自抚养女儿。女儿现在美国读高中' +
      //     '2.性格沉稳，基本不怎么说话，注重细节。\r\n' +
      //     '3.消费习惯: 吃穿用度都比较讲究，是个不关心价格只关心品质的人，比较害怕衰老。\n',
      //   yearPlan:'年消费20万\n' +
      //     '面部年消费10万，延生肽原液面膜各3套共2万元，因肤定制年卡3万。\n' +
      //     '身体年消费10万，肩颈，胸部，淋巴，瑶浴。',
      //   related:'曹丹',
      //   addDate:'2019-01-16'
      // },
      // user:this.chenju
    };
  },
  components: {
    noData
  },

  //上拉加载
  onReachBottom() {
    if(this.list.length < this.totalCount) {
      this.getData(true)
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.getData()
  },

  methods: {

    handleCall(phone){
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },

    tabClick(e) {
      console.log(e);
      this.activeIndex = Number(e.currentTarget.id);
    },

    handleToOperate(){
      wx.setStorageSync('customer-detail-data', this.customerData)
      wx.navigateTo({
        url: "/pages/customer-operate/main?id=" + this.id
      });
    },

    async getData(append) {
      if(append){
        this.currentPage++
      }else{
        this.currentPage = 1
      }
      let params = {
        "start": this.currentPage,
        "pageSize": this.pageSize,
        "customerNo": this.id
      }
      console.info('queryParams(params)',queryParams(params))
      const data = await post(`/myCustomer/getCustomerDetail?${queryParams(params)}`);
      if(data.success){
        console.info('8218221',data.result)
        this.totalCount = data.result.total
        this.customerData = data.result
        this.list = append ? this.list.concat((data.result.traceInfoList) || []) : (data.result.traceInfoList || [])
      }
    }
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  .weui-navbar__slider_0{
    left: 0!important;
    width: 50%!important;
    transition: transform 0.3s!important;
    transform: translateX(0)!important;
  }
  .weui-navbar__slider_1{
    left: 50%!important;
    right: 0 !important;
    width: 50% !important;
    transition: transform 0.3s !important;
    transform: translateX(0) !important;
  }
  .weui-navbar__item.weui-bar__item_on .weui-navbar__title{
    color: #1aad19!important;
  }
  @import "./style.scss";
</style>

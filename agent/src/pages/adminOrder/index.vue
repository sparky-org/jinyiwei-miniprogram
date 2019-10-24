<template>
  <div class="order_manage">
    <div class="weui-tab" v-show="!selectStaffVisible">
      <div class="weui-navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
            <div class="weui-navbar__title">{{item}}</div>
          </div>
        </block>
        <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
      </div>
      <div class="weui-tab__panel">
        <!-- <div class="weui-tab__content" :hidden="activeIndex != 0"> -->
        <div class="weui-tab__content">

          <div class="weui-form-preview" v-if="list.length > 0" v-for="(item, index) in list" :key="index">
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">订单时间</div>
              <div class="weui-form-preview__value_in-hd">{{item.dateStr}}</div>
            </div>
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">商户</div>
              <div class="weui-form-preview__value_in-hd">{{item.shopName}}({{item.shopContractName}}:{{item.shopContractPhone}})</div>
            </div>
            <div class="weui-form-preview__bd" style="padding-top: 0; padding-bottom: 0; padding-right: 20rpx;">
              <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">&#12288;</div>
                <div class="weui-form-preview__value order_send_list">
                  <div v-for="(it, idx) in item.goodsDtls" :key="idx">{{it.name}}<span>{{it.count}}瓶</span></div>
                  <!-- <div>abc护理液<span>6瓶</span></div>
                  <div>abc护理液<span>6瓶</span></div>
                  <div>abc护理液<span>6瓶</span></div> -->
                </div>
              </div>
            </div>
            <div class="weui-form-preview__ft">
              <div v-if="item.dispatchStatus=='DISPATCHED'" class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">{{item.dispatchSellerName}}</div>
              <div v-if="item.dispatchStatus=='UNDISPATCHED'" class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active" @click="handleSelect(item)">指派销售</div>
              <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active" @click="handleCall(item)">联系客服</div>
            </div>
          </div>

          <div v-if="list.length == 0">
            <div class="page__bd" style="padding-top: 150rpx;">
              <div class="icon-box">
                <icon type="info" size="93"></icon>
                <div class="icon-box__ctn">
                  <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">暂无数据</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- <div class="weui-tab__content" :hidden="activeIndex != 1">选项二的内容</div>
        <div class="weui-tab__content" :hidden="activeIndex != 2">选项三的内容</div> -->
      </div>
    </div>
    <div v-show="selectStaffVisible">
      <div class="weui-cells weui-cells_after-title">
        <radio-group @change="radioChange">
          <label class="weui-cell weui-check__label" v-for="(item,index) in radioItems" :key="index">
            <radio class="weui-check" :value="item.value" :checked="item.checked" />
            <div class="weui-cell__bd">{{item.name}}</div>
            <div class="weui-cell__ft weui-cell__ft_in-radio" v-if="item.checked">
              <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
            </div>
          </label>
        </radio-group>
      </div>
      <div class="weui-cells__title">奖励积分</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" v-model="point" placeholder="请输入奖励积分" />
          </div>
        </div>
      </div>
      <div class="sureBth">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="placeholder button-sp-area">
              <button class="weui-btn" type="default" @click="handleCancle" style="margin-right: 10rpx;">取消</button>
            </div>
          </div>
          <div class="weui-flex__item">
            <div class="placeholder button-sp-area">
              <button class="weui-btn" type="primary" @click="handleSure" style="margin-left: 10rpx;">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, msToDate } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex === 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex === 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex === 2) {
        return 'weui-navbar__slider_2'
      }
    },
    // ...mapState(["cityName"])
  },
  mounted() {
    this.getData(this.status[0]);
  },
  data() {
    return {
      // banner: [],
      point: '',
      list: [],
      tabs: ['全部', '已分配', '未分配'],
      status: ['','DISPATCHED','UNDISPATCHED'],
      activeIndex: 0,
      // data: null
      selectStaffVisible: false,
      radioItems: [
        // { name: 'cell standard', value: '0' },
        // { name: 'cell standard', value: '1', checked: true }
      ],
      item: null
    };
  },
  watch: {
    selectStaffVisible(){
      this.getStaff()
    }
  },
  components: {},
  methods: {
    handleCancle(){
      this.selectStaffVisible = false
      this.radioItems = []
      this.item = null
      this.point = ''
    },
    async handleSure(){

      let checkList = this.radioItems.filter(item => {
        return item.checked
      })
      if(checkList.length == 0){
        wx.showModal({
          content: '请选择指派的人',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            }
          }
        });
        return
      }
      if(!this.point){
        wx.showModal({
          content: '请输入奖励积分',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            }
          }
        });
        return
      }
      let id = checkList.map(item => {
        return item.value
      })
      console.info(id)
      const data = await post(`/agency/order/specifySalesman?orderId=${this.item.orderId}&empId=${id[0]}&point=10`);
      if(data.success){
        wx.showToast({
          title: '指派任务成功',
          icon: 'success',
          duration: 2000,
          success(){

          }
        })
        this.selectStaffVisible = false
        this.radioItems = []
        this.item = null
        this.point = ''
        this.getData(this.status[this.activeIndex])
      }
    },
    radioChange(e) {
      console.log('radio发生change事件，携带value值为：' + e.mp.detail.value);
      let radioItems = this.radioItems;
      for (let i = 0; i < radioItems.length; ++i) {
        radioItems[i].checked = radioItems[i].value === e.mp.detail.value;
      }
      this.radioItems = radioItems;
    },
    handleSelect(item){
      this.selectStaffVisible = true
      this.item = item
    },
    handleCall(item){
      wx.makePhoneCall({
        phoneNumber: item.shopContractPhone
      })
    },
    tabClick(e) {
      console.log(e);
      this.activeIndex = Number(e.currentTarget.id);
      this.getData(this.status[this.activeIndex])
    },
    // ...mapMutations(["update"]),
    async getStaff(){
      const data = await post(`/agency/employ/queryEmploys?agencyId=${this.$store.state.userInfo.agencyId}`);
      console.info('员工列表',data)
      if(data.success){
        if(data.result){
          data.result.forEach(item => {
            item.checked = false
            item.value = String(item.id)
          })
          this.radioItems = data.result
        }else{
          this.radioItems = []
        }
      }
    },
    async getData(type) {
      const data = await post(`/agency/order/queryOrderList?agencyId=${this.$store.state.userInfo.agencyId}&status=${type}`);
      console.info('data',data)
      if(data.success){
        if(data.result){
          data.result.forEach(item => {
            item.dateStr = msToDate(item.orderTime)
          })
          this.list = data.result
        }else{
          this.list = []
        }
      }

      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
    },
    // goodsDetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/goods/main?id=" + id
    //   });
    // },
    // categoryList(id) {
    //   wx.navigateTo({
    //     url: "/pages/categorylist/main?id=" + id
    //   });
    // },
    // goodsList(info) {
    //   if (info == "hot") {
    //     wx.navigateTo({
    //       url: "/pages/newgoods/main?isHot=" + 1
    //     });
    //   } else {
    //     wx.navigateTo({
    //       url: "/pages/newgoods/main?isNew=" + 1
    //     });
    //   }
    // },
    // topicdetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/topicdetail/main?id=" + id
    //   });
    // },
    // totopic() {
    //   wx.navigateTo({
    //     url: "/pages/topic/main"
    //   });
    // },
    // tobrandList() {
    //   wx.navigateTo({
    //     url: "/pages/brandlist/main"
    //   });
    // },
    // branddetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/branddetail/main?id=" + id
    //   });
    // }
  },
  created() {
    // console.log(89128921982189)
  }
};
</script>

<style lang='scss' scoped>
  .weui-navbar__slider_0{
    left: 0!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
  .weui-navbar__slider_1{
    left: 0!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
  .weui-navbar__slider_2{
    left: 0!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
@import "./style.scss";
</style>

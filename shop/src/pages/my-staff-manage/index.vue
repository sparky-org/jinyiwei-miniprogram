<template>
  <div class="page">
    <div class="weui-tab">
      <div class="weui-navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
            <div class="weui-navbar__title">{{item}}</div>
          </div>
        </block>
        <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
      </div>
      <div class="weui-tab__panel" style="padding-bottom: 120rpx;">
        <div class="weui-tab__content">
          <!-- 选项一的内容 -->
          <view
            class="touch-item"
            :class="{'touch-move-active': item.isTouchMove}"
            @touchstart="touchstart"
            @touchmove="touchmove"
            v-for="(item, index) in items"
            :data-index="index"
            :key="item.id">
              <view class='content' @click='handleOperate(3)' :data-index="index">
                <view class='column'>
                  <!-- <view class='row full_width'>
                    <text style='font-weight: bold;line-height:60rpx;'>{{item.name}}</text>
                    <text style='margin-left:30rpx;color:gray;line-height:60rpx;'>{{item.unit}}</text>
                    <text style='margin-left:20rpx;color:gray;line-height:60rpx;'>{{item.job}}</text>
                  </view>
                  <text style='margin-top:10rpx;color:gray;'>{{item.phone}}</text> -->
                  <!-- <image :src="item.pictureUrl" class='item-image' /> -->
                  <view class='item-text' style="width:100%;">
                    <view>{{item.name}}<span style="float: right; display: inline-block; height:100%; margin-right: 30rpx;" @click.stop="handleCall(item.phone)">{{item.phone}}</span></view>
                    <!-- <view></view> -->
                  </view>

                </view>
              </view>
              <view class="del" @click="del" :data-id="item.id">删除</view>
          </view>
        </div>
        <!-- <div class="weui-tab__content" :hidden="activeIndex != 1"> -->
          <!-- 选项二的内容 -->
          <!-- <view
            class="touch-item"
            :class="{'touch-move-active': item.isTouchMove}"
            @touchstart="touchstart"
            @touchmove="touchmove"
            v-for="(item, index) in items"
            :data-index="index"
            :key="item.id">
              <view class='content' @click='handleOperate(1)' :data-index="index">
                <view class='column'>
                  <image :src="item.pictureUrl" class='item-image' />
                  <view class='item-text'>
                    <view>美容顾问:{{item.name}}</view>
                    <view>{{item.createDate}}</view>
                  </view>

                </view>
              </view>
              <view class="del" @click="del" :data-id="item.id">删除</view>
          </view> -->
        <!-- </div> -->
        <!-- <div class="weui-tab__content" :hidden="activeIndex != 2"> -->
          <!-- 选项三的内容 -->
          <!-- <view
            class="touch-item"
            :class="{'touch-move-active': item.isTouchMove}"
            @touchstart="touchstart"
            @touchmove="touchmove"
            v-for="(item, index) in items"
            :data-index="index"
            :key="item.id">
              <view class='content' @click='handleOperate(5)' :data-index="index">
                <view class='column'>
                  <image :src="item.pictureUrl" class='item-image' />
                  <view class='item-text'>
                    <view>员工:{{item.name}}</view>
                    <view>{{item.createDate}}</view>
                  </view>

                </view>
              </view>
              <view class="del" @click="del" :data-id="item.id">删除</view>
          </view> -->
        <!-- </div> -->
      </div>
    </div>

    <div class="operate-btn">
      <div class="weui-flex">
        <div class="weui-flex__item" style="padding-right: 10rpx;">
          <button class="weui-btn gw-manage" type="default" @click="handlePosition">岗位管理</button>
        </div>
        <div class="weui-flex__item" style="padding-left: 10rpx;">
          <button class="weui-btn" type="primary" @click="handleOperate(-1)">添加员工</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
import Touch from '../../utils/touch.js'
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {
    console.info('getdata')
    this.getData()
  },
  components: {

  },
  data() {
    return {
      // role: '',
      // index: 1,
      // enumArea,
      // enumScore,
      // area: enumArea[0],
      // score: enumScore[0],
      // startDate: '',
      // endDate: ''

      tabs: ['店长', '美容顾问', '美容师'],
      dz:null,
      gw:null,
      mrs:null,
      activeIndex: 0,
      touch: null,
      items: [{
        pictureUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
        id: 1,
        name: '方竹兵12三世2--zzh',
        createDate: 1550648810989,
        isTouchMove: false
      }]
    };
  },

  mounted() {
    this.touch = new Touch()
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
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
    }
  },
  methods: {

    // handleEditTask(){
    //   wx.navigateTo({
    //     url: "/pages/my-task-operate/main?id=2&type=edit"
    //   });
    // },

    tabClick(e) {
      console.log(e);
      this.activeIndex = Number(e.currentTarget.id);
      this.dz.empInfos.forEach(item => {
        item.isTouchMove = false
      })
      this.gw.empInfos.forEach(item => {
        item.isTouchMove = false
      })
      this.mrs.empInfos.forEach(item => {
        item.isTouchMove = false
      })
      if(this.activeIndex == 0){
        this.items = this.dz.empInfos
      }
      if(this.activeIndex == 1){
        this.items = this.gw.empInfos
      }
      if(this.activeIndex == 2){
        this.items = this.mrs.empInfos
      }
    },
    handleOperate(id){
      if(id != -1){
        wx.navigateTo({
          url: "/pages/my-staff-operate/main?id="+id
        });
      }else{
        wx.navigateTo({
          url: "/pages/my-staff-operate/main"
        });
      }
    },
    handlePosition(){
      wx.navigateTo({
        url: "/pages/my-staff-position/main"
      });
    },
    handleCall(phone){
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },

    // 手指触摸动作开始 记录起点X坐标
    touchstart: function (e) {
      console.info(e)
      let params = e.mp
      // 开始触摸时 重置所有删除
      let data = this.touch._touchstart(params, this.items)
      console.info('data', data)
      this.items = data
    },

    // 滑动事件处理
    touchmove: function (e) {
      console.log(2)
      let params = e.mp
      let data = this.touch._touchmove(params, this.items)
      console.info('data', data)
      this.items = data
    },

    // 删除事件
    del: function (e) {
      var that = this
      wx.showModal({
        title: '提示',
        content: '确认要删除此员工吗？',
        success:  async (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            // that.data.items.splice(e.currentTarget.dataset.id, 1)
            // that.setData({
            //   items: that.data.items
            // })
            console.info(e.currentTarget.dataset.id)
            const data = await post("/employee/deleteEmployee?empNo="+e.currentTarget.dataset.id+"&operator="+this.$store.state.userInfo.shopEmployee.id);
            if(data.success){
              console.info(data)
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000,
                success(){

                }
              })
              this.getData``
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },



    // handleAreaSelect(){
    //   wx.showActionSheet({
    //     itemList: enumArea,
    //     success: (res) => {
    //       console.log(res.tapIndex)
    //       this.area = enumArea[res.tapIndex]
    //     }
    //   });
    // },
    // handleScorSelect(){
    //   wx.showActionSheet({
    //     itemList: scoreArea,
    //     success: (res) => {
    //       console.log(res.tapIndex)
    //       this.score = scoreArea[res.tapIndex]
    //     }
    //   });
    // }

    async getData() {
      const data = await post("/employee/queryEmpGroupByJob?shopNo="+this.$store.state.userInfo.shopEmployee.shopNo);
      if(data.success){
        console.info(data)
        if(data.result.length){
          data.result.forEach(item => {
            // item.isTouchMove = false
            if(item.jobName == '店长'){
              if(item.empInfos){
                item.empInfos.forEach(i => {
                  i.isTouchMove = false
                  i.id = i.empNo
                  i.name = i.empName
                })
                this.dz = item
              }
            }
            if(item.jobName == '顾问'){
              if(item.empInfos){
                item.empInfos.forEach(i => {
                  i.isTouchMove = false
                  i.id = i.empNo
                  i.name = i.empName
                })
                this.gw = item
              }
            }
            if(item.jobName == '美容师'){
              if(item.empInfos){
                item.empInfos.forEach(i => {
                  i.isTouchMove = false
                  i.id = i.empNo
                  i.name = i.empName
                })
                this.mrs = item
              }
            }
          })

          if(this.activeIndex == 0){
            this.items = this.dz.empInfos
          }
          if(this.activeIndex == 1){
            this.items = this.gw.empInfos
          }
          if(this.activeIndex == 2){
            this.items = this.mrs.empInfos
          }
        }
      };
    },
    // goodsDetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/goods/main?id=" + id
    //   });
    // }
  },
  created() {

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
    left: 33.33333333%!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
  .weui-navbar__slider_2{
    left: 66.666666666666%!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
  @import "./style.scss";
</style>

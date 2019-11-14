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
      <div class="weui-tab__panel">
        <div class="weui-tab__content" :hidden="activeIndex != 0">
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
                  <image :src="item.pictureUrl" class='item-image' />
                  <view class='item-text'>
                    <view>店长:{{item.name}}</view>
                    <view>{{item.createDate}}</view>
                  </view>

                </view>
              </view>
              <view class="del" @click="del" :data-id="item.id">删除</view>
          </view>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 1">
          <!-- 选项二的内容 -->
          <view
            class="touch-item"
            :class="{'touch-move-active': item.isTouchMove}"
            @touchstart="touchstart"
            @touchmove="touchmove"
            v-for="(item, index) in items"
            :data-index="index"
            :key="item.id">
              <view class='content' @click='handleOperate(1)' :data-index="index">
                <view class='column'>
                  <!-- <view class='row full_width'>
                    <text style='font-weight: bold;line-height:60rpx;'>{{item.name}}</text>
                    <text style='margin-left:30rpx;color:gray;line-height:60rpx;'>{{item.unit}}</text>
                    <text style='margin-left:20rpx;color:gray;line-height:60rpx;'>{{item.job}}</text>
                  </view>
                  <text style='margin-top:10rpx;color:gray;'>{{item.phone}}</text> -->
                  <image :src="item.pictureUrl" class='item-image' />
                  <view class='item-text'>
                    <view>美容顾问:{{item.name}}</view>
                    <view>{{item.createDate}}</view>
                  </view>

                </view>
              </view>
              <view class="del" @click="del" :data-id="item.id">删除</view>
          </view>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 2">
          <!-- 选项三的内容 -->
          <view
            class="touch-item"
            :class="{'touch-move-active': item.isTouchMove}"
            @touchstart="touchstart"
            @touchmove="touchmove"
            v-for="(item, index) in items"
            :data-index="index"
            :key="item.id">
              <view class='content' @click='handleOperate(5)' :data-index="index">
                <view class='column'>
                  <!-- <view class='row full_width'>
                    <text style='font-weight: bold;line-height:60rpx;'>{{item.name}}</text>
                    <text style='margin-left:30rpx;color:gray;line-height:60rpx;'>{{item.unit}}</text>
                    <text style='margin-left:20rpx;color:gray;line-height:60rpx;'>{{item.job}}</text>
                  </view>
                  <text style='margin-top:10rpx;color:gray;'>{{item.phone}}</text> -->
                  <image :src="item.pictureUrl" class='item-image' />
                  <view class='item-text'>
                    <view>员工:{{item.name}}</view>
                    <view>{{item.createDate}}</view>
                  </view>

                </view>
              </view>
              <view class="del" @click="del" :data-id="item.id">删除</view>
          </view>
        </div>
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
import { get } from "../../utils";
import Touch from '../../utils/touch.js'
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {

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

      tabs: ['店长', '美容顾问', '员工'],
      activeIndex: 0,
      touch: null,
      items: [{
        pictureUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
        id: 1,
        name: '李本山',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        id: 2,
        name: '袁凯',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
        id: 1,
        name: '李本山',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        id: 2,
        name: '袁凯',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3590935495,3256795874&fm=26&gp=0.jpg',
        id: 3,
        name: '李本山',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        id: 4,
        name: '李富城',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3590935495,3256795874&fm=26&gp=0.jpg',
        id: 5,
        name: '李明',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3590935495,3256795874&fm=26&gp=0.jpg',
        id: 3,
        name: '李本山',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        id: 4,
        name: '李富城',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3590935495,3256795874&fm=26&gp=0.jpg',
        id: 5,
        name: '李明',
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
        content: '确认要删除此人吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // that.data.items.splice(e.currentTarget.dataset.id, 1)
            // that.setData({
            //   items: that.data.items
            // })
            console.info(e.currentTarget.dataset.id)
            http({
              url: 'bookmark/' + e.currentTarget.dataset.id,
              method: 'DELETE'
            }, (data) => {
              if (data.success) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 3000
                })
                that.getList()
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }



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

    // async getData() {
    //   const data = await get("/index/index");
    //   this.banner = data.banner;
    //   this.channel = data.channel;
    //   this.brandList = data.brandList;
    //   this.newGoods = data.newGoods;
    //   this.hotGoods = data.hotGoods;
    //   this.topicList = data.topicList;
    //   this.newCategoryList = data.newCategoryList;
    // },
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

<template>
  <div class="page">
    <div v-if="add">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">岗位名称</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入要创建的岗位" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <view
        class="touch-item"
        :class="{'touch-move-active': item.isTouchMove}"
        @touchstart="touchstart"
        @touchmove="touchmove"
        v-for="(item, index) in items"
        :data-index="index"
        :key="item.id">
          <view class='content' @click='showDetail' :data-index="index">
            <view class='column'>
              <!-- <view class='row full_width'>
                <text style='font-weight: bold;line-height:60rpx;'>{{item.name}}</text>
                <text style='margin-left:30rpx;color:gray;line-height:60rpx;'>{{item.unit}}</text>
                <text style='margin-left:20rpx;color:gray;line-height:60rpx;'>{{item.job}}</text>
              </view>
              <text style='margin-top:10rpx;color:gray;'>{{item.phone}}</text> -->
              <!-- <image :src="item.pictureUrl" class='item-image' /> -->
              <view class='item-text'>
                <view>店长:{{item.name}}</view>
                <view>{{item.createDate}}</view>
              </view>

            </view>
          </view>
          <view class="del" @click="del" :data-id="item.id">删除</view>
      </view>
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleAdd" v-if="!add">添加岗位</button>
      <button class="weui-btn" type="primary" @click="handleAdd" v-if="add">创建岗位</button>
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
  watch: {
    add(val){
       if(val){
         wx.setNavigationBarTitle({
           title: '创建职位'
         })
       }else{
         wx.setNavigationBarTitle({
           title: '职位管理'
         })
       }
    }
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
      add: false,
      touch: null,
      items: [{
        pictureUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
        id: 1,
        name: '店长：岗位编号1001',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        id: 2,
        name: '美容顾问：岗位编号1003',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        id: 3,
        name: '员工：岗位编号1005',
        createDate: 1550648810989,
        isTouchMove: false
      },
      {
        pictureUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
        id: 1,
        name: '店长：岗位编号1001',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        id: 2,
        name: '美容顾问：岗位编号1003',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        id: 3,
        name: '员工：岗位编号1005',
        createDate: 1550648810989,
        isTouchMove: false
      },
      {
        pictureUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
        id: 1,
        name: '店长：岗位编号1001',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        id: 2,
        name: '美容顾问：岗位编号1003',
        createDate: 1550648810989,
        isTouchMove: false
      }, {
        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        id: 3,
        name: '员工：岗位编号1005',
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

  },
  methods: {

    // handleEditTask(){
    //   wx.navigateTo({
    //     url: "/pages/my-task-operate/main?id=2&type=edit"
    //   });
    // },

    handleAdd(){
      this.add = true
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

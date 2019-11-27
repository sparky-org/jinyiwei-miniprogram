<template>
  <div class="page">
    <div v-if="add">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">岗位名称</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="jobName" placeholder="请输入要创建的岗位" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <template v-if="items.length>0">
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
                <view class='item-text' style="display: block; width: 100%; margin-right: 15px;">
                  <view>{{item.name}} <span style="float: right;">岗位编号：{{item.id}}</span></view>
                  <!-- <view>{{item.createDate}}</view> -->
                </view>

              </view>
            </view>
            <view class="del" @click="del" :data-id="item.id">删除</view>
        </view>
      </template>
      <div v-else>
        <!-- <div class="page__bd" style="padding-top: 150rpx; text-align: center;">
          <div class="icon-box">
            <icon type="info" size="93"></icon>
            <div class="icon-box__ctn">
              <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">暂无数据</div>
            </div>
          </div>
        </div> -->
        <no-data></no-data>
      </div>
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleAdd" v-if="!add">添加岗位</button>
      <button class="weui-btn" type="primary" @click="handleCreate" v-if="add" :disabled="jobName==''">创建岗位</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
import Touch from '../../utils/touch.js'
import noData from '../../components/no-data'
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {
    this.getData();
  },
  components: {
    noData
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
      jobName: '',
      add: false,
      touch: null,
      items: [
        // {
        //   pictureUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
        //   id: 1,
        //   name: '店长：岗位编号1001',
        //   createDate: 1550648810989,
        //   isTouchMove: false
        // }, {
        //   pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
        //   id: 2,
        //   name: '美容顾问：岗位编号1003',
        //   createDate: 1550648810989,
        //   isTouchMove: false
        // }
      ]
    };
  },

  mounted() {
    this.touch = new Touch()
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);

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

    async handleCreate(){
      const data = await post("/employee/createShopJob",{
        jobName: this.jobName,
        empNo: this.$store.state.userInfo.shopEmployee.id
      });
      if(data.success){
        wx.showToast({
          title: '创建成功',
          icon: 'success',
          duration: 2000,
          success(){

          }
        })
        this.add = false
        this.jobName = ''
        this.getData();
      }

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
        content: '确认要删除此岗位吗？',
        success: async (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            // that.data.items.splice(e.currentTarget.dataset.id, 1)
            // that.setData({
            //   items: that.data.items
            // })
            console.info(e.currentTarget.dataset.id)
            const data = await post(`/employee/deleteJob?empNo=${this.$store.state.userInfo.shopEmployee.id}&shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}&jobNo=${e.currentTarget.dataset.id}`);
            if(data.success){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000,
                success(){

                }
              })
              this.getData();
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
      const data = await post("/employee/getShopJob?shopNo="+ this.$store.state.userInfo.shopEmployee.shopNo);
       if(data.success){
        console.info(data)
        data.result.forEach(item => {
          item.isTouchMove = false
        })
        this.items = data.result
       }
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

<template>
  <div class="page">
    <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tipsMessage}}</div>
    <div v-if="add">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>项目名称</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="form.itemName" placeholder="请输入要创建的项目" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>护理时长</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="form.duration" placeholder="请输入护理时长" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>完成奖励</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="form.point" placeholder="请输入完成奖励积分" />
          </div>
        </div>
      </div>

      <div class="weui-cells__title">项目描述</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="" v-model="form.desc" placeholder="请输入项目描述" style="height: 9.9em; width: 100%;" />
            <!-- <div class="weui-textarea-counter">0/200</div> -->
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
                <view>{{item.itemName}}</view>
                <view>时间:{{item.duration}}分钟</view>
              </view>

            </view>
          </view>
          <view class="del" @click="del" :data-id="item.id">删除</view>
      </view>
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleAdd" v-if="!add">添加项目</button>
      <button class="weui-btn" type="primary" @click="handleCreate" v-if="add">创建项目</button>
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
    this.getServiceItem()
  },
  components: {

  },
  watch: {
    add(val){
       if(val){
         wx.setNavigationBarTitle({
           title: '创建项目'
         })
       }else{
         wx.setNavigationBarTitle({
           title: '项目管理'
         })
       }
    }
  },
  data() {
    return {
      showTopTips: false,
      tipsMessage: '',
      form: {
        "desc": "",
        "duration": "",
        "itemName": "",
        "point": ""
      },
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
      items: [
      //   {
      //   pictureUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
      //   id: 1,
      //   name: '1：养生保健项目',
      //   createDate: 30,
      //   isTouchMove: false
      // }, {
      //   pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
      //   id: 2,
      //   name: '2：按摩服务',
      //   createDate: 60,
      //   isTouchMove: false
      // }, {
      //   pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
      //   id: 3,
      //   name: '3：颈部项目',
      //   createDate: 90,
      //   isTouchMove: false
      // },
      // {
      //   pictureUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
      //   id: 1,
      //   name: '4：脸部项目',
      //   createDate: 45,
      //   isTouchMove: false
      // }, {
      //   pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
      //   id: 2,
      //   name: '5：手部项目',
      //   createDate: 30,
      //   isTouchMove: false
      // }, {
      //   pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
      //   id: 3,
      //   name: '6：腿部项目',
      //   createDate: 120,
      //   isTouchMove: false
      // },
      // {
      //   pictureUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
      //   id: 1,
      //   name: '7：岗位编号1001',
      //   createDate: 50,
      //   isTouchMove: false
      // }, {
      //   pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
      //   id: 2,
      //   name: '8：岗位编号1003',
      //   createDate: 45,
      //   isTouchMove: false
      // }, {
      //   pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3613977709,2622536583&fm=26&gp=0.jpg',
      //   id: 3,
      //   name: '9：岗位编号1005',
      //   createDate: 30,
      //   isTouchMove: false
      // },
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0
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

  //上拉加载
  onReachBottom() {
    console.info('onReachBottom')
    if(this.items.length < this.total) {
      this.getServiceItem(true)
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    console.info('onPullDownRefresh')
    wx.stopPullDownRefresh()
    this.getServiceItem()
  },

  methods: {

    async getServiceItem(more){
      more ? (this.currentPage++) : (this.currentPage = 1)
      const data = await post(`/serviceItem/pagingQueryServiceItems?pageSize=${this.pageSize}&currentPage=${this.currentPage}&shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`);
      if(data.success){
        console.info(data)
        data.result.forEach(item => {
          item.isTouchMove = false
        })
        this.total = data.total
        this.items = more ? this.items.concat((data.result) || []) : (data.result || [])
        // this.items = [...this.items, ...data.result]
      }
    },

    async handleCreate(){
      let result = ['desc','duration','itemName','point'].some(item =>{
        return this.form[item] == ''
      })

      if(result){
        this.tipsMessage = '请填写完整的信息!'
        this.showTopTips = true
        setTimeout(()=>{
          this.showTopTips = false
        },3000)
        return
      }

       const data = await post("/serviceItem/createServiceItem", {
         ...this.form,
         empNo: this.$store.state.userInfo.shopEmployee.id
       });


       if(data.success){
         wx.showToast({
           title: '创建项目成功',
           icon: 'success',
           duration: 1000,
           success(){

           }
         })
         this.form = {
          "desc": "",
          "duration": '',
          "itemName": "",
          "point": ''
        }
         this.add = false
       }
    },

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
      // console.info(e)
      let params = e.mp
      // 开始触摸时 重置所有删除
      let data = this.touch._touchstart(params, this.items)
      // console.info('data', data)
      this.items = data
    },

    // 滑动事件处理
    touchmove: function (e) {
      // console.log(2)
      let params = e.mp
      let data = this.touch._touchmove(params, this.items)
      // console.info('data', data)
      this.items = data
    },

    // 删除事件
    del: function (e) {
      var that = this
      wx.showModal({
        title: '提示',
        content: '确认要删除项目吗？',
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

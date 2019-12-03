<template>
  <div class="page">


    <div class="tab-wrapper">
      <div class="weui-flex tab-fixed">
        <div class="weui-flex__item">
          <picker class="weui-btn" mode="date" :end="endDate" :value="startDate" @change="bindStartDateChange">
            <div class="tab-title" style="font-size: 13px;">{{startDate?startDate:'开始日期'}}<ins></ins></div>
          </picker>
        </div>
        <div class="weui-flex__item">
          <picker class="weui-btn" mode="date" :start="startDate" :value="endDate" @change="bindEndDateChange">
            <div class="tab-title"  style="font-size: 13px;">{{endDate?endDate:'结束日期'}}<ins></ins></div>
          </picker>
        </div>
        <div class="weui-flex__item">
          <picker @change="bindPickerChange" :value="index" :range="enumArea">
            <div class="tab-title" style="font-size: 13px;">{{enumArea[index]}}<ins></ins></div>
          </picker>
        </div>
        <!-- <div class="weui-flex__item">
          <picker @change="bindScoreChange" :value="index" :range="enumScore">
            <div class="tab-title" style="font-size: 13px;">{{score}}<ins></ins></div>
          </picker>
        </div> -->
      </div>
    </div>


    <div class="content">

      <template v-if="list.length">

        <div class="weui-form-preview" v-for="(item, index) in list" :key="index">
          <!-- <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">付款金额</div>
              <div class="weui-form-preview__value_in-hd">¥2400.00</div>
            </div>
          </div> -->
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">任务名称</div>
              <div class="weui-form-preview__value">{{item.taskName}}</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">任务内容</div>
              <div class="weui-form-preview__value">{{item.content}}</div>
            </div>
  <!--          <div class="weui-form-preview__item">-->
  <!--            <div class="weui-form-preview__label">创建时间</div>-->
  <!--            <div class="weui-form-preview__value">2019-10-11 18:12:23</div>-->
  <!--          </div>-->
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">任务积分</div>
              <div class="weui-form-preview__value">{{item.rewardPoint}}积分</div>
            </div>
  <!--          <div class="weui-form-preview__item">-->
  <!--            <div class="weui-form-preview__label">剩余个数</div>-->
  <!--            <div class="weui-form-preview__value">无限制</div>-->
  <!--          </div>-->
          </div>
          <div>
            <div class="weui-flex">
              <div class="weui-flex__item" style="padding: 20rpx;">
                <button class="weui-btn" type="warn" plain="true" @click="handleDelete(item)">删除</button>
              </div>
              <div class="weui-flex__item" style="padding: 20rpx;">
                <button class="weui-btn" type="primary" plain="true" @click="handleEditTask(item)">查看</button>
              </div>
            </div>
          </div>
        </div>
        <div style="padding-top: 6rpx;" class="no-more" v-if="list.length >= totalCount">没有更多了</div>
      </template>
      <no-data v-else></no-data>

    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, queryParams } from "../../utils";
// import { mapState, mapMutations } from "vuex";
import noData from '@/components/no-data'

// let enumArea = ['可见范围(全部)','店长','店长','顾问'];
// let enumScore = ['积分范围','<=50', '<100','>100']
export default {
  onShow() {
    this.getShopJobList()
    this.getData()
  },
  components: {
    noData
  },
  data() {
    return {
      // role: '',
      index: 0,
      enumArea: [],

      // enumScore: [],
      // score: enumScore[0],
      startDate: null,
      endDate: null,
      jobNo: '',

      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      list: [],



      shopJobList: []
    };
  },

  watch: {
    startDate(){
      this.getData()
    },
    endDate(){
      this.getData()
    },
    jobNo(){
      this.getData()
    }
  },

  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

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

    handleDelete(item){
      wx.showModal({
        title: '提示',
        content: '确定要删除该任务吗？',
        success: async (res) => {
          console.log(res);
          if (res.confirm) {
            // console.log('用户点击主操作')
            const data = await post(`/manage/task/deleteTask?empNo=${this.$store.state.userInfo.shopEmployee.id}&taskNo=${item.taskNo}`);
            if(data.success){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000,
                success: ()=>{
                  this.getData()
                }
              })
            }
          } else {
            // console.log('用户点击辅助操作')
          }
        }
      });
    },

    async getShopJobList(){
      const data = await post(`/employee/getShopJob?shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`);
      if(data.success){
        let arr = [{
          name: '可见范围(不限)',
          id: ''
         }]
        this.shopJobList = [...arr,...data.result]
        this.enumArea = this.shopJobList.map(item => {
          return item.name
        })
      }
    },

    async getData(append) {
      if(append){
        this.currentPage++
      }else{
        this.currentPage = 1
      }
      let params = {
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "empNo": this.$store.state.userInfo.shopEmployee.id,
        "jobNo": this.jobNo,
        beginDate: this.startDate,
        endDate: this.endDate
      }
      console.info(append,this.currentPage,'12812812')
      const data = await post(`/manage/task/queryTask?${queryParams(params)}`);
      if(data.success){
        this.totalCount = data.total
        this.list = append ? this.list.concat((data.result) || []) : (data.result || [])
      }
    },

    handleEditTask(item){
      wx.navigateTo({
        url: "/pages/my-task-operate/main?id="+ item.taskNo
      });
    },

    bindStartDateChange(e) {
      this.startDate = e.mp.detail.value;
    },
    bindEndDateChange(e) {
      this.endDate = e.mp.detail.value;
    },

    bindPickerChange(e) {
      this.area = this.enumArea[e.mp.detail.value];
      this.jobNo = this.shopJobList[e.mp.detail.value].id
    },

    // bindScoreChange(e) {
    //   this.score = this.enumScore[e.mp.detail.value];
    // },



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
@import "./style.scss";
</style>

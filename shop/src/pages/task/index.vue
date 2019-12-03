<template>
  <div class="task">
    <div class="weui-flex tab-wrapper">
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==1}" @click="handelTabClick(1)">工作积分<em></em></div>
      </div>
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==2}" @click="handelTabClick(2)">品德积分<em></em></div>
      </div>
      <div class="weui-flex__item">
        <div class="tab-title" @click="handleStateSelect">{{title}}<ins></ins></div>
      </div>
    </div>

    <div class="content">


      <template v-if="list.length">
        <div class="weui-form-preview" v-for="(item, index) in list" :key="index">
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">任务名称</div>
              <div class="weui-form-preview__value">{{item.taskName}}</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">任务内容</div>
              <div class="weui-form-preview__value">{{item.content}}</div>
            </div>
            <!--<div class="weui-form-preview__item">-->
              <!--<div class="weui-form-preview__label">创建时间</div>-->
              <!--<div class="weui-form-preview__value">2019-10-11 18:12:23</div>-->
            <!--</div>-->
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">任务积分</div>
              <div class="weui-form-preview__value">{{item.rewardPoint}}积分</div>
            </div>
            <!--<div class="weui-form-preview__item">-->
              <!--<div class="weui-form-preview__label">剩余个数</div>-->
              <!--<div class="weui-form-preview__value">无限制</div>-->
            <!--</div>-->
          </div>
          <div class="weui-form-preview__ft">
            <button class="weui-btn" type="primary" @click="handleAction(item)" :disabled="item.status=='COMPLETE'">{{item.status=='COMPLETE'?'已完成':'完 成'}}</button>
          </div>
        </div>
        <div class="no-more" v-if="list.length >= totalCount">没有更多了</div>
      </template>
      <no-data v-else></no-data>

    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, queryParams } from "../../utils";
import noData from '@/components/no-data'
// import { mapState, mapMutations } from "vuex";

let enumTaskText = ['全部状态','已完成','未完成']
let enumTaskValue = [ null, 'COMPLETE','UNCOMPLETE']
export default {
  onShow() {
    this.getData()
  },
  components: {
    noData
  },
  data() {
    return {
      // role: '',
      index: 1,
      list:[],
      type: 'ACTION',
      title: enumTaskText[0],
      state: enumTaskValue[0],


      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      list: []
    };
  },

  watch: {
    type(val){
      this.getData()
    },
    state(val){
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

    handleAction(item){
      wx.showModal({
        title: '提示',
        content: '确定完成该任务？',
        success: async (res) => {
          console.log(res);
          if (res.confirm) {
            const data = await post(`/myTask/completeTask`, {
              "empNo": this.$store.state.userInfo.shopEmployee.id,
              "taskNo": item.taskNo
            });
            if(data.success){
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 1000,
                success: () => {
                  
                }
              })
              this.getData()
            }
          } else {
            console.log('用户点击辅助操作')
          }
        }
      });
    },


    handelTabClick(index){
      this.index = index;
      if (index == 1){
        this.type = 'ACTION'
      }
      if (index == 2){
        this.type = 'CHARACTER'
      }
    },
    handleStateSelect(){
      wx.showActionSheet({
        itemList: enumTaskText,
        success: (res) => {
          console.log(res.tapIndex)
          this.title = enumTaskText[res.tapIndex]
          this.state = enumTaskValue[res.tapIndex]
        }
      });
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
        pointType: this.type,
        taskStatus: this.state
      }
      console.info('queryParams(params)',queryParams(params))
      const data = await post(`/myTask/queryMyTask?${queryParams(params)}`);
      if(data.success){
        this.totalCount = data.total
        this.list = append ? this.list.concat((data.result) || []) : (data.result || [])
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
@import "./style.scss";
</style>

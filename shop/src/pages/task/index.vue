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
      <div class="weui-form-preview" v-for="(item, index) in taskList">
        <!-- <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">付款金额</div>
            <div class="weui-form-preview__value_in-hd">¥2400.00</div>
          </div>
        </div> -->
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">任务名称</div>
            <div class="weui-form-preview__value">{{item.name}}</div>
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
            <div class="weui-form-preview__value">{{item.point}}积分</div>
          </div>
          <!--<div class="weui-form-preview__item">-->
            <!--<div class="weui-form-preview__label">剩余个数</div>-->
            <!--<div class="weui-form-preview__value">无限制</div>-->
          <!--</div>-->
        </div>
        <div class="weui-form-preview__ft">
          <button class="weui-btn" type="primary" :disabled="item.statusDisable">{{item.statusDesc}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";

let enumTaskState = ['任务状态','未完成','审核中','已奖励'];
export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',
      index: 1,
      title: enumTaskState[0],
      taskList1:[{
       name:'每天演练接待流程',
       content:'美容师每天演练接待流程2遍，让客户拥有预约的接待过程。',
       point:3,
       statusDesc:'未完成',
        statusDisable:false
      },{
        name:'每天演练接待流程',
        content:'美容师每天演练接待流程2遍，让客户拥有预约的接待过程。',
        point:3,
        statusDesc:'审核中',
        statusDisable:true
      },{
        name:'每天演练接待流程',
        content:'美容师每天演练接待流程2遍，让客户拥有预约的接待过程。',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      },{
        name:'每天演练接待流程',
        content:'美容师每天演练接待流程2遍，让客户拥有预约的接待过程。',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      },{
        name:'每天演练接待流程',
        content:'美容师每天演练接待流程2遍，让客户拥有预约的接待过程。',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      },{
        name:'每天演练接待流程',
        content:'美容师每天演练接待流程2遍，让客户拥有预约的接待过程。',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      }],
      taskList2:[{
        name:'培训新人',
        content:'培训新人一个手法奖励3积分',
        point:3,
        statusDesc:'未完成',
        statusDisable:false
      },{
        name:'培训新人',
        content:'培训新人一个手法奖励3积分',
        point:3,
        statusDesc:'审核中',
        statusDisable:true
      },{
        name:'培训新人',
        content:'培训新人一个手法奖励3积分',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      },{
        name:'培训新人',
        content:'培训新人一个手法奖励3积分',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      },{
        name:'培训新人',
        content:'培训新人一个手法奖励3积分',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      },{
        name:'培训新人',
        content:'培训新人一个手法奖励3积分',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      },{
        name:'培训新人',
        content:'培训新人一个手法奖励3积分',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      },{
        name:'培训新人',
        content:'培训新人一个手法奖励3积分',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      },{
        name:'培训新人',
        content:'培训新人一个手法奖励3积分',
        point:3,
        statusDesc:'已奖励',
        statusDisable:true
      }],
      taskList3:[{
        name:'培训新人',
        content:'培训新人一个手法奖励3积分',
        point:3,
        statusDesc:'已完成',
        statusDisable:true
      }],
      taskList: this.taskList1
    };
  },

  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {
    handelTabClick(index){
      this.index = index;
      if (index == 1){
        this.taskList = this.taskList1;
      }
      if (index == 2){
        this.taskList = this.taskList2;
      }
      if (index == 3){
        this.taskList = this.taskList3;
      }
      console.log("task list is :", taskList)
    },
    handleStateSelect(){
      wx.showActionSheet({
        itemList: enumTaskState,
        success: (res) => {
          console.log(res.tapIndex)
          this.title = enumTaskState[res.tapIndex]
        }
      });
    }

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

<template>
  <div class="page">

    <div class="weui-toptips weui-toptips_warn" v-if="errorTips">错误提示</div>

    <div class="weui-cells__title"><span class="required">*</span>店内制度</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="" placeholder="请输入店内制度" v-model="ruleText" style="height: 9.9em; width: 100%;" />
          <!-- <div class="weui-textarea-counter">0/200</div> -->
        </div>
      </div>
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary">保 存</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',
      errorTips: false,
      ruleText: '一、目的：为驱动美容师技能提升、品德优化、创造卓越绩效，实现春微连锁的梦想；本积\n' +
          '分是让每个美容师从平凡到有秀再到卓越的机制。\n' +
          '二、积分定义\n' +
          '1、积分机制由基础积分、业绩积分和行为积分三部分组成，是评定先进、晋级、加薪及年\n' +
          '度优秀员工的重要参考依据，与美容师的薪酬激励、福利待遇和晋升发展挂钩。' +
          '三、美容师岗位职责积分' +
          '1. 每天演练接待流程2遍，让客户拥有愉悦的接待过程，完成奖励3分。该项完成后找到相应任务点击“完成”，审核后即可发放积分。' +
          '2. 每天学习2遍，奖励3分，完成后点击完成任务自动完成申报。' +
          '3. 每天搞好卫生后找到相应任务点击完成奖励3分，申请审批通过后自动增加积分。' +
          '4. 每月1号做好客户分析，制定好销售目标。以日志方式提交，该项奖励20分。提交审核通过后自动发放。'
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

<template>
  <div class="page">
    <div v-for="(item ,index) in pointRuleList">
      <div class="weui-form-preview" style="margin-bottom: 20rpx;">
        <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>积分类型</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" placeholder="请输入积分类型" :value="item.type" disabled="true"/>
            </div>
          </div>

          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>奖励分值</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" placeholder="请输入内容" :value="item.reward" disabled="true"/>
            </div>
          </div>

          <div class="weui-cells weui-cells_after-title no-t">
            <div class="weui-cell weui-cell_input">
              <div class="weui-cell__hd">
                <div class="weui-label"><span class="required">*</span>描&#12288;&#12288;述</div>
              </div>
              <div class="weui-cell__bd" style="padding: 20rpx 0;" v-html="item.desc">
                <textarea class="" placeholder="请输入描述" style="height: 3.3em; width: 100%;" v-model="noticeText" :v-text="item.desc" />

              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="weui-flex">
            <div class="weui-flex__item" style="padding: 20rpx;">
              <button class="weui-btn" type="warn" plain="true">删除</button>
            </div>
            <div class="weui-flex__item" style="padding: 20rpx;">
              <button class="weui-btn" type="primary" plain="true" @click="handleEditTask(1)">修改</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleAdd">添 加</button>
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
      pointRuleList:[{
        type:'工作积分',
        reward:20,
        desc:'' +
          '1. 专业每天在群里学习两边，增加我们的服务价值，奖励3分；<br />' +
          '2. 每天每预约2个以上顾客，奖励3分；<br />' +
          '3. 每星期练习2次手法，奖励3分；<br />' +
          '4. 每月1日做好客户分析，制定好销售目标，以书面形式发到群里，奖励20分；<br />' +
          '5. 不服从安排，违反店内纪律的行为，扣30分；<br />'
      },{
        type:'品德积分',
        reward:20,
        desc:'' +
          '1. 每天演练接待流程2遍，让客户拥有愉悦的接待过程，奖励3分；<br />' +
          '2. 每天成交演练两边，拍视频到群里，奖励3分；<br />' +
          '3. 每天搞好卫生发视频到群里，奖励3分；<br />' +
          '4. 培训新人一个手法，奖励3分；<br />' +
          '5. 每加班1小时，奖励3分；<br />'+
          '6. 不服从安排，违反店内纪律的行为，扣30分；<br />'
      }],

      // role: '',
      noticeText: ''
    };
  },

  mounted() {
    // this.id = this.$root.$mp.query.id;
    // console.info(this.id)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {
    handleEditTask(id){

    },

    handleAdd(){
      wx.navigateTo({
        url: "/pages/my-score-operate/main"
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

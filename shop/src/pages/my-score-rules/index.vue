<template>
  <div class="page">
    <template v-if="pointRuleList.length > 0">
    <div v-for="(item ,index) in pointRuleList" :key="index">
      <div class="weui-form-preview" style="margin-bottom: 20rpx;">
        <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label">积分类型</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" :value="item.pointName" disabled="true"/>
            </div>
          </div>

          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label">奖励分值</div>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" :value="item.point" disabled="true"/>
            </div>
          </div>

          <div class="weui-cells weui-cells_after-title no-t">
            <div class="weui-cell weui-cell_input">
              <div class="weui-cell__hd">
                <div class="weui-label">描&#12288;&#12288;述</div>
              </div>
              <div class="weui-cell__bd" style="padding: 20rpx 0;">
                <!-- <textarea disabled="disabled" :value="item.pointDesc" style="height: 3.3em; width: 100%;" /> -->
                <div style="word-break:break-all; word-wrap:break-word;">{{item.pointDesc}}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="weui-flex">
            <div class="weui-flex__item" style="padding: 20rpx;">
              <button class="weui-btn" type="warn" plain="true" @click="handleDelete(item)">删除</button>
            </div>
            <div class="weui-flex__item" style="padding: 20rpx;">
              <button class="weui-btn" type="primary" plain="true" @click="handleEditTask(item)">修改</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
    <no-data v-else></no-data>
    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleAdd">添 加</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
import noData from '@/components/no-data'
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {
    this.getData()
  },
  components: {
    noData
  },
  data() {
    return {
      pointRuleList:[
        // {
        //   type:'工作积分',
        //   reward:20,
        //   desc:'' +
        //     '1. 专业每天在群里学习两边，增加我们的服务价值，奖励3分；<br />' +
        //     '2. 每天每预约2个以上顾客，奖励3分；<br />' +
        //     '3. 每星期练习2次手法，奖励3分；<br />' +
        //     '4. 每月1日做好客户分析，制定好销售目标，以书面形式发到群里，奖励20分；<br />' +
        //     '5. 不服从安排，违反店内纪律的行为，扣30分；<br />'
        // },{
        //   type:'品德积分',
        //   reward:20,
        //   desc:'' +
        //     '1. 每天演练接待流程2遍，让客户拥有愉悦的接待过程，奖励3分；<br />' +
        //     '2. 每天成交演练两边，拍视频到群里，奖励3分；<br />' +
        //     '3. 每天搞好卫生发视频到群里，奖励3分；<br />' +
        //     '4. 培训新人一个手法，奖励3分；<br />' +
        //     '5. 每加班1小时，奖励3分；<br />'+
        //     '6. 不服从安排，违反店内纪律的行为，扣30分；<br />'
        // },
      ],

      // role: '',
      // noticeText: ''
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
    handleEditTask(item){
      wx.setStorageSync('score-item',JSON.stringify(item))
      wx.navigateTo({
        url: "/pages/my-score-operate/main"
      });
    },

    handleDelete(item){
      wx.showModal({
        title: '提示',
        content: '确定要删除此积分制度吗？',
        // confirmText: "主操作",
        // cancelText: "辅助操作",
        success: async (res) => {
          console.log(res);
          if (res.confirm) {
            const data = await post("/point/deletePointConfig?operator=" + this.$store.state.userInfo.shopEmployee.id+'&configNo='+item.id);
            if(data.success){
             wx.showToast({
               title: '删除成功',
               icon: 'success',
               duration: 1000,
               success(){

               }
             })
             setTimeout(()=>{
               this.getData()
             },1000)

            }
          } else {
            console.log('用户点击辅助操作')
          }
        }
      });



    },

    handleAdd(){
      wx.navigateTo({
        url: "/pages/my-score-operate/main"
      });
    },

    async getData() {
      const data = await post("/point/getPointConfig?shopNo=" + this.$store.state.userInfo.shopEmployee.shopNo);
      if(data.success){
        this.pointRuleList = data.result;
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

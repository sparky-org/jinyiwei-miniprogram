<template>
  <div class="page">

    <div class="weui-form-preview" style="margin-bottom: 20rpx;">
      <div class="weui-cells weui-cells_after-title">

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>预约客户</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入预约客户" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>预约项目</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入预约项目" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>到店时间</div>
          </div>
          <div class="weui-cell__bd">
            <picker class="weui-btn" mode="date" :value="beginDate" @change="bindBeginChange">
              <input class="weui-input" placeholder="请选择到店时间" disabled="disabled" v-model="beginDate" />
            </picker>
          </div>
        </div>



        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>接待美容师</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入接待美容师" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>备注</div>
          </div>
          <div class="weui-cell__bd" style="padding: 20rpx 0;">
            <textarea class="" placeholder="请输入备注" style="height: 3.3em; width: 100%;" />
          </div>
        </div>

      </div>


    </div>


    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSign">确 定</button>
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
      beginDate: ''
    };
  },

  mounted() {
    // this.calendar.jump(2021, 10);
    // this.id = this.$root.$mp.query.id;
    // console.info(this.id)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {
    bindBeginChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
      this.beginDate = e.mp.detail.value
    },
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
    handleSign() {
      wx.navigateTo({
        url: "/pages/my-sign/main?"
      });
    }
  },
  created() {

  }
};
</script>

<style lang='scss'>
  @import "./style.scss";
</style>

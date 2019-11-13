<template>
  <div class="page">

    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">类型</div>
          <div class="weui-form-preview__value_in-hd">请假申请</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请人</div>
          <div class="weui-form-preview__value">张无忌</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">审批人</div>
          <div class="weui-form-preview__value">赵本山</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">状态</div>
          <div class="weui-form-preview__value">审批通过</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">日期</div>
          <div class="weui-form-preview__value" style="color: #999;">2019-11-11 11:11:11</div>
        </div>
      </div>
      <!-- <div class="weui-form-preview__ft">
        <navigator url="" class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">操作</navigator>
      </div> -->
    </div>

    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">类型</div>
          <div class="weui-form-preview__value_in-hd" style="text-align: left; font-size: 36rpx; color: #10AEFF;">颈部护理项目申报申请</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请人</div>
          <div class="weui-form-preview__value" style="text-align: left;">张无忌</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">审批人</div>
          <div class="weui-form-preview__value" style="text-align: left;">赵本山</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">状态</div>
          <div class="weui-form-preview__value" style="text-align: left;">审批通过</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">日期</div>
          <div class="weui-form-preview__value" style="color: #999;text-align: left;">2019-11-11 11:11:11</div>
        </div>
      </div>
      <!-- <div class="weui-form-preview__ft">
        <navigator url="" class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">操作</navigator>
      </div> -->
    </div>




    <!-- <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSign">确 定</button>
    </div> -->

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
    // bindBeginChange(e) {
    //   console.log('选中的时间为：' + e.mp.detail.value);
    //   this.beginDate = e.mp.detail.value
    // },
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
    // handleSign() {
    //   wx.navigateTo({
    //     url: "/pages/my-sign/main?"
    //   });
    // }
  },
  created() {

  }
};
</script>

<style lang='scss'>
  @import "./style.scss";
</style>

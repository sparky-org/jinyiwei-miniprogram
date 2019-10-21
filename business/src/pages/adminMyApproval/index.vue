<template>
  <div class="my_approval">

    <div class="history">
      <navigator class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active" url="/pages/adminMyApprovalHistory/main">审批历史 ></navigator>
    </div>

    <div class="weui-form-preview" v-for="(item, index) in list" :key="index">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请人</div>
        <div class="weui-form-preview__value_in-hd">{{item.applyUserName}}</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请内容</div>
          <div class="weui-form-preview__value">2019-09-10到2019-09-11请假一天</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">同意</div>
      </div>
    </div>

    <!-- <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请人</div>
        <div class="weui-form-preview__value_in-hd">张三</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请内容</div>
          <div class="weui-form-preview__value">2019-09-10到2019-09-11请假一天</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">同意</div>
      </div>
    </div> -->

    <!-- <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请人</div>
        <div class="weui-form-preview__value_in-hd">张三</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请内容</div>
          <div class="weui-form-preview__value">2019-09-10到2019-09-11请假一天</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">同意</div>
      </div>
    </div> -->

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      list: [],
    };
  },
  components: {},
  methods: {
    // ...mapMutations(["update"]),
    async getData() {
      const data = await post(`/shop/apply/getApplyList`, {
        "shopId": this.$store.state.userInfo.shopId,
        "currentPageIndex": 1,
        "pageSize": 1000000,
      })
      if(data.success){
        this.list = data.result ? data.result : []
      }
      // const data = await get("/index/index");
      // this.banner = data.banner;
    },
    // topicdetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/topicdetail/main?id=" + id
    //   });
    // },
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>

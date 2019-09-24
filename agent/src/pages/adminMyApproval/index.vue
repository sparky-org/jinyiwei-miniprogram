<template>
  <div class="my_approval">

    <!-- <div class="history">
      <navigator class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active" url="/pages/adminMyApprovalHistory/main">审批历史 ></navigator>
    </div> -->


    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请人</div>
        <div class="weui-form-preview__value_in-hd">张三</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请类型</div>
        <div class="weui-form-preview__value_in-hd">请假</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请内容</div>
          <div class="weui-form-preview__value">2019-09-10到2019-09-11请假一天</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">驳回</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">批准</div>
      </div>
    </div>

    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请人</div>
        <div class="weui-form-preview__value_in-hd">张三</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请类型</div>
        <div class="weui-form-preview__value_in-hd">请假</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请内容</div>
          <div class="weui-form-preview__value">2019-09-10到2019-09-11请假一天</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">驳回</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">批准</div>
      </div>
    </div>
    
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请人</div>
        <div class="weui-form-preview__value_in-hd">张三</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请类型</div>
        <div class="weui-form-preview__value_in-hd">请假</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请内容</div>
          <div class="weui-form-preview__value">2019-09-10到2019-09-11请假一天</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">驳回</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">批准</div>
      </div>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      banner: [],
    };
  },
  components: {},
  methods: {
    ...mapMutations(["update"]),
    async getData() {
      const data = await get("/index/index");
      this.banner = data.banner;
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>

<template>
  <div class="staff_apply">

    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请类型</div>
        <div class="weui-form-preview__value_in-hd">请假</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请描述</div>
        <div class="weui-form-preview__value_in-hd">2019-09-10到2019-09-11请假一天</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请状态</div>
        <div class="weui-form-preview__value_in-hd">待审批</div>
      </div>
      <div class="weui-form-preview__ft" style="margin-top: -1rpx;">
        <!-- <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div> -->
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">取 消</div>
      </div>
    </div>

    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请类型</div>
        <div class="weui-form-preview__value_in-hd">请假</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请描述</div>
        <div class="weui-form-preview__value_in-hd">2019-09-10到2019-09-11请假一天</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请状态</div>
        <div class="weui-form-preview__value_in-hd">待审批</div>
      </div>
      <div class="weui-form-preview__ft" style="margin-top: -1rpx;">
        <!-- <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div> -->
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">取 消</div>
      </div>
    </div>

    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请类型</div>
        <div class="weui-form-preview__value_in-hd">请假</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请描述</div>
        <div class="weui-form-preview__value_in-hd">2019-09-10到2019-09-11请假一天</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请状态</div>
        <div class="weui-form-preview__value_in-hd">待审批</div>
      </div>
      <div class="weui-form-preview__ft" style="margin-top: -1rpx;">
        <!-- <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div> -->
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">取 消</div>
      </div>
    </div>


    <div class="sureBth">
      <button class="weui-btn" type="primary" @click="handleAdd">新申请</button>
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
      date: '2019-08-11'
    };
  },
  components: {},
  methods: {
    handleAdd(){
      wx.showActionSheet({
        itemList: ['请假', '请款'],
        success: function (res) {
          console.log(res.tapIndex)
          wx.navigateTo({
            url: "/pages/staffApplyCreate/main?type=" + res.tapIndex
          });
        }
      })
    },
    bindDateChange(e) {
      console.log('选中的日期为：' + e.mp.detail.value);
      this.date = e.mp.detail.value
    },
    ...mapMutations(["update"]),

    async getData() {
      const data = await get("/index/index");
      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    }
  },
  created() {
    console.log(89128921982189)
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

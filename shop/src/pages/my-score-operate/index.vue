<template>
  <div class="page">
    <div class="weui-form-preview" style="margin-bottom: 20rpx;">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>积分类型</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入积分类型" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>分值</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入分值" />
          </div>
        </div>

        <div class="weui-cells weui-cells_after-title no-t">
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>使用描述</div>
            </div>
            <div class="weui-cell__bd" style="padding: 20rpx 0;">
              <textarea class="" placeholder="请输入使用描述" style="height: 3.3em; width: 100%;" v-model="noticeText" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary">确 定</button>
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
      wx.navigateTo({
        url: "/pages/my-score-operate/main?id="+id
      });
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

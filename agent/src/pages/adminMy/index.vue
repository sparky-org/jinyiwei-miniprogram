<template>
  <div class="work_bench">
    <div class="weui-cells__title">我的工作台</div>
    <div class="weui-cells weui-cells_after-title">
      <navigator url="/pages/adminPublishTaskCreate/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">发布任务</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
      <navigator url="/pages/adminPublishTask/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">任务列表</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
      <!-- <navigator url="/pages/adminCustomerPoint/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">顾客积分榜</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator> -->
      <navigator url="/pages/adminStaffPoint/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">积分榜</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
      <navigator url="/pages/adminMyApproval/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">待我审批</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
      <!-- <navigator url="/pages/adminAssociatedAgents/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">关联代理商</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator> -->

      <navigator url="/pages/adminProductManage/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">商品管理</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
      <navigator url="/pages/adminMyData/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">数据大盘</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
      <navigator url="/pages/adminMyQrCode/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">我的二维码</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator>
      <!-- <navigator url="/pages/adminService/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">客服</div>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </navigator> -->
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
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: []
    };
  },
  components: {},
  methods: {
    ...mapMutations(["update"]),

    async getData() {
      const data = await get("/index/index");
      this.banner = data.banner;
      this.channel = data.channel;
      this.brandList = data.brandList;
      this.newGoods = data.newGoods;
      this.hotGoods = data.hotGoods;
      this.topicList = data.topicList;
      this.newCategoryList = data.newCategoryList;
    },
    goodsDetail(id) {
      wx.navigateTo({
        url: "/pages/goods/main?id=" + id
      });
    },
    categoryList(id) {
      wx.navigateTo({
        url: "/pages/categorylist/main?id=" + id
      });
    },
    goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url: "/pages/newgoods/main?isHot=" + 1
        });
      } else {
        wx.navigateTo({
          url: "/pages/newgoods/main?isNew=" + 1
        });
      }
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
    totopic() {
      wx.navigateTo({
        url: "/pages/topic/main"
      });
    },
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main"
      });
    },
    branddetail(id) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + id
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

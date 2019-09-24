<template>
  <div class="staff_point_detail">

   <div class="weui-cells weui-cells_after-title">
     <div class="weui-cell">
       <div class="weui-cell__bd">任务名称：签到（10积分）</div>
       <div class="weui-cell__ft">2019-09-01</div>
     </div>
     <div class="weui-cell">
       <div class="weui-cell__bd">任务名称：签到（10积分）</div>
       <div class="weui-cell__ft">2019-09-01</div>
     </div>
     <div class="weui-cell">
       <div class="weui-cell__bd">任务名称：签到（10积分）</div>
       <div class="weui-cell__ft">2019-09-01</div>
     </div>
     <div class="weui-cell">
       <div class="weui-cell__bd">任务名称：签到（10积分）</div>
       <div class="weui-cell__ft">2019-09-01</div>
     </div>
     <div class="weui-cell">
       <div class="weui-cell__bd">任务名称：签到（10积分）</div>
       <div class="weui-cell__ft">2019-09-01</div>
     </div>
   </div>
   
   

    <!-- <div class="date_wrapper">
      <picker class="weui-btn" mode="date" :value="date" fields="month" start="2015-09" end="2017-09" @change="bindDateChange">
        <button type="default">{{date}}</button>
      </picker>
    </div> -->

    <!-- <div class="weui-cells weui-cells_after-title">
      <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">邹志辉</div>
        <div class="weui-cell__ft weui-cell__ft_in-access">500</div>
      </navigator>
      <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">刘德华</div>
        <div class="weui-cell__ft weui-cell__ft_in-access">300</div>
      </navigator>
    </div> -->

    <!-- <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">邹志辉</div>
        <div class="weui-cell__ft">5000</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">袁凯</div>
        <div class="weui-cell__ft">8000</div>
      </div>
    </div> -->
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
      date: '2019-06'
    };
  },
  components: {},
  methods: {
    bindDateChange(e) {
      console.log('选中的日期为：' + e.mp.detail.value);
      this.date = e.mp.detail.value
    },
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

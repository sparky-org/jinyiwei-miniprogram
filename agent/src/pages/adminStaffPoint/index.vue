<template>
  <div class="staff_point">
    <div class="date_wrapper">
      <picker class="weui-btn" mode="date" :value="date" fields="month" @change="bindDateChange">
        <button type="default">{{date}}</button>
      </picker>
    </div>

    <div class="weui-cells weui-cells_after-title" v-if="list.length > 0">
      <navigator :url="'/pages/adminStaffPointDetail/main?id='+item.empId +'&date='+date" v-for="(item, index) in list" :key="index" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <!-- <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div> -->
        <div class="weui-cell__bd">{{item.name}}</div>
        <div class="weui-cell__ft weui-cell__ft_in-access">{{item.point}}</div>
      </navigator>
      <!-- <navigator url="/pages/adminStaffPointDetail/main?id=2" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">刘德华</div>
        <div class="weui-cell__ft weui-cell__ft_in-access">300</div>
      </navigator> -->
    </div>

    <div v-if="list.length==0">
      <div class="page__bd" style="padding-top: 150rpx; text-align: center;">
        <div class="icon-box">
          <icon type="info" size="93"></icon>
          <div class="icon-box__ctn">
            <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">暂无数据</div>
          </div>
        </div>
      </div>
    </div>

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
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
let D = new Date()
let date = D.getFullYear() + '-' + (D.getMonth() + 1)
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
      icon: '',
      // banner: [],
      date: date
    };
  },
  watch: {
     date(val){
      console.info('change后的值：',val)
      this.getData();
     }
  },
  components: {},
  methods: {
    bindDateChange(e) {
      console.log('选中的日期为：' + e.mp.detail.value);
      this.date = e.mp.detail.value
    },
    // ...mapMutations(["update"]),
    async getData() {
      const data = await post(`/agency/info/getPointBang?agencyId=${this.$store.state.userInfo.agencyId}&month=${this.date}`);
      console.info(data,'122112')
      this.list = data.result ? data.result : [] 
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

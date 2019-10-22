<template>
  <div class="associated_agents">
    <!-- -- {{list.length}} -- -->
    <div class="weui-cells weui-cells_after-title" v-if="list.length > 0">
      <div class="weui-cell" v-for="(item, index) in list" :key="index">
        <div class="weui-cell__hd">
          <!-- <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image> -->
        </div>
        <div class="weui-cell__bd">{{item.agencyName}}</div>
        <div class="weui-cell__ft">{{item.timeStr}}</div>
      </div>
      <!-- <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">长江美业1212</div>
        <div class="weui-cell__ft">2019-09-18</div>
      </div> -->
    </div>
    <div v-else>
      <div class="page__bd" style="padding-top: 150rpx; text-align: center;">
        <div class="icon-box">
          <icon type="info" size="93"></icon>
          <div class="icon-box__ctn">
            <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sureBth">
      <button class="weui-btn" type="primary" @click="handleAdd">新 增</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, msToDate } from "../../utils";
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
      const data = await post(`/shop/getRelatedAgency?shopId=${this.$store.state.userInfo.shopId}`)
      if(data.success){
        data.result.forEach(item => {
          item.timeStr = msToDate(item.relatedDate)
        })
        this.list = data.result ? data.result : []
      }
      // const data = await get("/index/index");
      // this.banner = data.banner;
    },
    handleAdd(){
      console.info(this.$store.state.userInfo.shopId,'this.$store.state.userInfo.shopId')
      wx.scanCode({
        success: async (res) => {
          console.log(res)
          const data = await post(`/shop/bindAgency`, {
            "shopId": this.$store.state.userInfo.shopId,
            "agencyId": res.agencyId
          })
          if(data.success){
            wx.showModal({
              content: '绑定成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  // console.log('用户点击确定')
                }
              }
            });
            this.getData()
          }

        }
      })
    }
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

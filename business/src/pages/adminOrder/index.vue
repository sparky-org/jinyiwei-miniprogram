<template>
  <div class="order_manage">
    <!-- {{list}}212121 -->
    <template v-if="list.length > 0">
      <div class="weui-panel weui-panel_access custom-title" v-for="(item, index) in list" :key="index">
        <div class="weui-panel__hd">{{item.orderTimeStr}}<span :class="{greenColor: item.status!='NEW'}">{{item.status=='NEW'?'未付款':'已付款'}}</span></div>
        <div class="weui-panel__bd">

          <div class="weui-media-box weui-media-box_appmsg" v-for="(it,idx) in item.productList" :accesskey="idx" hover-class="weui-cell_active">
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" :src="it.picUrl" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title_custom">{{it.name}}</div>
              <div class="weui-media-box__desc">数量：{{it.count}}&#12288; <span>￥{{it.price}}元</span></div>
            </div>
          </div>


          <div class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="display: none;">
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" src="http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title_custom">标题二</div>
              <div class="weui-media-box__desc"><!--剩余库存：1222-->&#12288; <span>￥500</span></div>
            </div>
          </div>


        </div>
        <div class="weui-panel__ft">
          <div class="weui-cell weui-cell_access weui-cell_link">
            <!-- <div class="weui-cell__bd">查看更多</div>
            <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->
            <span class="total_price">总共{{item.totalCount}}件商品，总计：
              <template v-if="item.payType == 'POINT'">
                <em style="font-size: 32rpx; color: #f00; display: inline-block;">{{item.orderAmount}}积分</em>
              </template>
              <template v-else>
                <em style="font-size: 32rpx; color: #f00; display: inline-block;">￥{{item.orderAmount}}元</em>
              </template>
            </span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="page__bd" style="padding-top: 150rpx; text-align: center;">
        <div class="icon-box">
          <icon type="info" size="93"></icon>
          <div class="icon-box__ctn">
            <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">暂无订单</div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, msToDate } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
    this.getData()
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {

    this.getData();
  },
  data() {
    return {
      list: []
      // banner: [],
      // channel: [],
      // brandList: [],
      // newGoods: [],
      // hotGoods: [],
      // topicList: [],
      // newCategoryList: []
    };
  },
  components: {},
  methods: {
    // ...mapMutations(["update"]),

    ngOnInit() {
      const sorted = this.groupBy(this.list, function (item) {
        return [item.dateStr];
      });
      console.log('sorted,',sorted);

    },

    groupBy(array, f) {
      const groups = {};
      array.forEach(function (o) {
        const group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
      });
      return Object.keys(groups).map(function (group) {
        return groups[group];
      });
    },

    async getData() {

      const data = await post(`/shop/goods/queryOrderList`, {
        "shopId": this.$store.state.userInfo.shopId,
        "currentPageIndex": 1,
        "pageSize": 100000
      })
      if(data.success){
        if(data.result){
          data.result.forEach(item => {
            item.orderTimeStr = msToDate(item.orderTime)
          })
          this.list = data.result
        }else{
          this.list = []
        }

        // this.ngOnInit()
      }


      // const data = await get("/index/index");
      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
    },
    // goodsDetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/goods/main?id=" + id
    //   });
    // },
    // categoryList(id) {
    //   wx.navigateTo({
    //     url: "/pages/categorylist/main?id=" + id
    //   });
    // },
    // goodsList(info) {
    //   if (info == "hot") {
    //     wx.navigateTo({
    //       url: "/pages/newgoods/main?isHot=" + 1
    //     });
    //   } else {
    //     wx.navigateTo({
    //       url: "/pages/newgoods/main?isNew=" + 1
    //     });
    //   }
    // },
    // topicdetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/topicdetail/main?id=" + id
    //   });
    // },
    // totopic() {
    //   wx.navigateTo({
    //     url: "/pages/topic/main"
    //   });
    // },
    // tobrandList() {
    //   wx.navigateTo({
    //     url: "/pages/brandlist/main"
    //   });
    // },
    // branddetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/branddetail/main?id=" + id
    //   });
    // }
  },
  created() {
    // console.log(89128921982189)
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

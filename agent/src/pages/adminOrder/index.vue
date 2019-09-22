<template>
  <div class="order_manage">

    <div class="weui-panel weui-panel_access custom-title">
      <div class="weui-panel__hd">2019-11-20 12:12:34 <span>未付款</span></div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" src="http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title_custom">由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体</div>
            <div class="weui-media-box__desc"><!--剩余库存：10000-->&#12288; <span>￥500</span></div>
          </div>
        </div>
        <div class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
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
          <span class="total_price">总共12件商品，总计：￥500</span>
        </div>
      </div>
    </div>



    <div class="weui-panel weui-panel_access custom-title">
      <div class="weui-panel__hd">2019-11-22 10:52:14 <span>未付款</span></div>
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" src="http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title_custom">由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体</div>
            <div class="weui-media-box__desc"><!--剩余库存：10000-->&#12288; <span>￥14500</span></div>
          </div>
        </div>
        <div class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" src="http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title_custom">标题二由各种物质组成的巨型球状天体由各种物质组成的巨型球</div>
            <div class="weui-media-box__desc"><!--剩余库存：1222-->&#12288; <span>￥5500</span></div>
          </div>
        </div>
      </div>
      <div class="weui-panel__ft">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <!-- <div class="weui-cell__bd">查看更多</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div> -->
          <span class="total_price">总共2件商品，总计：￥24500</span>
        </div>
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

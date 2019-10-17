<template>
  <div class="index" v-if="data">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <block v-for="(item, index) in data.posters" :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.picUrl" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>

    <div class="weui-panel weui-panel_access custom-title">
      <div class="weui-panel__hd">已上架商品</div>
      <div class="weui-panel__bd">
        <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" v-for="(item, index) in data.goodsItems" :key="index">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="item.picUrl" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title_custom">{{item.name}}</div>
            <div class="weui-media-box__desc">剩余库存：{{item.stock}} <span>￥{{item.price}}</span></div>
          </div>
        </navigator>
        <!-- <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" src="http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title_custom">标题二</div>
            <div class="weui-media-box__desc">剩余库存：1222<span>￥500</span></div>
          </div>
        </navigator> -->
      </div>
      <!-- <div class="weui-panel__ft">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">查看更多</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div> -->
    </div>

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
    // this.getData();
    // this.userInfo = wx.getStorageSync("userInfo")
    // console.info(this.userInfo);
    this.getData()
  },
  data() {
    return {
      // userInfo: null,
      data: null,
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
    async getData(){
      // console.info(12891892189)
      const data = post(`/agency/main/getMainPage?agencyId=${this.$store.state.userInfo.agencyId}`).then((data)=>{
        if(data.success){
          this.data = data.result
        }
      });

    },

    // async getData() {
      // const data = await get("/index/index");
      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
    // }
  },
  created() {
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

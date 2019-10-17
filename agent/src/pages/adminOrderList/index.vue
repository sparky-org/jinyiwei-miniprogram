<template>
  <div class="order_list">

    <div class="weui-form-preview">
       <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">订 单 号</div>
          <div class="weui-form-preview__value">1098002122221</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">采购内容</div>
          <div class="weui-form-preview__value">樱桃x12&#12288;马莲花x20&#12288;桃子x101&#12288;樱桃x12&#12288;马莲花x20&#12288;桃子x101&#12288;樱桃x12&#12288;马莲花x20&#12288;桃子x101&#12288;</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">供应商</div>
          <div class="weui-form-preview__value">很长很长的名</div>
        </div>
      </div>
    </div>

    <div class="weui-form-preview">
       <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">订 单 号</div>
          <div class="weui-form-preview__value">1098002122221</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">采购内容</div>
          <div class="weui-form-preview__value">樱桃x12&#12288;樱桃x12&#12288;马莲花x20&#12288;桃子x101&#12288;</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">供应商</div>
          <div class="weui-form-preview__value">很长很长的名字</div>
        </div>
      </div>
    </div>

    <div class="weui-form-preview">
       <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">订 单 号</div>
          <div class="weui-form-preview__value">1098002122221</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">采购内容</div>
          <div class="weui-form-preview__value">樱桃x12</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">供应商</div>
          <div class="weui-form-preview__value">很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字</div>
        </div>
      </div>
    </div>

    <div class="weui-form-preview">
       <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">订 单 号</div>
          <div class="weui-form-preview__value">1098002122221</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">采购内容</div>
          <div class="weui-form-preview__value">马莲花x20&#12288;桃子x101&#12288;</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">供应商</div>
          <div class="weui-form-preview__value">很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字</div>
        </div>
      </div>
    </div>

    <div class="sureBth">
      <button class="weui-btn" type="primary" @click="handleBack">返回</button>
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
    handleBack(){
      wx.switchTab({
        url: '/pages/adminBuy/main'
      })
    },
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
    // console.log(89128921982189)
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

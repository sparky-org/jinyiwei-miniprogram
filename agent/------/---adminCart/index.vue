<template>
  <div class="cart">

    <div class="weui-cells weui-cells_after-title" v-if="checkboxItems.length">
      <checkbox-group @change="checkboxChange">
        <label class="weui-cell weui-check__label" v-for="(item,index) in checkboxItems" :key="index">
          <checkbox class="weui-check" :value="item.value" :checked="item.checked" />
          <div class="weui-cell__hd weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
          </div>
          <image :src="item.image" class="product-img"></image>
          <div class="weui-cell__bd" @click.stop.prevent>
            <div>{{item.name}}</div>
            <div>￥{{item.price}}</div>
            <view class="stepper">
              <text class='minusStatus' type="number" @click="handleChangeNum('reduce', item)">-</text>
              <input type="number" maxlength="5" v-model='item.num' @input="handleOnlyNumber(item)"></input>
              <text @click="handleChangeNum('add', item)">+</text>
            </view>
          </div>
        </label>
      </checkbox-group>
      <!-- <div class="weui-cell weui-cell_link">
        <div class="weui-cell__bd">添加更多</div>
      </div> -->
    </div>
    <div v-else>
      购物车暂无商品
    </div>

    <div class="sureBth">
      <button class="weui-btn" type="primary" @click="handleOrder">确认下单</button>
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
      newCategoryList: [],

      checkboxItems: [
        { name: '由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体', price: 300, num: 1, value: '0', checked: true, image: 'http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg' },
        { name: '的巨型球状天体由各种物质组成的巨型球状天体', price: 500, num: 1, value: '1', checked: false, image: 'http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg' }
      ],
    };
  },
  components: {},
  methods: {
    handleOrder(){
      console.log(wx.navigateTo)
      wx.redirectTo({
        url:'/pages/adminOrderList/main'
      })
    },
    handleOnlyNumber(item){
      let reg1 = /^\d+$/ig,
          reg2 = /\d+/ig;
      if (!reg1.test(item.num)) {
        item.num = item.num.match(reg2) ? item.num.match(reg2)[0] : ''
        // console.info(1212,item.num)
      }
    },
    handleChangeNum(type, item){
      if(type=== 'add'){
        item.num++
      }else{
        item.num--
        if(item.num ===0){
          let index = this.checkboxItems.findIndex(it=>{
            return it.value === item.value
          })
          this.checkboxItems.splice(index,1)
        }
      }
    },
    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
      var checkboxItems = this.checkboxItems;
      var values = e.mp.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].value === values[j]) {
            checkboxItems[i].checked = true;
            break;
          }
        }
      }
      this.checkboxItems = checkboxItems;
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

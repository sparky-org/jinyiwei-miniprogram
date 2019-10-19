<template>
  <div class="cart">


    <div class="weui-cells weui-cells_after-title" id="selectArea" @click="handleHistory">
       <div class="weui-cell weui-cell_access">
          <div>&#12288;&#12288;&#12288;</div>
          <div class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0; position: absolute; right: 20rpx;">
              <div>
                查看订单列表
              </div>
              <!-- <div class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></div> -->
          </div>
      </div>
    </div>

    <div class="weui-cells weui-cells_after-title" v-if="checkboxItems.length">
      <checkbox-group @change="checkboxChange">
        <label class="weui-cell weui-check__label" v-for="(item,index) in checkboxItems" v-if="item.show" :key="index">
          <checkbox class="weui-check" :value="item.value" :checked="item.checked" />
          <div class="weui-cell__hd weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
          </div>
          <image :src="item.picUrl" class="product-img"></image>
          <div class="weui-cell__bd" @click.stop.prevent>
            <div>{{item.goodsName}}</div>
            <div>￥{{item.price}}</div>
            <view class="stepper">
              <text class='minusStatus' type="number" @click="handleChangeNum('reduce', item)">-</text>
              <input type="number" maxlength="5" v-model='item.buyCount' @input="handleOnlyNumber(item)"></input>
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
      <div class="page__bd" style="padding-top: 150rpx; text-align: center;">
        <div class="icon-box">
          <icon type="info" size="93"></icon>
          <div class="icon-box__ctn">
            <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">购物车暂无商品</div>
          </div>
        </div>
      </div>
    </div>

    <div class="sureBth" v-if="checkboxItems.length > 0">
      <button class="weui-btn" type="primary" @click="handleOrder">确认下单</button>
    </div>


  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
    // this.getData();
    let list = wx.getStorageSync('BUYLIST')
    // console.info(list.length, 'typeof list')
    if(list){
      list.forEach(item => {
        item.checked = false
        item.value = String(item.goodsId)
        item.show = true
      })
      this.checkboxItems = list
    }
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {

  },
  data() {
    return {
      // banner: [],
      // channel: [],
      // brandList: [],
      // newGoods: [],
      // hotGoods: [],
      // topicList: [],
      // newCategoryList: [],
      totalLen: 0,
      successCount: 0,
      checkboxItems: [
        // {
        //   name: '由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体',
        //   price: 300,
        //   num: 1,
        //   value: '0',
        //   checked: true,
        //   image: 'http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg' ,
        // },
        // { name: '的巨型球状天体由各种物质组成的巨型球状天体', price: 500, num: 1, value: '1', checked: false, image: 'http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg' }
      ],
    };
  },
  watch: {
    successCount(val){
      if( val == this.totalLen){
        wx.showToast({
          title: '下单成功',
          icon: 'success',
          duration: 2000,
          success(){

          }
        })
        this.successCount = 0
        this.checkboxItems.forEach((item, index) => {
          console.info(item,index)
          if(item.checked){
            item.show = false
            // this.checkboxItems.splice(index,1)
          }
        })
        let result = this.checkboxItems.filter(item => {
          return item.show
        })
        this.checkboxItems = result
        wx.setStorageSync('BUYLIST', result);

      }
    }
  },
  components: {},
  methods: {
    handleHistory(){
      wx.navigateTo({
        url:'/pages/adminOrderList/main'
      })
    },
    async handleOrder(){
      let orderList = this.checkboxItems.filter(item => {
        return item.checked
      })
      console.info(1, orderList)
      // let orderLen = orderList.length
      let resultArr = []
      // list = [
      //   {"name": "John", "Average": 15, "High": 10, "DtmStamp": 1358226000000},
      //   {"name": "Jane", "Average": 16, "High": 92, "DtmStamp": 1358226000000},
      //   {"name": "Jane", "Average": 17, "High": 45, "DtmStamp": 1358226000000},
      //   {"name": "John", "Average": 18, "High": 87, "DtmStamp": 1358226000000},
      //   {"name": "Jane", "Average": 15, "High": 10, "DtmStamp": 1358226060000},
      //   {"name": "John", "Average": 16, "High": 87, "DtmStamp": 1358226060000},
      //   {"name": "John", "Average": 17, "High": 45, "DtmStamp": 1358226060000},
      //   {"name": "Jane", "Average": 18, "High": 92, "DtmStamp": 1358226060000}
      // ];
      function ngOnInit() {
        const sorted = groupBy(orderList, function (item) {
          return [item.agencyId];
        });
        resultArr = sorted
      }

      function groupBy(array, f) {
        const groups = {};
        array.forEach(function (o) {
          const group = JSON.stringify(f(o));
          groups[group] = groups[group] || [];
          groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
          return groups[group];
        });
      }

      ngOnInit()

      console.info(2, resultArr)
      this.totalLen = resultArr.length

      resultArr.forEach(async item => {
        let param = item.map(it => {
          return {
            goodsId: it.goodsId,
            goodsNum: it.buyCount
          }
        })
        console.info(param)

        const data = await post(`/shop/createPurchaseOrder`, {
          "agencyId": item[0].agencyId,
          "goodsItems": param,
          "shopEmpId": this.$store.state.userInfo.employId,
          "shopId": this.$store.state.userInfo.shopId
        })
        if(data.success){
          console.info(12122101091290)
          this.successCount++
        }

        console.info(data)
      });


      // console.info(successCount , resultArr.length,'successCount == resultArr.length')
      // if(successCount == resultArr.length){
      //   setTimeout(()=>{
      //     wx.showToast({
      //       title: '下单成功',
      //       icon: 'success',
      //       duration: 2000,
      //       success(){

      //       }
      //     })
      //   },1000)
      // }



      // console.info(data)
      // wx.redirectTo({
      //   url:'/pages/adminOrderList/main'
      // })
    },
    handleOnlyNumber(item){
      let reg1 = /^\d+$/ig,
          reg2 = /\d+/ig;
      if (!reg1.test(item.num)) {
        item.num = item.num.match(reg2) ? item.num.match(reg2)[0] : ''
        console.info(1212,item.num)
      }
    },
    handleChangeNum(type, item){
      if(type=== 'add'){
        item.buyCount++
      }else{
        item.buyCount--
        if(item.buyCount ===0){
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
    // ...mapMutations(["update"]),

    async getData() {
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

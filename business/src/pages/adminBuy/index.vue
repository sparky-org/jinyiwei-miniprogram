<template>
  <div class="buy">

     <!-- <div class="weui-form-preview">
       <div class="weui-form-preview__hd">
         <div class="weui-form-preview__label">

         </div>
       </div>
     </div> -->
     <!-- {{height}} -->
     <!-- <div id="selectAAA" style="height: 116px;"></div> -->
     <!-- {{agentName}} -->
    <div class="weui-cells weui-cells_after-title" id="selectArea">
       <picker @change="bindPickerChange" :value="index" :range="array">
         <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd">请选择代理商</div>
            <div class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0">
                <div style="display: inline-block;vertical-align:middle; font-size: 17px;">
                  {{agentName}} &#12288;
                </div>
                <!-- <div class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></div> -->
            </div>
        </div>
      </picker>
    </div>
    <div class="weui-cell weui-cell_access" style="padding: 0 30px; height: 30px; line-height: 30px;" @click="handleHistory">
        <div>&#12288;&#12288;&#12288;</div>
        <div class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0; position: absolute; right: 20rpx;">
            <div>
              查看订单列表
            </div>
            <!-- <div class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></div> -->
        </div>
    </div>

    <!-- {{height}} {{selectAreaHeight}} {{height-selectAreaHeight}} -->
    <!-- {{index}} -->
    <scroll-view scroll-y="true" :style="{'height':height-selectAreaHeight-30+'px'}">
    <!-- {{productList.length}} -->
      <div v-if="productList.length > 0" class="weui-panel weui-panel_access custom-title" v-for="(item, index) in productList" :key="index">
        <!-- <div class="weui-panel__hd">今日上新</div> -->
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" :src="item.picUrl" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title_custom">{{item.goodsName}}</div>
              <div class="weui-media-box__desc">
                <span>￥{{item.price}}</span>
                <span>
                  <!-- ￥500 -->
                </span>
                <span>
                  <button type="default" size="mini" @click.prevent.stop="handleBuy(item)">立即购买</button>
                </span>
              </div>
            </div>
          </div>
          <!-- <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" src="http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title_custom">成的巨型球状天体由各种物质组成的巨型球状天体由</div>
              <div class="weui-media-box__desc"><span>￥500</span><span>￥500</span><span><button <button type="default" size="mini">立即购买</button></span></div>
            </div>
          </navigator> -->
        </div>
      </div>


      <div v-if="productList.length==0">
        <div class="page__bd" style="padding-top: 150rpx; text-align: center;">
          <div class="icon-box">
            <icon type="info" size="93"></icon>
            <div class="icon-box__ctn">
              <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">暂无商品</div>
            </div>
          </div>
        </div>
      </div>



      <!-- <div class="weui-panel weui-panel_access custom-title">
        <div class="weui-panel__hd">1月29日上新</div>
        <div class="weui-panel__bd">
          <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" src="http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title_custom">由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体</div>
              <div class="weui-media-box__desc"><span>￥500</span><span>￥500</span><span><button <button type="default" size="mini">立即购买</button></span></div>
            </div>
          </navigator>
          <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" src="http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title_custom">成的巨型球状天体由各种物质组成的巨型球状天体由</div>
              <div class="weui-media-box__desc"><span>￥500</span><span>￥500</span><span><button <button type="default" size="mini">立即购买</button></span></div>
            </div>
          </navigator>
        </div>
        <div class="weui-panel__ft">
          <div class="weui-cell weui-cell_access weui-cell_link">
            <div class="weui-cell__bd">查看更多</div>
            <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </div>
        </div>
      </div> -->

    <!-- <div class="weui-panel weui-panel_access custom-title">
      <div class="weui-panel__hd">1月28日上新</div>
      <div class="weui-panel__bd">
        <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" src="http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title_custom">由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体由各种物质组成的巨型球状天体</div>
            <div class="weui-media-box__desc"><span>￥500</span><span>￥500</span><span><button <button type="default" size="mini">立即购买</button></span></div>
          </div>
        </navigator>
        <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" src="http://a.hiphotos.baidu.com/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title_custom">成的巨型球状天体由各种物质组成的巨型球状天体由</div>
            <div class="weui-media-box__desc"><span>￥500</span><span>￥12500</span><span><button <button type="default" size="mini">立即购买</button></span></div>
          </div>
        </navigator>
      </div>
      <div class="weui-panel__ft">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">查看更多</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
    </div> -->


     </scroll-view>

  </div>


</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
    this.buyList = []
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#selectArea').boundingClientRect( (rect) => {
      console.log('rect.height',rect.height)
      this.selectAreaHeight = rect.height
    }).exec();

    this.getData();
  },
  data() {
    return {
      productList: [],
      agentList: [],
      // array: ['美国', '中国', '巴西', '日本'],
      array: [],
      index: 0,
      agencyId: '',
      agentName: '',
      height: wx.getSystemInfoSync().windowHeight,
      selectAreaHeight: 0,
      buyList: []
      // width: wx.getSystemInfoSync().windowWidth
      // banner: [],
      // channel: [],
      // brandList: [],
      // newGoods: [],
      // hotGoods: [],
      // topicList: [],
      // newCategoryList: []
    };
  },
  watch: {
    index(val){
      console.info(val)
      let item = this.agentList.find((item, index) => {
        return index == val
      })
      this.agencyId = item.agencyId
      this.agentName = item.agencyName
      this.getList()
    }
  },
  components: {},
  methods: {
    // handleHistory(){
    //   wx.navigateTo({
    //     url:'/pages/adminOrderList/main'
    //   })
    // },
    handleHistory(){
      wx.navigateTo({
        url:'/pages/adminOrderList/main?agencyId=' + this.agencyId
      })
    },
    bindPickerChange(e) {
      // console.info('e', e)
      this.index = e.mp.detail.value
      // this.agentName = this.array[e.mp.detail.value]
      // console.info(this.agentName,909090900099)
      console.log('选中的值为：' + this.array[e.mp.detail.value]);
    },
    // ...mapMutations(["update"]),

    handleBuy(item){
       console.info("item",item)
       wx.showToast({
         title: '操作成功',
         icon: 'success',
         duration: 1000,
         success(){

         }
       })

       if(this.buyList.length == 0){
          this.buyList.push(item)
       }else{
          let hasItem = this.buyList.find(it => {
            // console.info('it', it ,item)
            return ((it.agencyId == item.agencyId) && (item.goodsId == it.goodsId))
            // if(it.agencyId == item.agencyId && item.goodsId == it.goodsId){
            //   it.buyCount++
            // }
          })
          if(hasItem){
            hasItem.buyCount++
          }else{
            this.buyList.push(item)
          }
       }
       wx.setStorageSync('BUYLIST', this.buyList);
       console.info(this.buyList)
    },


    async getData() {
      const data = await post(`/shop/getRelatedAgency`, this.$store.state.userInfo.shopId)
      console.info(data)
      if(data.success){
        this.agentList = data.result ? data.result : []
        this.array = this.agentList.map(item => {
          return item.agencyName
        })
        this.agencyId = this.agentList[0].agencyId
        this.agentName = this.agentList[0].agencyName
        this.getList()
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
    async getList(){
      const data = await post(`/agency/goods/queryGoodsList?agencyId=${this.agencyId}`)
      console.info('getList', data)
      if(data.success){
        if(data.result){
          data.result.forEach(item => {
            item.buyCount = 1
            item.agencyId = this.agencyId
          })
          this.productList = data.result
        }else{
          this.productList = []
        }
      }
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

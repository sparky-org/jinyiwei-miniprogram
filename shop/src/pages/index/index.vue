<template>
  <div class="index">

    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
        <!-- <block v-for="(item, index) in data.posters" :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.picUrl" class="slide-image" />
          </swiper-item>
        </block> -->
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="http://118.25.104.232/jyw-resource/18/50/18509052e68889168422e7f387e654f9" class="slide-image" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="http://118.25.104.232/jyw-resource/c6/6f/c66f8ec914539d73c5eb277bd4f8d244" class="slide-image" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="http://118.25.104.232/jyw-resource/49/41/49415a3a3a17d035b824e3065384196c" class="slide-image" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="http://118.25.104.232/jyw-resource/fc/04/fc04606a2b0fc629b85ee67f62f68058" class="slide-image" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="http://118.25.104.232/jyw-resource/d3/1c/d31cab8413663bfdd16db8e312213e4c" class="slide-image" />
        </swiper-item>
        <swiper-item class="swiper-item">
          <image style="width: 100%; height: 100%;" src="http://118.25.104.232/jyw-resource/6b/e9/6be953c24858a3c2d787d57e6b77be1f" class="slide-image" />
        </swiper-item>
      </swiper>
    </div>

    <div class="weui-cells__title">营业动态</div>
    <div class="weui-cells weui-cells_after-title">
      <navigator url="/pages/my-appointment/main?date=2019-11-15" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="padding: 0;">
        <div class="weui-cell" style="width: 100%;">
          <div class="weui-cell__bd">今日预约客户</div>
          <div class="weui-cell__ft" style="float: right;">36人</div>
        </div>
      </navigator>
      <navigator url="/pages/my-application/main?applyType=SALES_PERF&date=2019-11-15" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="padding: 0;">
        <div class="weui-cell" style="width: 100%;">
          <div class="weui-cell__bd">今日业绩</div>
          <div class="weui-cell__ft" style="float: right;">24个</div>
        </div>
      </navigator>
      <navigator url="/pages/my-application/main?applyType=SERVICE_ITEM&date=2019-11-15" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="padding: 0;">
        <div class="weui-cell" style="width: 100%;">
          <div class="weui-cell__bd">今日项目数量</div>
          <div class="weui-cell__ft" style="float: right;">10个</div>
        </div>
      </navigator>
      <navigator url="/pages/my-application/main?applyType=VACATION&date=2019-11-15" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" style="padding: 0;">
        <div class="weui-cell" style="width: 100%;">
          <div class="weui-cell__bd">今日休息员工</div>
          <div class="weui-cell__ft" style="float: right;">2人</div>
        </div>
      </navigator>
    </div>


    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">今日积分排名</div>
      <div class="weui-panel__bd">
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="placeholder">
              <dl class="ph-dl">
                <dt>1</dt>
                <dd>排名</dd>
              </dl>
            </div>
          </div>
          <div class="weui-flex__item">
            <div class="placeholder">
              <dl class="ph-dl">
                <dt>200</dt>
                <dd>今日积分</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-panel__ft">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd" style="color: #10AEFF;">方竹兵夺得今日排行榜冠军</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
    </div>



    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">积分动态</div>
      <div class="weui-panel__bd">
        <navigator url="/pages/task/main" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <!-- <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="icon60" />
          </div> -->
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">方竹兵 <span class="score-num">+20分</span></div>
            <div class="weui-media-box__desc">
              招聘任务完成奖励<br>2019-11-11 11:12:23
            </div>
          </div>
        </navigator>
        <!--注意这个跳转方式  switchTab方式-->
        <navigator url="/pages/task/main" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <!-- <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="icon60" />
          </div> -->
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">曹丹 <span class="score-num">+20分</span></div>
            <div class="weui-media-box__desc">
              打扫卫生奖励<br>2019-11-11 10:10:16
            </div>
          </div>
        </navigator>
        <navigator url="/pages/task/main" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <!-- <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="icon60" />
          </div> -->
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">胡燕群 <span class="score-num">+3分</span></div>
            <div class="weui-media-box__desc">
              考勤正常打卡<br>2019-11-11 09:10:16
            </div>
          </div>
        </navigator>
        <navigator url="/pages/task/main" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <!-- <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="icon60" />
          </div> -->
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">谭新梅 <span class="score-num">+3分</span></div>
            <div class="weui-media-box__desc">
              获得品德积分奖励<br>2019-11-11 09:10:16
            </div>
          </div>
        </navigator>
        <navigator url="/pages/task/main" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
          <!-- <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb" :src="icon60" />
          </div> -->
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <div class="weui-media-box__title">许竹君 <span class="score-num">+20分</span></div>
            <div class="weui-media-box__desc">
              提交工作日志<br>2019-11-11 09:10:16
            </div>
          </div>
        </navigator>
      </div>
      <div class="weui-panel__ft">
        <div class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd">上拉查看更多</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </div>
    </div>




   <!-- <div v-if="!data.goodsItems">
      <div class="page__bd" style="padding-top: 50rpx; text-align: center;">
        <div class="icon-box">
          <icon type="info" size="50"></icon>
          <div class="icon-box__ctn">
            <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 14px;">暂无上架商品</div>
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {

    // 判断是否登录
    // let userInfo = wx.getStorageSync("userInfo")
    // if(!userInfo){
    //   wx.reLaunch({
    //     url: '/pages/login/main'
    //   })
    //   return
    // }else{
    //   wx.setStorageSync("userInfo", userInfo);
    //   this.$store.commit('setUserInfo', userInfo)
    // }








    // this.$store.commit('setUserInfo',userInfo)
    // if( userInfo.role == "EMPLOY"){
    //   wx.reLaunch({
    //     url: '/pages/staffIndex/main'
    //   })
    // }
    // if( userInfo.role == "SADMIN"){
    //   wx.switchTab({
    //     url: '/pages/adminIndex/main'
    //   })
    // }
    // if( userInfo.role == "ADMIN"){
    //   wx.switchTab({
    //     url: '/pages/adminIndex/main'
    //   })
    // }

    this.getData()
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    // this.getData()
  },
  data() {
    return {
      // userInfo: null,
      data:null,
      brandList: [
        {url:'http://118.25.104.232/jyw-resource/18/50/18509052e68889168422e7f387e654f9'},
        {url:'http://118.25.104.232/jyw-resource/c6/6f/c66f8ec914539d73c5eb277bd4f8d244'},
        {url:'http://118.25.104.232/jyw-resource/49/41/49415a3a3a17d035b824e3065384196c'},
        {url:'http://118.25.104.232/jyw-resource/fc/04/fc04606a2b0fc629b85ee67f62f68058'},
        {url:'http://118.25.104.232/jyw-resource/d3/1c/d31cab8413663bfdd16db8e312213e4c'},
        {url:'http://118.25.104.232/jyw-resource/6b/e9/6be953c24858a3c2d787d57e6b77be1f'}
      ]
      // channel: [],
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
      // console.info(`/agency/main/getMainPage?agencyId=${this.$store.state.userInfo.agencyId}`)
      // const data = post(`/agency/main/getMainPage?agencyId=${this.$store.state.userInfo.agencyId}`).then((data)=>{
      //   if(data.success){
      //     this.data = data.result
      //   }
      // });

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

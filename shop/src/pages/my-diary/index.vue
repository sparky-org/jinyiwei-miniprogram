<template>
  <div class="page">
    <div class="weui-tab">
      <div class="weui-navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
            <div class="weui-navbar__title">{{item}}</div>
          </div>
        </block>
        <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
      </div>
      <div class="weui-tab__panel">
        <div class="weui-tab__content" :hidden="activeIndex != 0">
          <!-- 选项一的内容 -->
          <div class="diary-content" v-for="(item, index) in items">

            <div>
              <div class="weui-cells weui-cells_after-title no-t-b">
                <div class="weui-cell">
                  <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                    <!--<image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg" style="width: 50px; height: 50px; display: block"/>-->
                    <image :src="item.picIcon" style="width: 50px; height: 50px; display: block"/>
                    <!-- <div class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">8</div> -->
                  </div>
                  <div class="weui-cell__bd">
                    <div>{{item.name}}</div>
                    <div style="font-size: 13px;color: #888888;">店长</div>
                  </div>
                </div>
              </div>
              <div class="weui-form-preview">
                <div class="weui-form-preview__bd">
                  <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">奖励积分</div>
                    <div class="weui-form-preview__value tl">{{item.point}}分</div>
                  </div>
                  <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">汇报人</div>
                    <div class="weui-form-preview__value tl">{{item.reportTo}}</div>
                  </div>
                  <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">汇报时间</div>
                    <div class="weui-form-preview__value tl">2019-10-11</div>
                  </div>
                  <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">今日总结</div>
                    <div class="weui-form-preview__value tl">{{item.today}}</div>
                  </div>
                  <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">明日计划</div>
                    <div class="weui-form-preview__value tl">{{item.tomorrow}}</div>
                  </div>
                </div>
              </div>
            </div>



            <div>
              <div class="weui-cells weui-cells_after-title no-t-b">
                <div class="weui-cell">
                  <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                    <image src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg" style="width: 50px; height: 50px; display: block"/>
                    <!-- <div class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">8</div> -->
                  </div>
                  <div class="weui-cell__bd">
                    <div>张无忌</div>
                    <div style="font-size: 13px;color: #888888;">店长</div>
                  </div>
                </div>
              </div>
              <div class="weui-form-preview">
                <div class="weui-form-preview__bd">
                  <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">奖励积分</div>
                    <div class="weui-form-preview__value tl">3分</div>
                  </div>
                  <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">汇报人</div>
                    <div class="weui-form-preview__value tl">法海</div>
                  </div>
                  <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">汇报时间</div>
                    <div class="weui-form-preview__value tl">2019-10-11</div>
                  </div>
                  <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">今日总结</div>
                    <div class="weui-form-preview__value tl">很长的名字很长很长的名字很长很长的名字</div>
                  </div>
                  <div class="weui-form-preview__item">
                    <div class="weui-form-preview__label">明日计划</div>
                    <div class="weui-form-preview__value tl">很长的名字很长很长的名字很长很长的名字</div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 1">
          <!-- 选项二的内容 -->
          2
        </div>

      </div>
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleAdd">添加日志</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',
      // index: 1,
      // enumArea,
      // enumScore,
      // area: enumArea[0],
      // score: enumScore[0],
      // startDate: '',
      // endDate: ''

      tabs: ['我发出的', '我收到的'],
      activeIndex: 0,
      touch: null,
      items: [{
        picIcon:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3702470579,1489904025&fm=26&gp=0.jpg',
        name:'曹丹',
        point:10,
        reportTo:'方竹兵',
        today:'今日总结\r\n' +
          '1.今天服务4个客户、成交1人、业绩3980、项目数6\r\n' +
          '️张晨：今天来给他做了胸、给他讲了我们年终胸部活动方案5980、她还剩5次、她就说做完再说、她就觉得有点贵了、最近花的钱比较多、压力比较大、过段时间早上、也和他说了就趁活动买、省钱、她依旧考虑、下次继续说\r\n' +
          '️王燕姐：今天做了背和脸、刚消费了、做服务、认可了背部效果、没那么硬、面部也没那么看了、今天聊天很愉快\r\n' +
          '️陈丽娟：今天做了脸、她皮肤比较松、皱纹也深、所以抓住他这两个需求、给他讲了延生肽年终活动、和店长配合下、一唱一和、开始没有把方案里的东西全送完、一次次要优惠、最后成交了3980\r\n' +
          '️丽姐：她今天比较累、主要做服务',
        tomorrow:'明日计划：\r\n' +
          '1.服务3个顾客\r\n' +
          '️珍珍：讲3980面部、需要店长配合\r\n' +
          '️王玲：做服务、认可面部效果\r\n' +
          '️廖云霞：讲3980面部、需要店长配合\r\n' +
          '2.学习目标：\r\n' +
          '️上午11点空、学习面部专业\r\n' +
          '️下午3点练因肤定制手法'
      }]
    };
  },

  mounted() {
    // this.touch = new Touch()
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex === 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex === 1) {
        return 'weui-navbar__slider_1'
      }
      // if (this.activeIndex === 2) {
      //   return 'weui-navbar__slider_2'
      // }
    }
  },
  methods: {

    // handleEditTask(){
    //   wx.navigateTo({
    //     url: "/pages/my-task-operate/main?id=2&type=edit"
    //   });
    // },

    tabClick(e) {
      console.log(e);
      this.activeIndex = Number(e.currentTarget.id);
    },
    handleAdd(id){
      wx.navigateTo({
        url: "/pages/my-diary-add/main"
      });
    }



    // handleAreaSelect(){
    //   wx.showActionSheet({
    //     itemList: enumArea,
    //     success: (res) => {
    //       console.log(res.tapIndex)
    //       this.area = enumArea[res.tapIndex]
    //     }
    //   });
    // },
    // handleScorSelect(){
    //   wx.showActionSheet({
    //     itemList: scoreArea,
    //     success: (res) => {
    //       console.log(res.tapIndex)
    //       this.score = scoreArea[res.tapIndex]
    //     }
    //   });
    // }

    // async getData() {
    //   const data = await get("/index/index");
    //   this.banner = data.banner;
    //   this.channel = data.channel;
    //   this.brandList = data.brandList;
    //   this.newGoods = data.newGoods;
    //   this.hotGoods = data.hotGoods;
    //   this.topicList = data.topicList;
    //   this.newCategoryList = data.newCategoryList;
    // },
    // goodsDetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/goods/main?id=" + id
    //   });
    // }
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  .weui-navbar__slider_0{
    left: 0!important;
    width: 50%!important;
    transition: transform 0s!important;
  }
  .weui-navbar__slider_1{
    left: 50%!important;
    width:50%!important;
    transition: transform 0s!important;
  }
  /* .weui-navbar__slider_2{
    left: 66.666666666666%!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  } */
  @import "./style.scss";
</style>

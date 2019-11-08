<template>
  <div class="page">


    <div class="tab-wrapper">
      <div class="weui-flex tab-fixed">
        <div class="weui-flex__item">
          <picker class="weui-btn" mode="date" :value="startDate" @change="bindStartDateChange">
            <div class="tab-title" style="font-size: 13px;">{{startDate?startDate:'开始日期'}}<ins></ins></div>
          </picker>
        </div>
        <div class="weui-flex__item">
          <picker class="weui-btn" mode="date" :value="endDate" @change="bindEndDateChange">
            <div class="tab-title"  style="font-size: 13px;">{{endDate?endDate:'结束日期'}}<ins></ins></div>
          </picker>
        </div>
        <div class="weui-flex__item">
          <picker @change="bindPickerChange" :value="index" :range="enumArea">
            <div class="tab-title">{{area}}<ins></ins></div>
          </picker>
        </div>
        <div class="weui-flex__item">
          <!-- <div class="tab-title" @click="handleScorSelect">{{score}}<ins></ins></div> -->
          <picker @change="bindScoreChange" :value="index" :range="enumScore">
            <div class="tab-title">{{score}}<ins></ins></div>
          </picker>
        </div>
      </div>
    </div>


    <div class="content">

      <div class="weui-form-preview">
        <!-- <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">付款金额</div>
            <div class="weui-form-preview__value_in-hd">¥2400.00</div>
          </div>
        </div> -->
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">任务名称</div>
            <div class="weui-form-preview__value">打扫卫生</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">任务内容</div>
            <div class="weui-form-preview__value">上午10点前把办公室区域的卫生打扫干净，很长的描述很长的描述很长的描述很长的描述</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">创建时间</div>
            <div class="weui-form-preview__value">2019-10-11 18:12:23</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">任务积分</div>
            <div class="weui-form-preview__value">20积分</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">剩余个数</div>
            <div class="weui-form-preview__value">无限制</div>
          </div>
        </div>
        <div>
          <div class="weui-flex">
            <div class="weui-flex__item" style="padding: 20rpx;">
              <button class="weui-btn" type="warn" plain="true">删除</button>
            </div>
            <div class="weui-flex__item" style="padding: 20rpx;">
              <button class="weui-btn" type="primary" plain="true" @click="handleEditTask">修改</button>
            </div>
          </div>
        </div>
      </div>


      <div class="weui-form-preview">
        <!-- <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">付款金额</div>
            <div class="weui-form-preview__value_in-hd">¥2400.00</div>
          </div>
        </div> -->
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">任务名称</div>
            <div class="weui-form-preview__value">打扫卫生</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">任务内容</div>
            <div class="weui-form-preview__value">上午10点前把办公室区域的卫生打扫干净，很长的描述很长的描述很长的描述很长的描述</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">创建时间</div>
            <div class="weui-form-preview__value">2019-10-11 18:12:23</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">任务积分</div>
            <div class="weui-form-preview__value">20积分</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">剩余个数</div>
            <div class="weui-form-preview__value">无限制</div>
          </div>
        </div>
        <div>
          <div class="weui-flex">
            <div class="weui-flex__item" style="padding: 20rpx;">
              <button class="weui-btn" type="warn" plain="true">删除</button>
            </div>
            <div class="weui-flex__item" style="padding: 20rpx;">
              <button class="weui-btn" type="primary" plain="true">修改</button>
            </div>
          </div>
        </div>
      </div>



      <div class="weui-form-preview">
        <!-- <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">付款金额</div>
            <div class="weui-form-preview__value_in-hd">¥2400.00</div>
          </div>
        </div> -->
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">任务名称</div>
            <div class="weui-form-preview__value">打扫卫生</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">任务内容</div>
            <div class="weui-form-preview__value">上午10点前把办公室区域的卫生打扫干净，很长的描述很长的描述很长的描述很长的描述</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">创建时间</div>
            <div class="weui-form-preview__value">2019-10-11 18:12:23</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">任务积分</div>
            <div class="weui-form-preview__value">20积分</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">剩余个数</div>
            <div class="weui-form-preview__value">无限制</div>
          </div>
        </div>
        <div>
          <div class="weui-flex">
            <div class="weui-flex__item" style="padding: 20rpx;">
              <button class="weui-btn" type="warn" plain="true">删除</button>
            </div>
            <div class="weui-flex__item" style="padding: 20rpx;">
              <button class="weui-btn" type="primary" plain="true">修改</button>
            </div>
          </div>
        </div>
      </div>





    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";

let enumArea = ['可见范围','店长','店长','顾问'];
let enumScore = ['积分范围','<=50', '<100','>100']
export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',
      index: 1,
      enumArea,
      enumScore,
      area: enumArea[0],
      score: enumScore[0],
      startDate: '',
      endDate: ''
    };
  },

  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {

    handleEditTask(){
      wx.navigateTo({ 
        url: "/pages/my-task-operate/main?id=2&type=edit"
      });
    },

    bindStartDateChange(e) {
      this.startDate = e.mp.detail.value;
    },
    bindEndDateChange(e) {
      this.endDate = e.mp.detail.value;
    },

    bindPickerChange(e) {
      this.area = this.enumArea[e.mp.detail.value];
    },

    bindScoreChange(e) {
      this.score = this.enumScore[e.mp.detail.value];
    },



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
@import "./style.scss";
</style>

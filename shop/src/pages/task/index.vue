<template>
  <div class="task">
    <div class="weui-flex tab-wrapper">
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==1}" @click="handelTabClick(1)">工作积分<em></em></div>
      </div>
      <div class="weui-flex__item">
        <div class="tab-title" :class="{current: index==2}" @click="handelTabClick(2)">品德积分<em></em></div>
      </div>
      <div class="weui-flex__item">
        <div class="tab-title" @click="handleStateSelect">{{title}}<ins></ins></div>
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
        <div class="weui-form-preview__ft">
          <button class="weui-btn" type="primary" disabled="true">已奖励</button>
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
        <div class="weui-form-preview__ft">
          <button class="weui-btn" type="default" disabled="true">审核中</button>
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
        <div class="weui-form-preview__ft">
          <button class="weui-btn" type="primary">完 成</button>
        </div>
      </div>





    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";

let enumTaskState = ['任务状态','进行中','审核中','已奖励'];
export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',
      index: 1,
      title: enumTaskState[0]
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
    handelTabClick(index){
      this.index = index
    },
    handleStateSelect(){
      wx.showActionSheet({
        itemList: enumTaskState,
        success: (res) => {
          console.log(res.tapIndex)
          this.title = enumTaskState[res.tapIndex]
        }
      });
    }

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

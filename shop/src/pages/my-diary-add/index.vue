<template>
  <div class="page">

    <div class="weui-cells__title">今日工作总结</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="" placeholder="请输入今日工作总结" style="height: 9.9em; width: 100%;" />
          <!-- <div class="weui-textarea-counter">0/200</div> -->
        </div>
      </div>
    </div>


    <div class="weui-cells__title">明日工作计划</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="" placeholder="请输入明日工作计划" style="height: 9.9em; width: 100%;" />
          <!-- <div class="weui-textarea-counter">0/200</div> -->
        </div>
      </div>
    </div>


    <div class="weui-cells weui-cells_after-title no-t">
      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>汇报给谁</div>
        </div>
        <div class="weui-cell__bd">
          <picker @change="bindPickerChange" :value="position" :range="array">
            <input class="weui-input" placeholder="请选择" />
          </picker>
        </div>
      </div>
    </div>


    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleAdd">添加</button>
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

      position: '',
      array: ['店长', '美容顾问', '员工']
    };
  },

  mounted() {
    // this.touch = new Touch()
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {

    // handleEditTask(){
    //   wx.navigateTo({
    //     url: "/pages/my-task-operate/main?id=2&type=edit"
    //   });
    // },


    handleAdd(id){
      // wx.navigateTo({
      //   url: "/pages/my-diary-add/main"
      // });
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
  @import "./style.scss";
</style>

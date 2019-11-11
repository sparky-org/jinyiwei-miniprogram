<template>
  <div class="page">
    <!-- <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">错误提示</div> -->
    <div class="weui-cells weui-cells_after-title">

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>员工姓名</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入员工姓名" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input weui-cell_vcode" style="padding: 20rpx 30rpx;">
        <div class="weui-cell__hd">
          <div class="weui-label">性&#12288;&#12288;别</div>
        </div>
        <div class="weui-cell__bd">
            <radio-group @change="radioChange">
              <label class="weui-check__label" style="width: 50px; display: inline-block;" v-for="(item,index) in radioItems" :key="index">
                <radio class="weui-check" :value="item.value" :checked="item.checked" />
                <span>{{item.name}}</span>
                <span v-if="item.checked">
                  <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
                </span>
              </label>
            </radio-group>
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>年龄</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入员工年龄" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>出生日期</div>
        </div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" :value="bath"  @change="bindDateChange">
            <input class="weui-input" placeholder="请选择员工出生日期" />
          </picker>
        </div>
      </div>


      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>手机号码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入员工手机号码" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>岗位</div>
        </div>
        <div class="weui-cell__bd">
          <picker @change="bindPickerChange" :value="position" :range="array">
            <input class="weui-input" placeholder="请选择员工岗位" />
          </picker>
        </div>
      </div>


    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" v-if="id">修改</button>
      <button class="weui-btn" type="primary" v-else>添加</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";

// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {
    this.id = this.$root.$mp.query.id;
    console.info(this.id)
    // console.info(this.id)
    wx.setNavigationBarTitle({
      title: this.id ? '修改员工信息' : '添加员工'
    })
  },
  components: {

  },
  data() {
    return {
      // role: '',
      id: '',
      showTopTips: true,
      radioItems: [
        { name: '男', value: '1', checked: true},
        { name: '女', value: '2' }
      ],
      bath: '',
      position: '',
      array: ['店长', '美容顾问', '员工']
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
    bindPickerChange(e) {
      console.log('选中的值为：' + this.array[e.mp.detail.value]);
    },
    bindDateChange(e) {
      console.log('选中的日期为：' + e.mp.detail.value);
    },
    radioChange(e) {
      console.log('radio发生change事件，携带value值为：' + e.mp.detail.value);
      let radioItems = this.radioItems;
      for (let i = 0; i < radioItems.length; ++i) {
        radioItems[i].checked = radioItems[i].value === e.mp.detail.value;
      }
      this.radioItems = radioItems;
    },

    // handleEditTask(){
    //   wx.navigateTo({
    //     url: "/pages/my-task-operate/main?id=2&type=edit"
    //   });
    // },


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
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
  .weui-navbar__slider_1{
    left: 33.33333333%!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
  .weui-navbar__slider_2{
    left: 66.666666666666%!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
  @import "./style.scss";
</style>

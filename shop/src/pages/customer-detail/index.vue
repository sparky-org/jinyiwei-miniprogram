<template>
  <div class="customer-operate">
    <i class="iconfont iconai-user"></i>
    <i class="iconfont iconbodadianhua"></i>
    <!-- <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">错误提示</div> -->

    <div class="weui-cells weui-cells_after-title">

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>客户姓名</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入客户姓名" />
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

      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>首选联系电话</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入首选联系电话" />
        </div>
      </div>


      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>爱&#12288;&#12288;好</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请添加客户爱好" />
        </div>
        <div class="weui-cell__ft">
           <button class="weui-btn mini-btn add" type="primary" size="mini">添加爱好</button>
        </div>
      </div>
      <div class="weui-cell weui-cell_input weui-cell_vcode" style="border-bottom: 1rpx solid #d9d9d9;">
        <div class="weui-cell__hd">
          <div class="weui-label"></div>
        </div>
        <div class="weui-cell__bd love">
          <span>打篮球</span>
          <span>唱歌</span>
          <span>旅游</span>
          <span>打篮球</span>
          <span>唱歌</span>
          <span>旅游</span>
          <span>打篮球</span>
          <span>唱歌</span>
          <span>旅游</span>
        </div>
      </div>




      <div class="weui-cells__title" style="margin-top: 20px;">备注</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="" placeholder="请输入备注" style="height: 3.3em" />
            <!-- <div class="weui-textarea-counter">0/200</div> -->
          </div>
        </div>
      </div>



      <div class="weui-cells__title" style="margin-top: 20px;">年度规划</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="" placeholder="请输入年度规划" style="height: 3.3em" />
            <!-- <div class="weui-textarea-counter">0/200</div> -->
          </div>
        </div>
      </div>

      <!--完-->

    </div>







    <div class="add-customer">
      <button class="weui-btn" type="primary">添加客户</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
export default {
  onShow() {
  },
  computed: {

  },
  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role)
    // this.getData();
  },
  data() {
    return {
      // role: ''
      showTopTips: true,
      radioItems: [
        { name: '男', value: '1', checked: true},
        { name: '女', value: '2' }
      ],
    };
  },
  components: {},
  methods: {
    radioChange(e) {
      console.log('radio发生change事件，携带value值为：' + e.mp.detail.value);
      let radioItems = this.radioItems;
      for (let i = 0; i < radioItems.length; ++i) {
        radioItems[i].checked = radioItems[i].value === e.mp.detail.value;
      }
      this.radioItems = radioItems;
    },

    // async getData() {
    //   const data = await get("/index/index");
    //   this.banner = data.banner;
    //   this.channel = data.channel;
    //   this.brandList = data.brandList;
    //   this.newGoods = data.newGoods;
    //   this.hotGoods = data.hotGoods;
    //   this.topicList = data.topicList;
    //   this.newCategoryList = data.newCategoryList;
    // }
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

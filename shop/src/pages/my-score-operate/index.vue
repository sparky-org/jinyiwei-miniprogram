<template>
  <div class="page">
    <div class="weui-toptips weui-toptips_warn" v-if="errorTips">请填写完整信息</div>
    <div class="weui-form-preview" style="margin-bottom: 20rpx;">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>积分名称</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="form.pointName" placeholder="请输入名称" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>积分类型</div>
          </div>
          <div class="weui-cell__bd">
            <picker @change="bindPickerChange" :value="index" :range="textList">
              <input class="weui-input" disabled="disabled" :value="textList[index]" placeholder="请选择积分类型" />
            </picker>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>分值</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="form.value" placeholder="请输入分值" />
          </div>
        </div>

        <div class="weui-cells weui-cells_after-title no-t">
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>使用描述</div>
            </div>
            <div class="weui-cell__bd" style="padding: 20rpx 0;">
              <textarea placeholder="请输入使用描述" style="height: 6.6em; width: 100%;" v-model="form.content" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSubmit">确 定</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {
      this.pointConfigNo = this.$root.$mp.query.configNo
      console.log(this.pointConfigNo)
      if (this.pointConfigNo){
          this.getData();
    }
  },
  components: {

  },
  data() {
    return {
        pointConfigNo: 0,
        pointConfig: {},
      errorTips: false,
      enumList: ["CHARACTER","ACTION","DAILY_RECORD","APPOINTMENT","ATTENDANCE"],
      textList: ['品德积分','工作积分','日记奖励','预约客户奖励','按时打卡奖励'],
      // role: '',
      index: 0,
      // value: null,

      form: {
        "content": "",
        // "empNo": '', // this.$store.state.userInfo.shopEmployee.id
        // "pointConfigNo": 0,
        "pointName": '品德积分',
        "pointType": 'CHARACTER',
        "value": ''
      }
    };
  },

  mounted() {
    // this.id = this.$root.$mp.query.id;
    // console.info(this.id)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {

    async handleSubmit(){

      if(!this.form.content || !this.form.value || !this.form.pointType){
        this.errorTips = true
        setTimeout(()=>{
          this.errorTips = false
        },1000)
        return
      }

      let param = {
        ...this.form,
        "empNo": this.$store.state.userInfo.shopEmployee.id
      }
      const data = await post(`/point/createOrModifyPointConfig`,param);
      if(data.success){
        wx.showToast({
          title: this.form.pointConfigNo?'修改成功':'创建成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })
        setTimeout(()=>{
          wx.navigateBack({
            url: '/pages/my-score-rules/main'
          })
        },1000)
      }
    },



    bindPickerChange(e) {
      console.log('选中的值为：' + this.textList[e.mp.detail.value]);
      this.index = e.mp.detail.value
      this.form.pointName = this.textList[this.index]
      this.form.pointType = this.enumList[e.mp.detail.value]

    },


    handleEditTask(id){
      wx.navigateTo({
        url: "/pages/my-score-operate/main?id="+id
      });
    },

    async getData() {
        const data = await post("/point/getPointConfigInfo?pointConfigNo=" + this.pointConfigNo);
        if(data.success){
            this.pointConfig = data.result;
            this.form.content = this.pointConfig.pointDesc
            this.form.value = this.pointConfig.point
            this.form.pointName = this.pointConfig.pointName
            this.form.pointType = this.pointConfig.pointType

            this.index = this.enumList.findIndex(item => {
                return item == this.form.pointType
            })
            // 添加pointConfigNo
            this.form.pointConfigNo = this.pointConfigNo
        }
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

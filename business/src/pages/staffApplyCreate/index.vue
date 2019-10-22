<template>
  <div class=".publish_task_create">
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">类&#12288;&#12288;型</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.applyTypeName" placeholder="请输入类型" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input" v-if="type==1">
        <div class="weui-cell__hd">
          <div class="weui-label">请款金额</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.amount" type="number" placeholder="请输入请款金额" />
        </div>
      </div>
      <!-- <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入手机号" />
        </div>
        <div class="weui-cell__ft">
          <div class="weui-vcode-btn">获取验证码</div>
        </div>
      </div> -->
      <div class="weui-cell weui-cell_input" v-if="type==0">
        <div class="weui-cell__hd">
          <div class="weui-label">开始时间</div>
        </div>
        <div class="weui-cell__bd">
          <!-- <picker mode="date" value="beginDate" start="2015-09-01" end="2017-09-01" @change="bindBeginDateChange"> -->
          <picker mode="date" value="form.begin"  @change="bindBeginDateChange">
            <div class="weui-input">{{form.begin}}</div>
          </picker>
        </div>
      </div>

      <div class="weui-cell weui-cell_input" v-if="type==0">
        <div class="weui-cell__hd">
          <div class="weui-label">结束时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker mode="date" value="form.end" @change="bindEndDateChange">
            <div class="weui-input">{{form.end}}</div>
          </picker>
        </div>
      </div>


      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">{{type==0?'请假事由':'请款事由'}}</div>
        </div>
        <div class="weui-cell__bd" style="padding: 20rpx 0;">
          <textarea class="" v-model="form.reason" placeholder="请输入事由" style="height: 3.8em" />
        </div>
      </div>

      <!-- <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker mode="time" value="time" start="09:01" end="21:01" @change="bindTimeChange">
            <div class="weui-input">{{time}}</div>
          </picker>
        </div>
      </div> -->

    </div>

    <div class="sureBth">
      <button class="weui-btn" type="primary" @click="handleAction">提 交</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
let D = new Date()
let date = D.getFullYear() + '-' + (D.getMonth() + 1) + '-'+ D.getDate()
export default {
  onShow() {
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    this.type = this.$root.$mp.query.type;
    wx.setNavigationBarTitle({
      title: this.type == 0 ? '请假申请' : '请款申请'
    })
    this.getData();
  },
  data() {
    return {
      type: 1,
      // banner: [],
      // time: '09:01',
      // beginDate: '2015-09-01',
      // endDate: '2015-09-01',
      form: {
        "applyTypeName": "",
        "begin": date,
        "end": date,
        "reason": "",
        "amount": ''
      }
    };
  },
  components: {},
  methods: {
    async handleAction(){
      if(this.type == 0){
        if(!this.form.applyTypeName || !this.form.begin || !this.form.end || !this.form.reason){
          wx.showModal({
            content: '请填写信息',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定')
              }
            }
          });
          return
        }

        const data = await post(`/employ/createHolidayApply`, {
          "agencyId": this.$store.state.userInfo.shopId,
          "employId": this.$store.state.userInfo.employId,
          "applyTypeName": this.form.applyTypeName,
          "begin": this.form.begin,
          "end": this.form.end,
          "reason": this.form.reason
        });
        console.info('2311212', data)
        if(data.success){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            success(){

            }
          })
          setTimeout(()=>{
            wx.navigateTo({
              url: '/pages/staffApply/main'
            })
          },2000)
        }
      }else{
        if(!this.form.applyTypeName || !this.form.amount || !this.form.reason){
          wx.showModal({
            content: '请填写信息',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定')
              }
            }
          });
          return
        }

        const data = await post(`/employ/createMoneyApply`, {
          "agencyId": this.$store.state.userInfo.shopId,
          "employId": this.$store.state.userInfo.employId,
          "applyTypeName": this.form.applyTypeName,
          "amount": this.form.amount,
          "reason": this.form.reason
        });
        console.info('2311212', data)
        if(data.success){
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            success(){

            }
          })
          setTimeout(()=>{
            wx.navigateTo({
              url: '/pages/staffApply/main'
            })
          },2000)
        }
      }
    },
    bindBeginDateChange(e) {
      this.form.begin = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    bindEndDateChange(e) {
      this.form.end = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    // bindTimeChange(e) {
    //   this.time = e.mp.detail.value;
    //   console.log(e.mp.detail.value);
    // },
    // ...mapMutations(["update"]),
    async getData() {
      // const data = await get("/index/index");
      // this.banner = data.banner;
    },
    // topicdetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/topicdetail/main?id=" + id
    //   });
    // },
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>

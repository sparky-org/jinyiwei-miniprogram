<template>
  <div class="page">
    <!-- 个人中心
    <div class="weui-cells__title">带说明的列表项</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">标题文字</div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div> -->
    <div class="weui-toptips weui-toptips_warn" v-if="showErrorTips">{{tipsMessage}}</div>

    <div class="weui-cells weui-cells_after-title">


      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">原始密码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.oldPassword" type="password" placeholder="请输入原始密码" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">新密码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.newPassword" type="password" placeholder="请输入新密码" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">确认新密码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.confirmNewPassword" type="password" placeholder="请再次输入新密码" />
        </div>
      </div>

    </div>




    <div class="add-customer">
      <button class="weui-btn" type="primary" @click="handleSetPassword">确认修改</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, queryParams } from "../../utils";
export default {
  onShow() {
    // this.type = this.$root.$mp.query.type;
    // console.info(this.type)
    // wx.setNavigationBarTitle({
    //   title: this.type ? '修改个人信息' : '个人信息'
    // })
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
      tipsMessage: '',
      showErrorTips: false,
      // role: ''
      // type: null,
      form: {
        newPassword: '',
        confirmNewPassword: '',
        oldPassword: ''
      }
    };
  },
  components: {},
  methods: {
    async handleSetPassword() {

      if(!this.form.oldPassword){
        this.tipsMessage = '请输入原始密码'
        this.showErrorTips = true
        setTimeout(()=>{
          this.showErrorTips = false
        },1500)
        return
      }

      if(!this.form.newPassword){
        this.tipsMessage = '请输入新密码'
        this.showErrorTips = true
        setTimeout(()=>{
          this.showErrorTips = false
        },1500)
        return
      }
      if(!this.form.confirmNewPassword){
        this.tipsMessage = '请再次输入新密码'
        this.showErrorTips = true
        setTimeout(()=>{
          this.showErrorTips = false
        },1500)
        return
      }


      if( this.form.newPassword != this.form.confirmNewPassword){
        this.tipsMessage = '两次输入的密码不一致'
        this.showErrorTips = true
        setTimeout(()=>{
          this.showErrorTips = false
        },1500)
        return
      }


      let params = {
        ...this.form,
        empNo: this.$store.state.userInfo.shopEmployee.id
      }
      const data = await post(`/employee/modifyPassword?${queryParams(params)}`);
      if(data.success){
        wx.showToast({
          title: '修改密码成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })
        setTimeout(()=>{
          wx.navigateBack({
            url: '/pages/workBench/main'
          })
        },1000)
      }
    }
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

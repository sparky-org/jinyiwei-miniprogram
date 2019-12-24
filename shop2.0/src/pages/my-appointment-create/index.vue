<template>
  <div class="page">
    <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tipsMessage}}</div>
    <div class="weui-form-preview" style="margin-bottom: 20rpx;" v-if="!selectStaffVisible && !selectCustomerVisible">
      <div class="weui-cells weui-cells_after-title">

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>预约客户</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" disabled="disabled" :value="customerSelectData[0]?customerSelectData[0].name:''" @click="selectCustomerVisible=true" placeholder="请选择客户" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>预约项目</div>
          </div>
          <div class="weui-cell__bd">
            <picker @change="bindPickerChange" :value="index" :range="array">
              <input class="weui-input" disabled="disabled" :value="xmName" placeholder="请输入申报目标" />
            </picker>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>到店日期</div>
          </div>
          <div class="weui-cell__bd">
            <picker class="weui-btn" mode="date" :value="date" @change="bindDateChange">
              <input class="weui-input" placeholder="请选择到店日期" disabled="disabled" v-model="date" />
            </picker>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>到店时间</div>
          </div>
          <div class="weui-cell__bd">
            <picker class="weui-btn" mode="time" :value="time" start="10:00" @change="bindTimeChange">
              <input class="weui-input" placeholder="请选择到店时间" disabled="disabled" v-model="time" />
            </picker>
          </div>
        </div>



        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>接待美容师</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" disabled="disabled" :value="spData[0]?spData[0].name:''" @click="handleApproval" placeholder="请选择接待美容师" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>备注</div>
          </div>
          <div class="weui-cell__bd" style="padding: 20rpx 0;">
            <textarea v-model="remark" placeholder="请输入备注" style="height: 3.3em; width: 100%;" />
          </div>
        </div>

      </div>


    </div>


    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSubmit">确 定</button>
    </div>

    <select-staff :multiple="multiple" :data="selectData" :visible.sync="selectStaffVisible" @getSelectData="getSelectStaff"></select-staff>

    <select-customer :multiple="false" :data="customerSelectData" :visible.sync="selectCustomerVisible" @getSelectData="getSelectCustomer"></select-customer>


  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";

import selectStaff from '@/components/select-staff';
import selectCustomer from '@/components/select-customer';
// import { mapState, mapMutations } from "vuex";


export default {
  onShow() {
    this.name = this.$root.$mp.query.name;
    this.id = this.$root.$mp.query.id;
    console.info('customerNo', this.id, this.name)
    this.customerSelectData = [{
      customerNo: this.id,
      id: this.id,
      value: this.id,
      name: this.name
    }]
  },
  components: {
    selectStaff,
    selectCustomer
  },
  data() {
    return {
      id: null,
      name:'',

      date: '',
      time: '',
      remark: '',

      showTopTips: false,
      tipsMessage:'',
      // sp: null,
      selectStaffVisible: false,
      selectCustomerVisible: false,
      multiple: true,
      selectData: [],
      spData: [],
      customerSelectData:[],

      array: [],
      xmList: [],
      xmName: '',
      xmId: '',
      index: 0
    };
  },

  mounted() {
    // this.calendar.jump(2021, 10);
    // this.id = this.$root.$mp.query.id;
    // console.info(this.id)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    this.getData();
  },
  computed: {

  },
  methods: {

    bindPickerChange(e) {
      console.info(this.array)
      console.log('选中的值为：' + e.mp.detail.value);
      this.xmName = this.array[e.mp.detail.value]
      this.xmId = this.xmList[e.mp.detail.value].id
    },

    getSelectStaff(data){
      console.info('data',data)
      if(this.multiple){
        this.csData = JSON.parse(JSON.stringify(data))
      }else{
        this.spData = JSON.parse(JSON.stringify(data))
      }
      // this.hasSelect = JSON.parse(JSON.stringify(data))
    },

    getSelectCustomer(data){
      this.customerSelectData = JSON.parse(JSON.stringify(data))
    },

    handleApproval(){
      this.multiple = false
      this.selectData = this.spData
      this.selectStaffVisible = true
    },

    handleCopy(){
      this.multiple = true
      this.selectData = this.csData
      this.selectStaffVisible = true
    },


    bindDateChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
      this.date = e.mp.detail.value
    },
    bindTimeChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
      this.time = e.mp.detail.value
    },
    async getData() {
      const data = await post(`/serviceItem/queryServiceItems?shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`);
      if(data.success){
        this.xmList = data.result
        this.array = this.xmList.map(item => {
          return item.itemName
        })
      }
    },
    async handleSubmit(){

      if( !this.xmId || !this.spData.length || !this.date || !this.time || !this.customerSelectData.length || !this.remark){
        this.tipsMessage = '请填写完整的信息!'
        this.showTopTips = true
        setTimeout(()=>{
          this.showTopTips = false
        },1500)
        return
      }

      const data = await post(`/myAppointment/createAppointment`, {
        "appointDate": this.date+' '+this.time,
        "customerPhone": this.customerSelectData[0].customerNo,
        "empNo": this.$store.state.userInfo.shopEmployee.id,
        "operator": this.spData[0].id,
        "remark": this.remark,
        "serviceItemNo": this.xmId
      });
      if(data.success){
        wx.showToast({
          title: '创建预约成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })
        setTimeout(()=>{
          if(this.id){
            wx.navigateBack()
          }else{
            wx.redirectTo({
              url: '/pages/my-appointment/main'
            })
          }

        },1000)
      }
    },
    handleSign() {
      // wx.navigateTo({
      //   url: "/pages/my-sign/main?"
      // });
    }
  },
  created() {

  }
};
</script>

<style lang='scss'>
  @import "./style.scss";
</style>

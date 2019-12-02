<template>
  <div class="customer-operate">

    <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tipsMessage}}</div>

    <div class="weui-cells weui-cells_after-title">

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>客户姓名</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.customerName" placeholder="请输入客户姓名" />
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
          <div class="weui-label"><span class="required">*</span>出生日期</div>
        </div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" :value="form.birthDay"  @change="bindDateChange">
            <input class="weui-input" disabled="disabled" placeholder="请选择出生日期" v-model="form.birthDay" />
          </picker>
        </div>
      </div>

      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>首选联系电话</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.phone" placeholder="请输入首选联系电话" />
        </div>
      </div>


      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>爱&#12288;&#12288;好</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请添加客户爱好" v-model="favor" />
        </div>
        <div class="weui-cell__ft">
           <button class="weui-btn mini-btn add" @click="handleAddFavor" :disabled="!favor" type="primary" size="mini">添加爱好</button>
        </div>
      </div>
      <div class="weui-cell weui-cell_input weui-cell_vcode" style="border-bottom: 1rpx solid #d9d9d9;">
        <div class="weui-cell__hd">
          <div class="weui-label"></div>
        </div>
        <div class="weui-cell__bd love">
          <span v-for="(item, index) in favorList" :key="index" @click="handleRemoveFavor(index)">{{item}}</span>
          <!-- <span>唱歌</span>
          <span>旅游</span>
          <span>打篮球</span>
          <span>唱歌</span>
          <span>旅游</span>
          <span>打篮球</span>
          <span>唱歌</span>
          <span>旅游</span> -->
        </div>
      </div>




      <div class="weui-cells__title" style="margin-top: 20px;">备注</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="" placeholder="请输入备注" v-model="form.remark" style="height: 3.3em" />
            <!-- <div class="weui-textarea-counter">0/200</div> -->
          </div>
        </div>
      </div>



      <div class="weui-cells__title" style="margin-top: 20px;">年度规划</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="" placeholder="请输入年度规划" v-model="form.yearPlan" style="height: 3.3em" />
            <!-- <div class="weui-textarea-counter">0/200</div> -->
          </div>
        </div>
      </div>

      <!--完-->

    </div>







    <div class="add-customer">
      <button class="weui-btn" type="primary" @click="handleSubmit">提 交</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
export default {
  onShow() {
    this.id = this.$root.$mp.query.id;
    // console.info(this.id)
    wx.setNavigationBarTitle({
      title: this.id ? '修改客户信息' : '添加客户'
    })
  },
  computed: {

  },
  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role)
    // this.getData();

    if(this.id){
      let data = wx.getStorageSync('customer-detail-data')
      console.info('kehuxiangq',data)

      this.form = {
        "birthDay": data.baseInfo.birthDay,
        "customerName": data.name,
        "favor": data.baseInfo.favor,
        "phone": data.phone,
        "remark": data.baseInfo.remark,
        "sex": data.sex=='FEMALE'? 2 : 1,
        "yearPlan": data.baseInfo.yearPlan
      }

      this.favorList = data.baseInfo.favor.split(',')
      if(data.sex=='FEMALE'){
        this.radioItems[0].checked = false
        this.radioItems[1].checked = true
      }else{
        this.radioItems[0].checked = true
        this.radioItems[1].checked = false
      }

      //form.sex == 1 ? 'MALE' : 'FEMALE',

      wx.removeStorageSync('customer-detail-data')
    }
  },
  data() {
    return {
      // role: ''
      id: null,
      favor: '',
      favorList: [],
      showTopTips: false,
      tipsMessage: '',
      radioItems: [
        { name: '男', value: '1', checked: true},
        { name: '女', value: '2' }
      ],
      form: {
        "birthDay": "",
        "customerName": "",
        "empNo": '',
        "favor": "",
        "phone": "",
        "remark": "",
        "sex": "1",
        "yearPlan": ""
      }
    };
  },
  components: {},
  methods: {

    setData(){

    },

    radioChange(e) {
      console.log('radio发生change事件，携带value值为：' + e.mp.detail.value);
      let radioItems = this.radioItems;
      for (let i = 0; i < radioItems.length; ++i) {
        radioItems[i].checked = radioItems[i].value === e.mp.detail.value;
      }
      this.radioItems = radioItems;
      let result = this.radioItems.find(item => {
        return item.checked
      })
      this.form.sex = result.value
    },
    bindDateChange(e) {
      console.log('选中的日期为：' + e.mp.detail.value);
      this.form.birthDay = e.mp.detail.value
    },
    handleAddFavor(){
      if(this.favorList.indexOf(this.favor) > -1){
        this.tipsMessage = '添加爱好重复!'
        this.showTopTips = true
        setTimeout(()=>{
          this.showTopTips = false
        },3000)
        this.favor = ''
        return
      }
      this.favorList.push(this.favor)
      this.form.favor = this.favorList.join(',')
      this.favor = ''
    },

    handleRemoveFavor(index){
      this.favorList.splice(index,1)
      this.form.favor = this.favorList.join(',')
    },


    async handleSubmit(){

      let result = ['favor','birthDay','customerName','phone'].some(item =>{
        return this.form[item] == ''
      })

      if(result){
        this.tipsMessage = '请填写完整的信息!'
        this.showTopTips = true
        setTimeout(()=>{
          this.showTopTips = false
        },1000)
        return
      }

      let params = {
        "birthDay": this.form.birthDay,
        "customerName": this.form.customerName,
        "empNo": this.$store.state.userInfo.shopEmployee.id,
        "favor": this.form.favor,
        "phone": this.form.phone,
        "remark": this.form.remark,
        "sex": this.form.sex == 1 ? 'MALE' : 'FEMALE',
        "yearPlan": this.form.yearPlan
      }
      let url = '/myCustomer/addCustomer'

      if(this.id){
        params.customerNo = this.id
        url = '/myCustomer/modifyCustomer'
      }

      const data = await post(url, params);
      if(data.success){
        console.info(data)
        wx.showToast({
          title: this.id ? '修改成功' : '添加成功',
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
      };
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
    // }
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

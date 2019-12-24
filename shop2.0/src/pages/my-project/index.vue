<template>
  <div class="page">
    <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tipsMessage}}</div>
    <div class="weui-form-preview" style="margin-bottom: 20rpx;" v-if="!selectStaffVisible && !selectCustomerVisible">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>申报标题</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="title" placeholder="请输入申报标题" />
          </div>
        </div>



        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>申报项目</div>
          </div>
          <div class="weui-cell__bd">
            <picker @change="bindPickerChange" :value="index" :range="array">
              <input class="weui-input" disabled="disabled" :value="xmName" placeholder="请输入申报目标" />
            </picker>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>客户姓名</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" disabled="disabled" :value="customerSelectData[0]?customerSelectData[0].name:''" @click="selectCustomerVisible=true" placeholder="请输入客户姓名" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>完成时间</div>
          </div>
          <div class="weui-cell__bd">
            <picker class="weui-btn" mode="date" :value="date" @change="bindTimeChange">
              <input class="weui-input" disabled="disabled" :value="date" placeholder="请输入完成时间" />
            </picker>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>申报奖励</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" v-model="point" placeholder="请输入申报奖励" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>审批人</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" disabled="disabled" :value="spData[0]?spData[0].name:''" @click="handleApproval" placeholder="请输入审批人" />
          </div>
        </div>

        <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>申报内容</div>
            </div>
            <div class="weui-cell__bd" style="padding: 20rpx 0;">
              <textarea class="" placeholder="请输入申报内容" style="height: 3.3em; width: 100%;" v-model="noticeText" />
            </div>
          </div>
        </div>

        <div class="page__bd">
          <div class="weui-cells no-t" style="margin-top: 0;">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <div class="weui-uploader__title">抄送人(默认不抄送)</div>
                    <!-- <div class="weui-uploader__info">{{files.length}}/2</div> -->
                  </div>
                  <div class="weui-uploader__bd">
                    <div class="weui-uploader__files">
                      <div class="weui-uploader__file">
                        <span v-for="(item,index) in csData" :key="index">{{item.name}}<template v-if="index<csData.length-1">，</template></span>
                        <i class="iconfont iconjia" style="display: inline-block; position: relative; top: 6rpx; left: 10rpx;" @click="handleCopy"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleAdd">确 定</button>
    </div>

    <select-staff :multiple="multiple" :data="selectData" :visible.sync="selectStaffVisible" @getSelectData="getSelectStaff"></select-staff>

    <select-customer :multiple="false" :data="customerSelectData" :visible.sync="selectCustomerVisible" @getSelectData="getSelectCustomer"></select-customer>


  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
import selectStaff from '@/components/select-staff';
import selectCustomer from '@/components/select-customer';

export default {
  onShow() {

  },
  components: {
    selectStaff,
    selectCustomer
  },
  data() {
    return {
      showTopTips: false,
      tipsMessage:'',
      // sp: null,
      selectStaffVisible: false,
      selectCustomerVisible: false,
      multiple: true,
      selectData: [],
      spData: [],
      customerSelectData:[],
      csData: [],

      // role: '',
      noticeText: '',
      date: '',
      title:'',
      point: '',


      // array: ['美国', '中国', '巴西', '日本'],
      array: [],
      xmList: [],
      xmName: '',
      xmId: '',
      index: 0
    };
  },

  mounted() {
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

    bindTimeChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
      this.date = e.mp.detail.value
    },
    async handleAdd(){

      if(!this.point || !this.xmId || !this.title || !this.spData.length || !this.date || !this.customerSelectData.length || !this.noticeText){
        this.tipsMessage = '请填写完整的信息!'
        this.showTopTips = true
        setTimeout(()=>{
          this.showTopTips = false
        },1500)
        return
      }

      let ccEmpList = this.csData.map(item => {
        return item.id
      })
      const data = await post(`/service/applyItem`,{
        "auditor": this.spData[0].id,
        "ccEmpList": ccEmpList.join(','),
        "completeTime": this.date,
        "content": this.noticeText,
        "customerNo": this.customerSelectData[0].customerNo,
        "empNo": this.$store.state.userInfo.shopEmployee.id,
        "point": this.point,
        "serviceItemNo": this.xmId,
        "title": this.title
      });
      if(data.success){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })


        wx.setStorageSync('application-type', 'SERVICE_ITEM')
        setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/my-application/main'
          })
        },1000)
      }

      // 测试用 我的目标申报的详情页面是从我的申请里面跳转过来的
      // wx.navigateTo({
      //   url: "/pages/my-project-state/main"
      // });
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

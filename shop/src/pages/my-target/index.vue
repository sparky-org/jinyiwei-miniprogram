<template>
  <div class="page">

    <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tipsMessage}}</div>
    <div class="weui-form-preview" style="margin-bottom: 20rpx;" v-if="!selectStaffVisible && !selectCustomerVisible">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required" v-if="!id">*</span>申报标题</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" :disabled="id" v-model="title" placeholder="请输入申报标题" />
          </div>
        </div>



        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required" v-if="!id">*</span>申报业绩</div>
          </div>
          <div class="weui-cell__bd">
            <!-- <picker @change="bindPickerChange" :value="index" :range="array"> -->
            <input class="weui-input" :disabled="id" v-model="targetAmount" placeholder="请输入申报业绩" />
            <!-- </picker> -->
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required" v-if="!id">*</span>客户姓名</div>
          </div>
          <div class="weui-cell__bd">
            <template v-if="id">
              <input class="weui-input" disabled="disabled" :value="customerSelectData[0]?customerSelectData[0].name:''" />
            </template>
            <template v-else>
              <input class="weui-input" disabled="disabled" :value="customerSelectData[0]?customerSelectData[0].name:''" @click="selectCustomerVisible=true" placeholder="请输入客户姓名" />
            </template>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required" v-if="!id">*</span>完成日期</div>
          </div>
          <div class="weui-cell__bd">
            <template v-if="id">
              <input class="weui-input" disabled="disabled" :value="date" />
            </template>
            <template v-else>
              <picker class="weui-btn" mode="date" :value="date" @change="bindDateChange">
                <input class="weui-input" disabled="disabled" :value="date" placeholder="请输入完成日期" />
              </picker>
            </template>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required" v-if="!id">*</span>完成时间</div>
          </div>
          <div class="weui-cell__bd">
            <template v-if="id">
              <input class="weui-input" disabled="disabled" :value="time" />
            </template>
            <template v-else>
              <picker class="weui-btn" mode="time" :value="time" @change="bindTimeChange">
                <input class="weui-input" disabled="disabled" :value="time" placeholder="请输入完成时间" />
              </picker>
            </template>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required" v-if="!id">*</span>申报奖励</div>
          </div>
          <div class="weui-cell__bd">
            <template v-if="id">
              <input class="weui-input" :disabled="id" v-model="point" />
            </template>
            <template v-else>
              <input class="weui-input" :disabled="id" v-model="point" placeholder="请输入申报奖励" />
            </template>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required" v-if="!id">*</span>审批人</div>
          </div>
          <div class="weui-cell__bd">
            <template v-if="id">
              <input class="weui-input" disabled="disabled" :value="spData[0]?spData[0].name:''" />
            </template>
            <template v-else>
              <input class="weui-input" disabled="disabled" :value="spData[0]?spData[0].name:''" @click="handleApproval" placeholder="请输入审批人" />
            </template>
          </div>
        </div>

        <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required" v-if="!id">*</span>申报内容</div>
            </div>
            <div class="weui-cell__bd" style="padding: 20rpx 0;">
              <textarea :disabled="id" placeholder="请输入申报内容" style="height: 3.3em; width: 100%;" v-model="noticeText" />
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
                        <i class="iconfont iconjia" v-if="!id" style="display: inline-block; position: relative; top: 6rpx; left: 10rpx;" @click="handleCopy"></i>
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

    <div class="operate-btn" v-if="!type">
      <button class="weui-btn" type="primary" @click="handleAdd" v-if="!id">确 定</button>
      <button class="weui-btn" type="warn" @click="handleBack" v-if="id && status=='NEW'">撤 销</button>
    </div>

    <div class="operate-btn" v-if="type=='approval' && status=='NEW' ">
      <div class="operate-btn">
        <div class="weui-flex">
          <div class="weui-flex__item" style="padding-right: 10rpx;">
            <button class="weui-btn" type="warn" @click="handleApprovalAction(false)">拒 绝</button>
          </div>
          <div class="weui-flex__item" style="padding-left: 10rpx;">
            <button class="weui-btn" type="primary" @click="handleApprovalAction(true)">同 意</button>
          </div>
        </div>
      </div>
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
    this.id = this.$root.$mp.query.id;
    this.type = this.$root.$mp.query.type;
    this.applyNo = this.$root.$mp.query.applyNo;
    // console.info(this.id)
    if(this.id){
      this.getData()
    }
  },
  components: {
    selectStaff,
    selectCustomer
  },
  data() {
    return {
      type: '',
      enumState: {
        'NEW': '已提交',
        'REVERTED': '已撤回',
        'PASSED': '审批通过',
        'REFUSED': '审批拒绝'
      },

      status: '',

      applyNo: '',
      id: null,
      showTopTips: false,
      tipsMessage:'',
      // sp: null,
      selectStaffVisible: false,
      selectCustomerVisible: false,
      multiple: true,
      selectData: [],
      spData: [],
      csData: [],
      // role: '',
      noticeText: '',
      date: '',
      title:'',
      point: '',
      time: '',

      targetAmount: '',

      customerSelectData:[],
      // array: ['美国', '中国', '巴西', '日本'],
      // array: [],
      // xmList: [],
      // xmName: '',
      // xmId: '',
      // index: 0
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

    handleApprovalAction(state){
      wx.showModal({
        title: '提示',
        content: state ? '确认同意该申请吗？' : '确认拒绝该申请吗？',
        // confirmText: "主操作",
        // cancelText: "辅助操作",
        success: async (res) => {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
            const data = await post(`/myApply/approve?auditEmpNo=${this.$store.state.userInfo.shopEmployee.id}&applyNo=${this.applyNo}&result=${state}`);
            if(data.success){
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 2000,
                success(){

                }
              })
              setTimeout(()=>{
                wx.navigateBack({
                  url: "/pages/my-approval/main"
                });
              },1000)
            }
          } else {
            console.log('用户点击辅助操作')
          }
        }
      });
    },

    handleBack(){
      wx.showModal({
        title: '提示',
        content: '确认要撤销该申请吗？',
        // confirmText: "主操作",
        // cancelText: "辅助操作",
        success: async (res) => {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
            const data = await post(`/sales/revertSalesPerf?salesPerfNo=${this.id}`);
            if(data.success){
              wx.showToast({
                title: '撤销成功',
                icon: 'success',
                duration: 2000,
                success(){

                }
              })
              setTimeout(()=>{
                wx.navigateBack({
                  url: "/pages/my-application/main"
                });
              },1000)
            }
          } else {
            console.log('用户点击辅助操作')
          }
        }
      });
    },
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
    async handleAdd(){

      if(!this.point || !this.targetAmount || !this.title || !this.spData.length || !this.date || !this.time || !this.customerSelectData.length || !this.noticeText){
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
      const data = await post(`/sales/applySalesPerf`,{
        "auditor": this.spData[0].id,
        "ccEmpList": ccEmpList.join(','),
        "completeTime": this.date + ' ' + this.time,
        "content": this.noticeText,
        "customerNo": this.customerSelectData[0].customerNo,
        "empNo": this.$store.state.userInfo.shopEmployee.id,
        "point": this.point,
        "targetAmount": this.targetAmount,
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
        wx.setStorageSync('application-type', 'SAL_PERF')
        setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/my-application/main'
          })
        },1000)
        // setTimeout(()=>{
        //   wx.redirectTo({
        //     url: '/pages/my-application/main'
        //   })
        // },1000)
      }

      // 测试用 我的目标申报的详情页面是从我的申请里面跳转过来的
      // wx.navigateTo({
      //   url: "/pages/my-project-state/main"
      // });
    },

    async getData() {
      // const data = await post(`/serviceItem/queryServiceItems?shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`);
      // if(data.success){
      //   this.xmList = data.result
      //   this.array = this.xmList.map(item => {
      //     return item.itemName
      //   })
      // }
      const data = await post(`/sales/getSalesPerfApply?salesPerfNo=${this.id}`);
      if(data.success){
        // selectData: [],
        // spData: [],
        // csData: [],


        this.status = data.result.status

        if(data.result.completeTime){
          let d = data.result.completeTime.split(' ')
          this.date = d[0]
          this.time = d[1]
        }

        this.noticeText = data.result.content
        this.title = data.result.title
        this.point = data.result.applyPoint
        this.targetAmount = data.result.targetAmount

        if(data.result.ccEmpNames){
          this.csData = data.result.ccEmpNames.map(item => {
            return {
              name: item
            }
          })
        }
        this.spData = [{
          name:data.result.auditor
        }]
        this.customerSelectData = [{
          name: data.result.customerName
        }]
      }
    },
    bindTimeChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
      this.time = e.mp.detail.value
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

<template>
  <div class="page">
    <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tipsMessage}}</div>
    <template v-if="!selectStaffVisible">
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>日记日期</div>
        </div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" :value="date"  @change="bindDateChange">
            <input class="weui-input" disabled="disabled" v-model="date" placeholder="请选择日记日期" />
          </picker>
        </div>
      </div>
    </div>

    <div class="weui-cells__title">今日工作总结</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="" placeholder="请输入今日工作总结" v-model="todayConlude" style="height: 9.9em; width: 100%;" />
          <!-- <div class="weui-textarea-counter">0/200</div> -->
        </div>
      </div>
    </div>


    <div class="weui-cells__title">明日工作计划</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="" placeholder="请输入明日工作计划" v-model="tomorrowPlan" style="height: 9.9em; width: 100%;" />
          <!-- <div class="weui-textarea-counter">0/200</div> -->
        </div>
      </div>
    </div>


    <!-- <div class="weui-cells weui-cells_after-title no-t">
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
    </div> -->

    <!-- <div class="page__bd">
      <div class="weui-cells no-t" style="margin-top: 0;">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <div class="weui-uploader__title"><span class="required">*</span>选择员工</div>
              </div>
              <div class="weui-uploader__bd">
                <div class="weui-uploader__files">
                  <div class="weui-uploader__file">

                    <span v-for="(item,index) in spData" :key="index">{{item.name}}<template v-if="index<spData.length-1">，</template></span>
                    <i class="iconfont iconjia" style="display: inline-block; position: relative; top: 6rpx; left: 10rpx;" @click="handleSingleSelect"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="weui-cells weui-cells_after-title no-t">
      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>汇报给谁</div>
        </div>
        <div class="weui-cell__bd">
          <!-- <picker @change="bindPickerChange" :value="position" :range="array"> -->
            <input class="weui-input" disabled="disabled" :value="spData[0]?spData[0].name:''" @click="handleSingleSelect" placeholder="请选择" />
          <!-- </picker> -->
        </div>
      </div>
    </div>


    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSubmit">添加</button>
    </div>
    </template>

     <select-staff :multiple="multiple" :data="selectData" :visible.sync="selectStaffVisible" @getSelectData="getSelectStaff"></select-staff>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, queryParams } from "../../utils";
import selectStaff from '@/components/select-staff';
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {

  },
  components: {
    selectStaff
  },
  data() {
    return {
      date: '',
      todayConlude:'',
      tomorrowPlan:'',
      // role: '',
      // index: 1,
      // enumArea,
      // enumScore,
      // area: enumArea[0],
      // score: enumScore[0],
      // startDate: '',
      // endDate: ''
      tipsMessage:'',
      showTopTips: false,

      selectStaffVisible: false,
      multiple: false,
      selectData: [],
      csData: [],
      spData: [],

      canEdit: true,

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
    bindDateChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
      this.date = e.mp.detail.value
    },

    handleSingleSelect(){
      this.multiple = false
      this.selectData = this.csData
      this.selectStaffVisible = true
    },
    getSelectStaff(data){
      console.info('data',data)
      if(this.multiple){
        this.csData = JSON.parse(JSON.stringify(data))
      }else{
        this.spData = JSON.parse(JSON.stringify(data))
      }
    },

    // handleEditTask(){
    //   wx.navigateTo({
    //     url: "/pages/my-task-operate/main?id=2&type=edit"
    //   });
    // },


    async handleSubmit(){

      if(!this.todayConlude || !this.tomorrowPlan || !this.date || !this.spData.length){
        this.tipsMessage = '请填写完整的信息'
        this.showTopTips = true
        setTimeout(()=>{
          this.showTopTips = false
        },1500)
        return
      }

      let spEmpList = this.spData.map(item => {
        return item.id
      })

      let param = {
        "auditor": spEmpList[0],
        "date": this.date,
        "empNo": this.$store.state.userInfo.shopEmployee.id,
        "todayConlude": this.todayConlude,
        "tomorrowPlan": this.tomorrowPlan
      }
      // if(this.posterNo){
      //   param.posterNo = this.posterNo
      // }

      const data = await post(`/daily/record/createRecord`,param);
      if(data.success){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })
        setTimeout(()=>{
          wx.navigateTo({
            url: '/pages/my-diary/main'
          })
        },1000)
      }
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

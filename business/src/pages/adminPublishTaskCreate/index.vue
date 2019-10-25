<template>
  <div class=".publish_task_create">
   <template v-if="!checkStaff">
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">任务名称</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入任务名称" v-model="form.taskName" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">面向对象</div>
        </div>
        <!-- <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入面向对象" v-model="form.targetType" />
        </div> -->
        <div class="weui-cell__bd" style="padding: 20rpx 0;">
          <textarea @click="handleCheck" class="" readonly="readonly" placeholder="请选择面向对象" v-model="form.targetStr" style="height: 3.8em" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">任务奖励</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.awardPoint" placeholder="请输入任务奖励" />
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
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">开始时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker mode="date" value="startDay" @change="bindBeginDateChange">
            <div class="weui-input">{{form.startDay}}</div>
          </picker>
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">结束时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker mode="date" value="endDay" @change="bindEndDateChange">
            <div class="weui-input">{{form.endDay}}</div>
          </picker>
        </div>
      </div>


      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">任务内容</div>
        </div>
        <div class="weui-cell__bd" style="padding: 20rpx 0;">
          <textarea class="" placeholder="请输入任务内容" v-model="form.condition" style="height: 3.8em" />
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
      <button class="weui-btn" type="primary" @click="handlePublish">创 建</button>
    </div>
   </template>
   <template v-else>
      <div class="weui-cells weui-cells_after-title">
       <div class="weui-cells weui-cells_after-title" v-if="checkboxItems.length">
         <checkbox-group @change="checkboxChange">
          <label class="weui-cell weui-check__label">
             <checkbox class="weui-check" :value="checkboxItems[0].value" :checked="checkboxItems[0].checked" />
             <div class="weui-cell__hd weui-check__hd_in-checkbox">
               <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!checkboxItems[0].checked"></icon>
               <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="checkboxItems[0].checked"></icon>
             </div>
             <div class="weui-cell__bd">所有</div>
           </label>
           <template v-if="!checkboxItems[0].checked">
             <label class="weui-cell weui-check__label" v-if="item.name!='所有'" v-for="(item,index) in checkboxItems" :key="index">
               <checkbox class="weui-check" :value="item.value" :checked="item.checked" />
               <div class="weui-cell__hd weui-check__hd_in-checkbox">
                 <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
                 <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon>
               </div>
               <div class="weui-cell__bd">{{item.name}}</div>
             </label>
           </template>
         </checkbox-group>
       </div>
     </div>
     <div class="sureBth">
       <button class="weui-btn" type="primary" @click="handleSelect">确认选择</button>
     </div>
   </template>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    // this.getData();
    const data = post(`/employ/queryEmployByShop?shopId=${this.$store.state.userInfo.shopId}`).then((data)=>{
      if(data.success){
        let result = JSON.parse(JSON.stringify(data.result))
        result.forEach(item => {
          item.checked = false
          item.value = item.id
        })
        result.unshift({ name: '所有', value: 'ALL', checked: false })
        this.checkboxItems = result
        console.info('this.checkboxItems',this.checkboxItems)
      }
    });
  },
  data() {
    return {
      checkStaff: false,
      // banner: [],
      // time: '09:01',
      // beginDate: '2015-09-01',
      // endDate: '2015-09-01',
      checkboxItems: [],
      form: {
        "awardPoint": '',
        "creator": "",
        "endDay": "",
        "taskName": "",
        "shopId": 1,
        "startDay": "",
        "targetType": "",
        "condition": '',
        empIds: '',
        targetStr: ''
      }
    };
  },
  components: {},
  methods: {
    async handlePublish(){
      console.info('wahahahah')
      if(this.form.name == '' ||
      this.form.targetStr == '' ||
      this.form.awardPoint == '' ||
      this.form.startDay == '' ||
      this.form.endDay == '' ||
      this.form.condition == ''){
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
      console.info(this.form)
      const data = await post(`/shop/task/createShopTask`,{
        ...this.form,
        agencyId: this.$store.state.userInfo.shopId,
        createEmpId: this.$store.state.userInfo.employId
      })
      if(data.success){
        console.info('wadjassd',data)
        wx.showToast({
          title: '创建任务成功',
          icon: 'success',
          duration: 2000,
          success(){

          }
        })
        setTimeout(()=>{
          wx.navigateBack({
            url: '/pages/adminPublishTask/main'
          })
        },2000)
      }

    },
    handleSelect(){
      // let ids = this.checkboxItems.map(item => {
      //    return {
      //     id: item.value,
      //     name: item.name
      //    }
      // })
      console.info(this.checkboxItems)
      let state = this.checkboxItems.some(item => {
        return (item.name == '所有' && item.checked == true)
      })
      if(state){
        this.form.targetStr = '所有人'
        this.form.targetType = 'ALL'
        this.form.empIds = ''
      }else{
        let checkList = this.checkboxItems.filter(item => {
          return item.checked
        })
        console.info(checkList)
        let ids = checkList.map(item => {
          return item.value
        })
        let names = checkList.map(item => {
          return item.name
        })
        this.form.targetStr = names.join(',')
        this.form.targetType = 'SPECIAL'
        this.form.empIds = ids.join(',')
      }
      // wx.navigateTo({
      //   url: `/pages/adminPublishTaskCreate/main?id=${ids.join(',')}`
      // })
      this.checkStaff = false
    },
    checkboxChange(e) {
      console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
      var checkboxItems = this.checkboxItems;
      var values = e.mp.detail.value;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;
        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (String(checkboxItems[i].value) === String(values[j])) {
            checkboxItems[i].checked = true;
            break;
          }
        }
      }
      this.checkboxItems = checkboxItems;
    },
    handleCheck(){
      // wx.navigateTo({
      //   url: '/pages/adminPublishTaskCheck/main'
      // })
      this.checkStaff = true
    },
    bindBeginDateChange(e) {
      this.form.startDay = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    bindEndDateChange(e) {
      this.form.endDay = e.mp.detail.value;
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

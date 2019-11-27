<template>
  <div class="page">
    <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tipsMessage}}</div>
    <div class="weui-cells weui-cells_after-title">

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>员工姓名</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.name" placeholder="请输入员工姓名" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input weui-cell_vcode" style="padding: 20rpx 30rpx;">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>性&#12288;&#12288;别</div>
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

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>年龄</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.age" placeholder="请输入员工年龄" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>出生日期</div>
        </div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" :value="form.birthday"  @change="bindDateChange">
            <input class="weui-input" disabled="disabled" placeholder="请选择出生日期" v-model="form.birthday" />
          </picker>
        </div>
      </div>


      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>手机号码</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.phone" placeholder="请输入员工手机号码" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>岗位</div>
        </div>
        <div class="weui-cell__bd">
          <picker @change="bindPickerChange" :value="form.position" :range="array">
            <input class="weui-input" placeholder="请选择员工岗位" v-model="form.position" />
          </picker>
        </div>
      </div>

      <div class="weui-cell weui-cell_input weui-cell_vcode" style="padding: 20rpx 30rpx;">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>是否管理员</div>
        </div>
        <div class="weui-cell__bd">
            <radio-group @change="adminChange">
              <label class="weui-check__label" style="width: 50px; display: inline-block;" v-for="(item,index) in adminItems" :key="index">
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
          <div class="weui-label"><span class="required">*</span>上级</div>
        </div>
        <div class="weui-cell__bd">
          <picker @change="bindStaffChange" :value="form.sj" :range="staffArray">
            <input class="weui-input" placeholder="请选择上级" v-model="form.sj" />
          </picker>
        </div>
      </div>


    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" v-if="id" @click="handleSubmit">修改</button>
      <button class="weui-btn" type="primary" v-else @click="handleSubmit">添加</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import moment from 'moment'

// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {
    this.id = this.$root.$mp.query.id;
    console.info('id',this.id)
    // console.info(this.id)
    wx.setNavigationBarTitle({
      title: this.id ? '修改员工信息' : '添加员工'
    })
    this.getPositionList()


  },
  components: {

  },
  data() {
    return {
      // role: '',
      tipsMessage: '',
      id: '',
      showTopTips: false,
      radioItems: [
        { name: '男', value: '1', checked: true},
        { name: '女', value: '2' }
      ],
      adminItems: [
        { name: '是', value: '1', checked: true},
        { name: '否', value: '2' }
      ],
      array: [],
      staffArray: [],

      positionList: [],
      staffList: [],

      form: {
        position: '',
        sj: '',

        "admin": true,
        "age": '',
        "birthday": "",
        "creator": 'sd',
        "jobNo": '',
        "managerNo": '',
        "name": "",
        "phone": "",
        "shopNo": '',
        sex: '1'
      }
    };
  },

  mounted() {


    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {
    async getCustomerDetail(){
      const data = await post("/employee/getEmployeeInfo?empNo="+this.id);
      if(data.success){
        console.info('员工信息',data)
        let obj = {
          position: '',
          sj: '',
          "admin": data.result.isAdmin,
          "age": data.result.age,
          "birthday": data.result.birthday?data.result.birthday.split(' ')[0]:'',
          "creator": data.result.creator,
          "jobNo": data.result.jobNo,
          "managerNo": data.result.managerNo,
          "name": data.result.name,
          "phone": data.result.phone,
          "shopNo": data.result.shopNo,
          "sex": data.result.sex
        }

        // console.info('this.form',this.form)
        let a = this.positionList.find(item => {
          return item.id == obj.jobNo
        })
        obj.position = a.name

        let b = this.staffList.find(item => {
          return item.id == obj.managerNo
        })
        obj.sj = b.name

        this.form = obj
      };
    },
    async getPositionList(){
      console.info('this.$store.state.userInfo.shopEmployee.shopNo',this.$store.state.userInfo.shopEmployee.shopNo)
      const data = await post("/employee/getShopJob?shopNo="+this.$store.state.userInfo.shopEmployee.shopNo);
      if(data.success){
        this.positionList = data.result
        if(this.positionList.length > 0){
          this.array = this.positionList.map(item => {
            return item.name
          })
        }
      };
      const empData = await post("/employee/queryEmpOfShop?shopNo="+this.$store.state.userInfo.shopEmployee.shopNo);
      if(empData.success){
        this.staffList = empData.result
        if(this.staffList.length > 0){
          this.staffArray = this.staffList.map(item => {
            return item.name
          })
        }
      };

      if(this.id > 0){
        this.getCustomerDetail()
      }

    },
    bindPickerChange(e) {
      console.log('选中的值为：' + this.array[e.mp.detail.value]);
      this.form.position = this.array[e.mp.detail.value]
      this.form.jobNo = this.positionList[e.mp.detail.value].id
    },

    bindStaffChange(e) {
      console.log('选中的值为：' + this.array[e.mp.detail.value]);
      this.form.sj = this.staffArray[e.mp.detail.value]
      this.form.managerNo = this.staffList[e.mp.detail.value].id
    },

    bindDateChange(e) {
      console.log('选中的日期为：' + e.mp.detail.value);
      this.form.birthday = e.mp.detail.value
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
    adminChange(e){
      console.log('radio发生change事件，携带value值为：' + e.mp.detail.value);
      let radioItems = this.adminItems;
      for (let i = 0; i < radioItems.length; ++i) {
        radioItems[i].checked = radioItems[i].value === e.mp.detail.value;
      }
      this.adminItems = radioItems;
      let result = this.adminItems.find(item => {
        return item.checked
      })
      this.form.admin = result.value
    },


    async handleSubmit(){
      // let time = moment("2000-01-01").format();
      // let d = new Date(time)
      // console.info(d.getFullYear(), d.getMonth(), d.getDate());
      // return
      let result = ['age','birthday','name','phone','jobNo','managerNo'].some(item =>{
        return this.form[item] == ''
      })

      if(result){
        this.tipsMessage = '请填写完整的信息!'
        this.showTopTips = true
        setTimeout(()=>{
          this.showTopTips = false
        },3000)
        return
      }

      if(this.id > 0){
        // 编辑
        const data = await post("/employee/modifyEmployee", {
          shopNo: this.form.shopNo,
          "admin": this.form.admin == 1 ? true : false,
          "age": this.form.age,
          // "birthday": moment(this.form.birthday).format(),
          birthday:this.form.birthday,
          "creator": this.form.id,
          "jobNo": this.form.jobNo,
          "managerNo": this.form.managerNo,
          "name": this.form.name,
          "phone": this.form.phone,
          sex: this.form.sex == 1 ? 'MALE' : 'FEMALE',
          id: this.id
        });
        if(data.success){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000,
            success(){

            }
          })
          setTimeout(()=>{
            wx.navigateTo({
              url: "/pages/my-staff-manage/main"
            });
          },1000)
        };
      }else{
        const data = await post("/employee/createEmployee", {
          shopNo: this.$store.state.userInfo.shopEmployee.shopNo,
          "admin": this.form.admin == 1 ? true : false,
          "age": this.form.age,
          // "birthday": moment(this.form.birthday).format(),
          birthday:this.form.birthday,
          "creator": this.$store.state.userInfo.shopEmployee.id,
          "jobNo": this.form.jobNo,
          "managerNo": this.form.managerNo,
          "name": this.form.name,
          "phone": this.form.phone,
          sex: this.form.sex == 1 ? 'MALE' : 'FEMALE'
        });
        if(data.success){
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1000,
            success(){

            }
          })
          setTimeout(()=>{
            wx.navigateTo({
              url: "/pages/my-staff-manage/main"
            });
          },1000)
        };
      }

    }

    // handleEditTask(){
    //   wx.navigateTo({
    //     url: "/pages/my-task-operate/main?id=2&type=edit"
    //   });
    // },


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
  .weui-navbar__slider_0{
    left: 0!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
  .weui-navbar__slider_1{
    left: 33.33333333%!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
  .weui-navbar__slider_2{
    left: 66.666666666666%!important;
    width: 33.33333333%!important;
    transition: transform 0s!important;
  }
  @import "./style.scss";
</style>

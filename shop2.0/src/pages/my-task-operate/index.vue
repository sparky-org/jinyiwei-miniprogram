<template>
  <div class="page">
    <template v-if="!isSelectArea">

     <div class="weui-toptips weui-toptips_warn" v-if="errorTips">{{errMsg}}</div>

     <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>任务标题</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.taskTitle" placeholder="请输入任务标题" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>积分类型</div>
        </div>
        <div class="weui-cell__bd">
          <picker @change="bindPickerChange" :value="index" :range="array">
            <input class="weui-input" disabled="disabled" :value="array[index]" placeholder="请选择积分类型" />
          </picker>
          <div class="weui-cell__ft weui-cell__ft_in-access" style="top: -35rpx"></div>
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>奖励积分</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="form.rewardPoint" placeholder="请输入奖励积分" />
        </div>
      </div>

      <!-- <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>个数限制</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入个数限制" />
        </div>
      </div> -->

      <!-- <div class="weui-cell weui-cell weui-cell_input"> -->
        <div class="weui-cell weui-cell_switch">
          <div class="weui-cell__bd"><span class="required">*</span>默认全部员工可见</div>
          <div class="weui-cell__ft">
            <switch :checked="checkAllState" @change="switchChange"/>
          </div>
        </div>
      <!-- </div> -->

      <div class="weui-cell weui-cell_input" v-if="!checkAllState">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>可见范围</div>
        </div>
        <div class="weui-cell__bd">
          <!-- <picker @change="bindPickerChange" :value="index" :range="array"> -->
            <input class="weui-input" style="padding-right: 20rpx;" @click="isSelectArea=true" :value="selectEmpNames" disabled="disabled" placeholder="请选择可见范围" />
          <!-- </picker> -->
          <div class="weui-cell__ft weui-cell__ft_in-access" style="top: -35rpx"></div>
        </div>
      </div>




    </div>

    <div class="weui-cells__title" style="padding-top:20rpx;"><span class="required">*</span>任务描述</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="form.taskDesc" style="width:100%; height: 6.6em" placeholder="请输入任务描述" />
          <!-- <div class="weui-textarea-counter">0/200</div> -->
        </div>
      </div>
    </div>

    <div class="operate-btn" v-if="type!='see'">
      <button class="weui-btn" type="primary" v-if="!id" @click="handleSubmit(1)">提交</button>
      <button class="weui-btn" type="primary" v-if="id" @click="handleSubmit(2)">修改</button>
    </div>


    </template>

    <template v-else>
      <div style="padding: 0 10rpx;">
      <div class="weui-cells weui-cells_after-title">
      <div v-for="(itx, idx) in typeItems" :key="idx">
      <checkbox-group @change="checkDZChange($event,typeItems[idx],groupData[idx],idx)">
        <label class="weui-cell weui-check__label" style="border-bottom: 1rpx solid #ccc; background-color: #E5E5E5;">
          <checkbox class="weui-check" :value="typeItems[0].value" :checked="typeItems[idx].checked" />
          <div class="weui-cell__hd weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!typeItems[idx].checked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="typeItems[idx].checked"></icon>
          </div>
          <div class="weui-cell__bd">{{typeItems[idx].name}}</div>
        </label>
      </checkbox-group>
      <checkbox-group @change="checkDZChildChange($event,groupData[idx],idx)">
        <label class="weui-cell weui-check__label" v-for="(it,_index) in groupData[idx]" :key="_index">
          <checkbox class="weui-check" :value="it.value" :checked="it.checked" />
          <div class="weui-cell__hd weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!it.checked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="it.checked"></icon>
          </div>
          <div class="weui-cell__bd">{{it.name}}<span class="desc">总经理</span></div>
        </label>
      </checkbox-group>

    <!--  <checkbox-group @change="checkGWChange">
        <label class="weui-cell weui-check__label" style="border-bottom: 1rpx solid #ccc; background-color: #E5E5E5;">
          <checkbox class="weui-check" :value="typeItems[1].value" :checked="typeItems[1].checked" />
          <div class="weui-cell__hd weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!typeItems[1].checked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="typeItems[1].checked"></icon>
          </div>
          <div class="weui-cell__bd">{{typeItems[1].name}}</div>
        </label>
      </checkbox-group>
      <checkbox-group @change="checkGWChildChange">
        <label class="weui-cell weui-check__label" v-for="(it,idx) in groupData[1]" :key="idx">
          <checkbox class="weui-check" :value="it.value" :checked="it.checked" />
          <div class="weui-cell__hd weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!it.checked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="it.checked"></icon>
          </div>
          <div class="weui-cell__bd">{{it.name}}</div>
        </label>
      </checkbox-group>

      <checkbox-group @change="checkMRSChange">
        <label class="weui-cell weui-check__label" style="border-bottom: 1rpx solid #ccc; background-color: #E5E5E5;">
          <checkbox class="weui-check" :value="typeItems[2].value" :checked="typeItems[2].checked" />
          <div class="weui-cell__hd weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!typeItems[2].checked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="typeItems[2].checked"></icon>
          </div>
          <div class="weui-cell__bd">{{typeItems[2].name}}</div>
        </label>
      </checkbox-group>
      <checkbox-group @change="checkMRSChildChange">
        <label class="weui-cell weui-check__label" v-for="(it,idx) in groupData[2]" :key="idx">
          <checkbox class="weui-check" :value="it.value" :checked="it.checked" />
          <div class="weui-cell__hd weui-check__hd_in-checkbox">
            <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!it.checked"></icon>
            <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="it.checked"></icon>
          </div>
          <div class="weui-cell__bd">{{it.name}}</div>
        </label>
      </checkbox-group>
      -->
      </div>


      </div>

      </div>

      <div class="operate-btn">
        <div class="weui-flex">
          <div class="weui-flex__item" style="padding-right: 10rpx;">
            <button class="weui-btn" type="default" style="border: 1rpx solid #ccc;" @click="handleSelect(1)">取 消</button>
          </div>
          <div class="weui-flex__item" style="padding-left: 10rpx;">
            <button class="weui-btn" type="primary" @click="handleSelect(2)">确认选择</button>
          </div>
        </div>
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
    this.id = this.$root.$mp.query.id;
    if(this.id){
      wx.setNavigationBarTitle({
        title: '修改任务'
      })
    }

    // this.type = this.$root.$mp.query.type;
    // console.info(this.type)
    // if(this.type == 'edit'){
    //   wx.setNavigationBarTitle({
    //     title: '修改任务'
    //   })
    // }
    // if(this.type == 'add'){
    //   wx.setNavigationBarTitle({
    //     title: '发布任务'
    //   })
    // }
    // if(this.type == 'see'){
    //   wx.setNavigationBarTitle({
    //     title: '任务详情'
    //   })
    // }


    this.getJfConfig()
  },
  components: {

  },
  watch: {
    checkAllState(val){
      if(!val){
        this.groupData.forEach(item => {
          item.forEach(it => {
            it.checked = false
          })
        })
        this.typeItems.forEach(it => {
          it.checked = false
        })
        this.selectEmpNames = ''
        this.form.empList = []
        this.form.jobList = []



      }else{
        // 全选
        this.selectEmpNames = ''
        this.form.empList = []
        this.form.jobList = this.typeItems.map(item=>{
          return item.value
        })
      }
    }

  },
  data() {
    return {
      errMsg:'',
      checkAllState: true,
      isSelectArea: false,
      groupData: [],
      // role: '',
      jfList:[],
      array: [],
      index: 0,

      type: '',
      id: null,
      errorTips: false,

      typeItems: [],
      checkboxItems: [
        // { name: 'standard is dealt for u.', value: '0', checked: true },
        // { name: 'standard is dealicient for u.', value: '1', checked: false }
      ],
      empList:[],
      selectEmpNames: '',
      form: {
        "empList": [],
        "jobList":[],
        "pointConfigNo": null,
        "taskDesc": "",
        "taskTitle": "",
        "rewardPoint": ""
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

    handleRender(){
      // setTimeout(()=>{
        if(this.empList && this.empList.length){
          this.empList.forEach(item => {
            this.groupData.forEach((it,index) => {
              it.forEach(i => {
                if(String(item) == String(i.empNo)){
                  i.checked = true
                }
              })
            })
          })

          this.groupData.forEach((it,index) => {
            let num = 0
            it.forEach(i => {
              if(i.checked){
                num++
              }
            })
            if(num == it.length){
              this.typeItems[index].checked = true
            }else{
              this.typeItems[index].checked = false
            }
          })



          this.form.empList = this.empList


          let names = []
          this.groupData.map(item => {
            item.forEach(it => {
              if(it.checked){
                // arr.push(it.value)
                names.push(it.name)
              }
            })
          })
          // this.form.empList = arr
          this.selectEmpNames = names.join(',')
          // console.info('this.form-last',this.form)
        }
      // },500)
    },

    getTaskDetail(){
      const data = post(`/manage/task/viewTask?empNo=${this.$store.state.userInfo.shopEmployee.id}&taskNo=${this.id}`).then((data)=>{
        if(data.success){
          if(data.result){
            this.checkAllState = data.result.selectAll



            let obj = {
              "pointConfigNo": data.result.pointNo,
              "taskDesc": data.result.content,
              "taskTitle": data.result.title,
              "rewardPoint": data.result.rewardPoint,
              empList: [],
              jobList:[]
            }

            this.index = this.jfList.findIndex(item => {
              return item.id == data.result.pointNo
            })
              // console.info('data.result',data.result.selectAll)

            // console.info('this.checkAllState',this.checkAllState)
            // console.info(typeof(data.result.selectAll),'typeof')
            if(data.result.selectAll == true){
              // 全选
              this.selectEmpNames = ''
              obj.empList = []
              obj.jobList = this.typeItems.map(item=>{
                return item.value
              })
            }else{

              this.$nextTick(()=>{
                console.info('data.result.empNoList',data.result.empNoList)
                this.empList = data.result.empNoList
                this.handleRender()
              })

              // if(data.result.empNoList){
              //   data.result.empNoList.forEach(item => {
              //     this.groupData.forEach(it => {
              //       it.forEach(i => {
              //         console.info('item == i.empNo',item , i.empNo)
              //         if(item == i.empNo){
              //           i.checked = true
              //         }else{
              //           i.checked = false
              //         }
              //         console.info('i----',i)
              //       })
              //     })
              //   })
              // }
              // this.typeItems.forEach(it => {
              //   it.checked = false
              // })
              // this.selectEmpNames = ''
              // this.form.empList = []
              // this.form.jobList = []
            }


            // console.info('obj', obj)

            this.form = obj

            // console.info('this.form',this.form)
          }
        }
      });
    },

    switchChange(e) {
      console.log("switch发生change事件，携带value值为："+ e.mp.detail.value);
      this.checkAllState = e.mp.detail.value
    },

    checkDZChange(e, item, subArr, index) {
      console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
      console.info('subArr',subArr)
      console.info('item',item)
      item.checked = e.mp.detail.value!='' ? true : false;
      if(item.checked){
        subArr.forEach(item => {
          item.checked = true
        })
      }else{
        subArr.forEach(item => {
          item.checked = false
        })
      }
    },

    checkDZChildChange(e, arr, index){
      console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
      var checkboxItems = arr;
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
      arr = checkboxItems;
      let state = arr.every(item=>{
        return item.checked
      })
      if(state){
        this.typeItems[index].checked = true
      }else{
        this.typeItems[index].checked = false
      }
    },


    // checkGWChange(e) {
    //   console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
    //   this.typeItems[1].checked = e.mp.detail.value!='' ? true : false;
    //   if(this.typeItems[1].checked){
    //     this.groupData[1].forEach(item => {
    //       item.checked = true
    //     })
    //   }else{
    //     this.groupData[1].forEach(item => {
    //       item.checked = false
    //     })
    //   }
    // },
    // checkMRSChange(e) {
    //   console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
    //   this.typeItems[2].checked = e.mp.detail.value!='' ? true : false;
    //   if(this.typeItems[2].checked){
    //     this.groupData[2].forEach(item => {
    //       item.checked = true
    //     })
    //   }else{
    //     this.groupData[2].forEach(item => {
    //       item.checked = false
    //     })
    //   }
    // },


    // checkGWChildChange(e){
    //   console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
    //   var checkboxItems = this.groupData[1];
    //   var values = e.mp.detail.value;
    //   for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
    //     checkboxItems[i].checked = false;

    //     for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
    //       if (String(checkboxItems[i].value) === String(values[j])) {
    //         checkboxItems[i].checked = true;
    //         break;
    //       }
    //     }
    //   }
    //   this.groupData[1] = checkboxItems;
    //   let state = this.groupData[1].every(item=>{
    //     return item.checked
    //   })
    //   if(state){
    //     this.typeItems[1].checked = true
    //   }else{
    //     this.typeItems[1].checked = false
    //   }
    // },
    // checkMRSChildChange(e){
    //   console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value);
    //   var checkboxItems = this.groupData[2];
    //   var values = e.mp.detail.value;
    //   for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
    //     checkboxItems[i].checked = false;

    //     for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
    //       if (String(checkboxItems[i].value) === String(values[j])) {
    //         checkboxItems[i].checked = true;
    //         break;
    //       }
    //     }
    //   }
    //   this.groupData[2] = checkboxItems;
    //   let state = this.groupData[2].every(item=>{
    //     return item.checked
    //   })
    //   if(state){
    //     this.typeItems[2].checked = true
    //   }else{
    //     this.typeItems[2].checked = false
    //   }
    // },


    getJfConfig(){
      const data = post(`/point/getPointConfig?shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`).then((data)=>{
        if(data.success){
          if(data.result){
            console.info('获取积分配置成功')
            this.jfList = data.result
            this.array = data.result.map(item => {
              return item.pointName
            })
            this.form.pointConfigNo = this.jfList[this.index].id

            this.getGroupData()
          }
        }
      });
    },

    getGroupData(){
      const data = post(`/employee/queryEmpGroupByJob?shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`).then((data)=>{
        if(data.success){
          let arr = []
          let res = []
          data.result.forEach(item => {
            arr.push({
              checked: false,
              name: item.jobName,
              value: item.jobNo
            })
            if(item.empInfos){
              item.empInfos.forEach(it => {
                it.name = it.empName
                it.value = it.empNo
                it.checked = false
              })
              res.push(item.empInfos)
            }
          })
          this.typeItems = JSON.parse(JSON.stringify(arr))
          this.form.jobList = this.typeItems.map(item=>{
            return item.value
          })
          this.groupData = JSON.parse(JSON.stringify(res))

          if(this.id){
            this.getTaskDetail()
          }
        }
      });
    },

    handleSelect(type){
      // 取消
      if(type == '1'){
        this.isSelectArea = false
      }
      // 确定
      if(type == '2'){
        let arr = []
        let names = []
        this.groupData.map(item => {
          item.forEach(it => {
            if(it.checked){
              arr.push(it.value)
              names.push(it.name)
            }
          })
        })
        this.form.empList = arr
        this.selectEmpNames = names.join(',')

        this.isSelectArea = false
      }

    },

    bindPickerChange(e) {
      console.log('选中的值为：' + this.array[e.mp.detail.value]);
      this.index = e.mp.detail.value
      this.form.pointConfigNo = this.jfList[this.index].id
    },

    handleSubmit(type){

      console.info('submit',this.form )


      if(!this.form.taskDesc || !this.form.taskTitle || !this.form.rewardPoint){
        this.errMsg = '请填写完整信息'
        this.errorTips = true
        setTimeout(()=>{
          this.errorTips = false
        },1000)
        return
      }

      if(!this.checkAllState){
        if(this.form.empList.length==0){
          this.errMsg = '请选择可见范围'
          this.errorTips = true
          setTimeout(()=>{
            this.errorTips = false
          },1000)
          return
        }
      }



      let params = {
        ...this.form,
        empNo: this.$store.state.userInfo.shopEmployee.id,
        selectAll: this.checkAllState
      }

      let url = '/manage/task/publishTask'
      if(type==2){
        params.taskNo = this.id
        url = '/manage/task/modifyTask'
      }


      const data = post(url, params).then((data)=>{
        if(data.success){
          wx.showToast({
            title: this.id?'修改成功':'创建成功',
            icon: 'success',
            duration: 1000,
            success(){

            }
          })
          setTimeout(()=>{
            wx.navigateBack({
              url: '/pages/my-task-manage/main'
            })
          },1000)
        }
      });
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

<template>
  <div class="page">


    <div class="tab-wrapper">
      <div class="weui-flex tab-fixed">
        <div class="weui-flex__item">
          <picker @change="bindApplicationChange" :value="index" :range="enumApplication">
            <div class="tab-title" style="font-size: 13px;">{{typeStr}}<ins></ins></div>
          </picker>
        </div>
        <div class="weui-flex__item">
          <!-- <div class="tab-title" @click="handleScorSelect">{{score}}<ins></ins></div> -->
          <picker @change="bindStateChange" :value="stateIndex" :range="enumState">
            <div class="tab-title" style="font-size: 13px;">{{stateStr}}<ins></ins></div>
          </picker>
        </div>
        <div class="weui-flex__item">
          <picker class="weui-btn" mode="date" :value="startDate" @change="bindStartDateChange">
            <div class="tab-title" style="font-size: 13px;">{{startDate?startDate:'开始日期'}}<ins></ins></div>
          </picker>
        </div>
        <div class="weui-flex__item">
          <picker class="weui-btn" mode="date" :value="endDate" @change="bindEndDateChange">
            <div class="tab-title"  style="font-size: 13px;">{{endDate?endDate:'结束日期'}}<ins></ins></div>
          </picker>
        </div>
      </div>
    </div>


    <div class="content">
      <template v-if="list.length">
        <div v-for="(item, index) in list" :key="index">

          <navigator v-if="item.applyType=='VACATION'" :url="'/pages/my-application-holiday-detail/main?id='+item.applyNo" class="weui-cell weui-cell_access nav-p0" hover-class="weui-cell_active">
            <div class="weui-form-preview">
              <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">申请类型</div>
                  <div class="weui-form-preview__value_in-hd">请假</div>
                  <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                </div>
              </div>
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">状态</div>
                  <div class="weui-form-preview__value">{{enumStateObj[item.status]}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">开始时间</div>
                  <div class="weui-form-preview__value">{{item.vacation.begin}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">结束时间</div>
                  <div class="weui-form-preview__value">{{item.vacation.end}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">共计</div>
                  <div class="weui-form-preview__value">{{item.vacation.days}}天</div>
                </div>
              </div>
              <!-- <div>
                <div class="weui-flex">
                  <div class="weui-flex__item" style="padding: 20rpx;">
                    <button class="weui-btn" type="warn" plain="true">删除</button>
                  </div>
                  <div class="weui-flex__item" style="padding: 20rpx;">
                    <button class="weui-btn" type="primary" plain="true" @click="handleEditTask">修改</button>
                  </div>
                </div>
              </div> -->
            </div>
          </navigator>


          <navigator v-if="item.applyType=='SERVICE_ITEM'" :url="'/pages/my-project-state/main?id='+item.serviceItem.serviceRecordNo" class="weui-cell weui-cell_access nav-p0" hover-class="weui-cell_active">
            <div class="weui-form-preview">
              <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">申请类型</div>
                  <div class="weui-form-preview__value_in-hd">项目申报</div>
                  <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                </div>
              </div>
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">状态</div>
                  <div class="weui-form-preview__value">{{enumStateObj[item.status]}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">项目名称</div>
                  <div class="weui-form-preview__value">{{item.serviceItem.itemName}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">项目日期</div>
                  <div class="weui-form-preview__value">{{item.serviceItem.itemDate}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">申报积分</div>
                  <div class="weui-form-preview__value">{{item.serviceItem.applyPoint}}</div>
                </div>
              </div>
              <!-- <div>
                <div class="weui-flex">
                  <div class="weui-flex__item" style="padding: 20rpx;">
                    <button class="weui-btn" type="warn" plain="true">删除</button>
                  </div>
                  <div class="weui-flex__item" style="padding: 20rpx;">
                    <button class="weui-btn" type="primary" plain="true" @click="handleEditTask">修改</button>
                  </div>
                </div>
              </div> -->
            </div>
          </navigator>


          <navigator v-if="item.applyType=='SAL_PERF'" :url="'/pages/my-target/main?id='+item.salesPerformance.salesPerfNo" class="weui-cell weui-cell_access nav-p0" hover-class="weui-cell_active">
            <div class="weui-form-preview">
              <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">申请类型</div>
                  <div class="weui-form-preview__value_in-hd">业绩申请</div>
                  <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                </div>
              </div>
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">业绩名称</div>
                  <div class="weui-form-preview__value">{{item.salesPerformance.name}}</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">业绩金额</div>
                  <div class="weui-form-preview__value">{{item.salesPerformance.targetAmount}}元</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">状态</div>
                  <div class="weui-form-preview__value">{{enumStateObj[item.status]}}</div>
                </div>
              </div>
              <!-- <div>
                <div class="weui-flex">
                  <div class="weui-flex__item" style="padding: 20rpx;">
                    <button class="weui-btn" type="warn" plain="true">删除</button>
                  </div>
                  <div class="weui-flex__item" style="padding: 20rpx;">
                    <button class="weui-btn" type="primary" plain="true" @click="handleEditTask">修改</button>
                  </div>
                </div>
              </div> -->
            </div>
          </navigator>


          <navigator v-if="item.applyType=='NORMAL'" :url="'/pages/my-application-else-detail/main?id='+item.applyNo" class="weui-cell weui-cell_access nav-p0" hover-class="weui-cell_active">
            <div class="weui-form-preview">
              <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">申请类型</div>
                  <div class="weui-form-preview__value_in-hd">申请</div>
                  <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                </div>
              </div>
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">状态</div>
                  <div class="weui-form-preview__value" style="color: #f00;">{{enumStateObj[item.status]}}</div>
                </div>
                <!-- <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">开始日期</div>
                  <div class="weui-form-preview__value">2019-10-11</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">结束日期</div>
                  <div class="weui-form-preview__value">2019-10-11</div>
                </div> -->
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">申请内容</div>
                  <div class="weui-form-preview__value">{{item.normal.content}}</div>
                </div>
              </div>
              <!-- <div>
                <div class="weui-flex">
                  <div class="weui-flex__item" style="padding: 20rpx;">
                    <button class="weui-btn" type="warn" plain="true">删除</button>
                  </div>
                  <div class="weui-flex__item" style="padding: 20rpx;">
                    <button class="weui-btn" type="primary" plain="true" @click="handleEditTask">修改</button>
                  </div>
                </div>
              </div> -->
            </div>
          </navigator>


          <div v-if="item.applyType=='TASK_RECORD'" class="weui-cell weui-cell_access nav-p0" hover-class="weui-cell_active">
            <div class="weui-form-preview">
              <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">申请类型</div>
                  <div class="weui-form-preview__value_in-hd">任务完成申请</div>
                  <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                </div>
              </div>
              <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">状态</div>
                  <div class="weui-form-preview__value" style="color: #f00;">{{enumStateObj[item.status]}}</div>
                </div>
                <!-- <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">开始日期</div>
                  <div class="weui-form-preview__value">2019-10-11</div>
                </div>
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">结束日期</div>
                  <div class="weui-form-preview__value">2019-10-11</div>
                </div> -->
                <div class="weui-form-preview__item">
                  <div class="weui-form-preview__label">申请内容</div>
                  <div class="weui-form-preview__value" v-html="item.normal.content"></div>
                </div>
              </div>
              <!-- <div>
                <div class="weui-flex">
                  <div class="weui-flex__item" style="padding: 20rpx;">
                    <button class="weui-btn" type="warn" plain="true">删除</button>
                  </div>
                  <div class="weui-flex__item" style="padding: 20rpx;">
                    <button class="weui-btn" type="primary" plain="true" @click="handleEditTask">修改</button>
                  </div>
                </div>
              </div> -->
            </div>
          </div>


        </div>
        <div class="no-more" v-if="list.length >= totalCount">没有更多了</div>
      </template>
      <no-data v-else></no-data>
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSelect">申 请</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, queryParams } from "../../utils";
import noData from '@/components/no-data'
// import { mapState, mapMutations } from "vuex";
let enumApplicationList = [
  {
    text:'全部申请',
    value: null
  },
  {
    text:'任务完成',
    value: 'TASK_RECORD'
  },
  {
    text: '业绩完成',
    value: 'SAL_PERF'
  },
  {
    text:'项目完成',
    value: 'SERVICE_ITEM'
  },
  {
    text:'请假申请',
    value: 'VACATION'
  },
  {
    text:'申请',
    value: 'NORMAL'
  },
  {
    text:'外勤打卡',
    value: 'OUTSIDE_SIGN'
  }
]

let enumStateList = [
  {
    text:'全部状态',
    value: null
  },
  {
    text:'待审批',
    value: 'NEW'
  },
  {
    text:'已撤回',
    value: 'REVERTED'
  },
  {
    text:'审批通过',
    value: 'PASSED'
  },
  {
    text:'审批拒绝',
    value: 'REFUSED'
  }
]

let enumApplication = ['全部申请','任务完成','业绩完成', '项目完成','请假申请','申请','外勤打卡'];
let enumState = ['全部状态','待审批', '已撤回', '已通过','已拒绝']
let enumApplicationType = ['请假申请','其它申请']
export default {
  onShow() {
    let applyType = wx.getStorageSync('application-type')
    wx.removeStorageSync('application-type')
    if(applyType){
      this.$nextTick(()=>{
        if(applyType == 'VACATION'){
          this.index = 4
        }
        if(applyType == 'NORMAL'){
          this.index = 5
        }
        if(applyType == 'SERVICE_ITEM'){
          this.index = 3
        }
        if(applyType == 'SAL_PERF'){
          this.index = 2
        }
        this.typeStr = this.enumApplication[this.index];
        this.type = enumApplicationList[this.index].value

        this.getData()
      })
    }else{
      this.getData()
    }
  },
  components: {
    noData
  },
  //上拉加载
  onReachBottom() {
    if(this.list.length < this.totalCount) {
      this.getData(true)
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.getData()
  },
  data() {
    return {
      getDataState: false,
      stateIndex : 0,
      // role: '',
      index: 0,
      enumApplication,
      enumState,
      typeStr: enumApplication[0],
      stateStr: enumState[0],
      enumApplicationType,
      applyType:'',

      enumStateObj: {
        'NEW': '待审批',
        'REVERTED': '已撤回',
        'PASSED': '审批通过',
        'REFUSED': '审批拒绝'
      },

      startDate: null,
      endDate: null,
      type: null,
      state: null,

      list: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
    };
  },

  watch: {
    startDate(){
      this.getData()
    },
    endDate(){
      this.getData()
    },
    type(){
      if(this.getDataState){
        return
      }
      this.getData()
    },
    state(){
      this.getData()
    }
  },

  mounted() {
    // this.applyType = this.$root.$mp.query.applyType;
    // if(this.applyType == 'VACATION'){
    //   this.application = enumApplication[1]
    // }
    // if(this.applyType == 'SERVICE_ITEM'){
    //   this.application = enumApplication[2]
    // }
    // if(this.applyType == 'SALES_PERF'){
    //   this.application = enumApplication[3]
    // }
    // if(this.applyType == 'ELSE'){
    //   this.application = enumApplication[4]
    // }
    // console.info(this.applyType)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();

  },
  computed: {

  },
  methods: {
    handleSelect(){
      wx.showActionSheet({
        itemList: this.enumApplicationType,
        success: function (res) {
          if(res.tapIndex == 0){
            wx.navigateTo({
              url: "/pages/my-application-holiday/main?type=VACATION"
            });
          }else{
            wx.navigateTo({
              url: "/pages/my-application-else/main?type=NORMAL"
            });
          }
        }
      });
    },

    handleEditTask(){
      wx.navigateTo({
        url: "/pages/my-task-operate/main?id=2&type=edit"
      });
    },


    // bindTypeChange(e) {
    //   console.log('选中的值为：' + this.enumApplicationType[e.mp.detail.value]);
    // },

    bindStartDateChange(e) {
      this.startDate = e.mp.detail.value;
    },
    bindEndDateChange(e) {
      this.endDate = e.mp.detail.value;
    },

    bindApplicationChange(e) {
      this.typeStr = this.enumApplication[e.mp.detail.value];
      this.type = enumApplicationList[e.mp.detail.value].value
    },

    bindStateChange(e) {
      this.stateStr = enumStateList[e.mp.detail.value].text;
      this.state = enumStateList[e.mp.detail.value].value;
    },



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

    async getData(append) {
      this.getDataState = true
      append?(this.currentPage++):(this.currentPage=1)
      let queryObj = {
        empNo: this.$store.state.userInfo.shopEmployee.id,
        applyType: this.type,
        status: this.state,
        begin: this.startDate ? this.startDate : null,
        end: this.endDate ? this.endDate : null,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      console.info('queryObj',queryParams(queryObj))
      const data = await post(`/myApply/listApply?${queryParams(queryObj)}`);
      if(data.success){
        this.list = append ? this.list.concat((data.result) || []) : (data.result || [])
        this.totalCount = data.total
        this.getDataState = false
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

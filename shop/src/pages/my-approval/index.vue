<template>
  <div class="page">


    <div class="tab-wrapper">
      <div class="weui-flex tab-fixed">
        <div class="weui-flex__item">
          <picker @change="bindApplicationChange" :value="index" :range="enumApplication">
            <div class="tab-title" style="font-size: 13px;">{{application}}<ins></ins></div>
          </picker>
        </div>
        <div class="weui-flex__item">
          <!-- <div class="tab-title" @click="handleScorSelect">{{score}}<ins></ins></div> -->
          <picker @change="bindStateChange" :value="index" :range="enumState">
            <div class="tab-title" style="font-size: 13px;">{{state}}<ins></ins></div>
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
      <navigator url="/pages/my-application-holiday-detail/main" class="weui-cell weui-cell_access nav-p0" hover-class="weui-cell_active">
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
              <div class="weui-form-preview__value">待审批</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">开始时间</div>
              <div class="weui-form-preview__value">2019-10-11 18:12:23</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">结束时间</div>
              <div class="weui-form-preview__value">2019-10-11 18:12:23</div>
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

      <navigator url="/pages/my-application-holiday-detail/main" class="weui-cell weui-cell_access nav-p0" hover-class="weui-cell_active">
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
              <div class="weui-form-preview__value" style="color: #09BB07;">已通过</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">开始时间</div>
              <div class="weui-form-preview__value">2019-10-11 18:12:23</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">结束时间</div>
              <div class="weui-form-preview__value">2019-10-11 18:12:23</div>
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

      <navigator url="/pages/my-application-else-detail/main" class="weui-cell weui-cell_access nav-p0" hover-class="weui-cell_active">
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
              <div class="weui-form-preview__value">待审批</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">项目名称</div>
              <div class="weui-form-preview__value">颈部护理按摩</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">项目日期</div>
              <div class="weui-form-preview__value">2019-10-11</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">申报积分</div>
              <div class="weui-form-preview__value">50</div>
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

      <navigator url="/pages/my-application-else-detail/main" class="weui-cell weui-cell_access nav-p0" hover-class="weui-cell_active">
        <div class="weui-form-preview">
          <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">申请类型</div>
              <div class="weui-form-preview__value_in-hd">目标申报</div>
              <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </div>
          </div>
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">状态</div>
              <div class="weui-form-preview__value">待审批</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">申报名称</div>
              <div class="weui-form-preview__value">卖了一个面部护理项目</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">完成日期</div>
              <div class="weui-form-preview__value">2019-10-11</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">申报积分</div>
              <div class="weui-form-preview__value">50</div>
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

      <navigator url="/pages/my-application-else-detail/main" class="weui-cell weui-cell_access nav-p0" hover-class="weui-cell_active">
        <div class="weui-form-preview">
          <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">申请类型</div>
              <div class="weui-form-preview__value_in-hd">出差申请</div>
              <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </div>
          </div>
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">状态</div>
              <div class="weui-form-preview__value" style="color: #f00;">已拒绝</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">开始日期</div>
              <div class="weui-form-preview__value">2019-10-11</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">结束日期</div>
              <div class="weui-form-preview__value">2019-10-11</div>
            </div>
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">出差人数</div>
              <div class="weui-form-preview__value">5</div>
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

    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSelect">申 请</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";

let enumApplication = ['全部申请','请假申请', '项目申请'];
let enumState = ['全部状态','待审批', '已通过','未通过', '已撤回']
let enumApplicationType = ['请假申请','其它申请']
export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',
      index: 0,
      enumApplication,
      enumState,
      application: enumApplication[0],
      state: enumState[0],
      startDate: '',
      endDate: '',
      enumApplicationType
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
    handleSelect(){
      wx.showActionSheet({
        itemList: this.enumApplicationType,
        success: function (res) {
          if(res.tapIndex == 0){
            wx.navigateTo({
              url: "/pages/my-application-holiday/main"
            });
          }else{
            wx.navigateTo({
              url: "/pages/my-application-else/main"
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


    bindTypeChange(e) {
      console.log('选中的值为：' + this.enumApplicationType[e.mp.detail.value]);
    },

    bindStartDateChange(e) {
      this.startDate = e.mp.detail.value;
    },
    bindEndDateChange(e) {
      this.endDate = e.mp.detail.value;
    },

    bindApplicationChange(e) {
      this.application = this.enumApplication[e.mp.detail.value];
    },

    bindStateChange(e) {
      this.state = this.enumState[e.mp.detail.value];
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

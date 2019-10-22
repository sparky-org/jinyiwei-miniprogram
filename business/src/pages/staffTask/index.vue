<template>
  <div class="staff_task">

    <div class="date_wrapper">
      <!-- <picker class="weui-btn" mode="date" :value="date" start="2015-09-01" end="2027-09-10" @change="bindDateChange"> -->
      <picker class="weui-btn" mode="date" :value="date" @change="bindDateChange">
        <button type="default">{{date}}</button>
      </picker>
    </div>

    <template v-if="list.length > 0">
      <div class="weui-form-preview" v-for="(item, index) in list" :key="index">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__label">任务名称</div>
          <div class="weui-form-preview__value_in-hd">{{item.taskName}}</div>
        </div>
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__label">任务内容</div>
          <div class="weui-form-preview__value_in-hd">{{item.condition}}</div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">到期时间</div>
            <div class="weui-form-preview__value">{{item.dateStr}}</div>
          </div>
        </div>
        <div class="weui-form-preview__ft" style="margin-top: -1px;" v-if="item.status=='UNCOMPLETED'">
          <!-- <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div> -->
          <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active" @click="handleAction(item,'done')">完成</div>
        </div>
      </div>
    </template>
    
    <div v-else>
      <div class="page__bd" style="padding-top: 150rpx; text-align: center;">
        <div class="icon-box">
          <icon type="info" size="93"></icon>
          <div class="icon-box__ctn">
            <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">暂无数据</div>
          </div>
        </div>
      </div>
    </div>




    <!-- <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">任务名称</div>
        <div class="weui-form-preview__value_in-hd">去NBA看比赛2</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">任务内容</div>
        <div class="weui-form-preview__value_in-hd">2019-09-10到2019-09-11看球一天</div>
      </div>
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">时&#12288;&#12288;间</div>
        <div class="weui-form-preview__value_in-hd">2019-09-10 9:00</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">时&#12288;&#12288;间</div>
          <div class="weui-form-preview__value">2019-09-10 9:00</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">同意</div>
      </div>
    </div> -->


  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, msToDate } from "../../utils";
// import { mapState, mapMutations } from "vuex";
let D = new Date()
let date = D.getFullYear() + '-' + (D.getMonth() + 1) + '-'+ D.getDate()
export default {
  onShow() {
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      date: date,
      list: []
    };
  },
  components: {},
  methods: {

    bindDateChange(e) {
      console.log('选中的日期为：' + e.mp.detail.value);
      this.date = e.mp.detail.value
      this.getData()
    },
    // ...mapMutations(["update"]),

    async handleAction(item, type){
      if(type == 'done'){
        wx.showModal({
          title: '提示',
          content: '确定完成任务了吗？',
          confirmText: "确定",
          cancelText: "取消",
          success: async (res) => {
            console.log(res);
            if (res.confirm) {
              // console.log('确定')
              const data = await post(`/shop/task/completeTask?employId=${this.$store.state.userInfo.employId}&taskId=${item.taskId}`);
              if(data.success){
                wx.showToast({
                  title: '操作成功',
                  icon: 'success',
                  duration: 2000,
                  success(){

                  }
                })
                setTimeout(()=>{
                   this.getData()
                },2000)
              }
            } else {
              console.log('取消')
            }
          }
        })
      }
    },

    async getData() {
      // console.info(12912912)
      //
      const data = await post(`/shop/task/queryMyTask?shopId=${this.$store.state.userInfo.shopId}&employId=${this.$store.state.userInfo.employId}&date=${this.date}`);
      if(data.success){
        if(data.result){
          data.result.forEach(item => {
            item.dateStr = msToDate(item.createTime)
          })
          this.list = data.result
        }else{
          this.list = []
        }
      }
      // this.banner = data.banner;
      // this.channel = data.channel;
      // this.brandList = data.brandList;
      // this.newGoods = data.newGoods;
      // this.hotGoods = data.hotGoods;
      // this.topicList = data.topicList;
      // this.newCategoryList = data.newCategoryList;
    },
    // goodsDetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/goods/main?id=" + id
    //   });
    // }
  },
  created() {
    // console.log(89128921982189)
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

<template>
  <div class="page">

    <template v-if="list.length">

      <div class="weui-form-preview" v-for="(item, index) in list" :key="index">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">类型</div>
            <div class="weui-form-preview__value_in-hd">{{item.name}}</div>
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">申请人</div>
            <div class="weui-form-preview__value">{{item.applyEmpName}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">审批人</div>
            <div class="weui-form-preview__value">{{item.auditEmpName}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">状态</div>
            <div class="weui-form-preview__value">{{item.statusDesc}}</div>
          </div>
          <div class="weui-form-preview__item">
            <div class="weui-form-preview__label">最后更新时间</div>
            <div class="weui-form-preview__value" style="color: #999;">{{item.lastModify}}</div>
          </div>
        </div>
        <!-- <div class="weui-form-preview__ft">
          <navigator url="" class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">操作</navigator>
        </div> -->
      </div>

      <div class="no-more" v-if="list.length >= totalCount">没有更多了</div>
    </template>
    <no-data v-else></no-data>


    <!-- <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSign">确 定</button>
    </div> -->

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, queryParams } from "../../utils";
import noData from '@/components/no-data'
// import { mapState, mapMutations } from "vuex";


export default {
  onShow() {
    this.getData()
  },
  components: {
    noData
  },
  data() {
    return {
      beginDate: '',

      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      list: []
    };
  },

  mounted() {
    // this.calendar.jump(2021, 10);
    // this.id = this.$root.$mp.query.id;
    // console.info(this.id)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

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

  methods: {

    async getData(append) {
      if(append){
        this.currentPage++
      }else{
        this.currentPage = 1
      }
      let params = {
        "currentPage": this.currentPage,
        "pageSize": this.pageSize,
        "empNo": this.$store.state.userInfo.shopEmployee.id
      }
      console.info('queryParams(params)',queryParams(params))
      const data = await post(`/myApply/ccToMe?${queryParams(params)}`);
      if(data.success){
        this.totalCount = data.total
        this.list = append ? this.list.concat((data.result) || []) : (data.result || [])
      }
    },


    // bindBeginChange(e) {
    //   console.log('选中的时间为：' + e.mp.detail.value);
    //   this.beginDate = e.mp.detail.value
    // },
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
    // handleSign() {
    //   wx.navigateTo({
    //     url: "/pages/my-sign/main?"
    //   });
    // }
  },
  created() {

  }
};
</script>

<style lang='scss'>
  @import "./style.scss";
</style>

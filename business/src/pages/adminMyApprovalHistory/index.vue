<template>
  <div class="my_approval-history">
    <template v-if="list.length > 0">

      <div class="weui-form-preview" v-for="(item, index) in list" :key="index">
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__label">申请人</div>
          <div class="weui-form-preview__value_in-hd">{{item.applyEmpName}}</div>
        </div>
        <template v-if="item.applyType=='HOLIDAY'">
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">申请内容</div>
              <div class="weui-form-preview__value">请假，请假日期：{{item.begin}}，共{{item.duration}}天</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <div class="weui-form-preview__label">申请内容</div>
              <div class="weui-form-preview__value">请款，共计：{{item.amount}}元</div>
            </div>
          </div>
        </template>

        <div class="weui-form-preview__ft">
          <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">{{item.statusStr}}</div>
        </div>
      </div>

    <!-- <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请人</div>
        <div class="weui-form-preview__value_in-hd">张三</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请内容</div>
          <div class="weui-form-preview__value">2019-09-10到2019-09-11请假一天</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">已完成</div>
      </div>
    </div> -->

    <!-- <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请人</div>
        <div class="weui-form-preview__value_in-hd">张三</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请内容</div>
          <div class="weui-form-preview__value">2019-09-10到2019-09-11请假一天</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">已完成</div>
      </div>
    </div> -->
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
    this.getData();
  },
  data() {
    return {
      list: [],
      enum: {
        'NEW': '待审批',
        'REFUSED': '已拒绝',
        'APPROVED': '已通过',
        'CANCELED': '已取消'
      }
    };
  },
  components: {},
  methods: {
    // ...mapMutations(["update"]),
    async getData() {
      const data = await post(`/shop/apply/getHistoryApplyList`, {
        "shopId": this.$store.state.userInfo.shopId,
        "currentPageIndex": 1,
        "pageSize": 1000000,
      })
      if(data.success){
        if(data.result){
          data.result.forEach(item => {
            item.statusStr = this.enum[item.status]
          })
          this.list = data.result
        }else{
          this.list = []
        }
      }

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

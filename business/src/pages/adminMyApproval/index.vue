<template>
  <div class="my_approval">

    <div class="history">
      <navigator class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active" url="/pages/adminMyApprovalHistory/main">审批历史 ></navigator>
    </div>


    <div class="weui-form-preview" v-if="list.length" v-for="(item, index) in list" :key="index">

          <template v-if="item.applyType=='MONEY'">
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">申请人</div>
              <div class="weui-form-preview__value_in-hd">{{item.applyEmpName}}</div>
            </div>
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">申请类型</div>
              <div class="weui-form-preview__value_in-hd">{{item.applyTypeName}}</div>
            </div>
            <div class="weui-form-preview__bd">
              <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">申请内容</div>
                <div class="weui-form-preview__value">{{item.reason}}</div>
              </div>
            </div>
            <div class="weui-form-preview__ft">
              <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active" @click="handleAction(item, false)">驳回</div>
              <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active" @click="handleAction(item, true)">批准</div>
            </div>
          </template>
          <template v-if="item.applyType=='HOLIDAY'">
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">申请人</div>
              <div class="weui-form-preview__value_in-hd">{{item.applyEmpName}}</div>
            </div>
            <div class="weui-form-preview__hd">
              <div class="weui-form-preview__label">申请类型</div>
              <div class="weui-form-preview__value_in-hd">{{item.applyTypeName}}</div>
            </div>
            <div class="weui-form-preview__bd">
              <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">申请内容</div>
                <div class="weui-form-preview__value">{{item.reason}}，请假日期:{{item.begin}}，共{{item.duration}}天</div>
              </div>
            </div>
            <div class="weui-form-preview__ft">
              <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active" @click="handleAction(item, false)">驳回</div>
              <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active" @click="handleAction(item, true)">批准</div>
            </div>
          </template>

        </div>

        <div v-if="list.length == 0">
          <div class="page__bd" style="padding-top: 150rpx; text-align: center;">
            <div class="icon-box">
              <icon type="info" size="93"></icon>
              <div class="icon-box__ctn">
                <div class="icon-box__desc" style="padding-top: 20rpx; font-size: 16px;">暂无数据</div>
              </div>
            </div>
          </div>
        </div>

    <!-- <div class="weui-form-preview" v-for="(item, index) in list" :key="index">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__label">申请人</div>
        <div class="weui-form-preview__value_in-hd">{{item.applyUserName}}</div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">申请内容</div>
          <div class="weui-form-preview__value">2019-09-10到2019-09-11请假一天</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">同意</div>
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
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">同意</div>
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
        <div class="weui-form-preview__btn weui-form-preview__btn_default" hover-class="weui-form-preview__btn_active">拒绝</div>
        <div class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">同意</div>
      </div>
    </div> -->

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
    };
  },
  components: {},
  methods: {
    handleAction(item, state){
      wx.showModal({
        title: '提示',
        content: state ? '确定批准吗？' : '确定驳回吗？',
        confirmText: "确定",
        cancelText: "取消",
        success: async (res) => {
          console.log(res);
          if (res.confirm) {
            console.log('确定')
            const data = await post(`/shop/apply/approve?workflowId=${item.workflowId}&result=${state}`);
            if(data.success){
              wx.showToast({
                title: state ? '操作成功' : '操作成功',
                icon: 'success',
                duration: 2000,
                success(){

                }
              })
              this.getData()
            }
          } else {
            console.log('取消')
          }
        }
      })

    },
    // ...mapMutations(["update"]),
    async getData() {
      const data = await post(`/shop/apply/getApplyList`, {
        "shopId": this.$store.state.userInfo.shopId,
        "currentPageIndex": 1,
        "pageSize": 1000000,
      })
      if(data.success){
        this.list = data.result ? data.result : []
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

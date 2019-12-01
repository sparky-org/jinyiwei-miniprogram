<template>
  <div class="page">

    <div class="weui-toptips weui-toptips_warn" v-if="errorTips">请填写公告内容</div>

    <div class="weui-cells__title"><span class="required">*</span>公告</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea :disabled="!canEdit" placeholder="请输入公告" style="height: 9.9em; width: 100%;" v-model="noticeText" />
          <!-- <div class="weui-textarea-counter">0/200</div> -->
        </div>
      </div>
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" v-if="canEdit" @click="handleSubmit">保 存</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
    this.getPoster()
  },
  components: {

  },
  data() {
    return {
      // role: '',
      errorTips: false,
      noticeText: '',

      canEdit: false,
      noticeNo: null
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

    async getPoster(){
      const data = await post(`/notice/viewNotice?empNo=${this.$store.state.userInfo.shopEmployee.id}&shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`);
      if(data.success){
        this.canEdit = data.result.canEdit
        this.noticeText = data.result.content
        this.noticeNo = data.result.noticeNo
      }
    },

    async handleSubmit(){
      if(!this.noticeText){
        this.errorTips = true
        setTimeout(()=>{
          this.errorTips = false
        },1000)
        return
      }

      let param = {
        "content": this.noticeText,
        "empNo": this.$store.state.userInfo.shopEmployee.id
      }
      if(this.noticeNo){
        param.noticeNo = this.noticeNo
      }
      const data = await post(`/notice/publishNotice`,param);
      if(data.success){
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000,
          success(){

          }
        })
        setTimeout(()=>{
          wx.reLaunch({
            url: "/pages/workBench/main"
          });
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

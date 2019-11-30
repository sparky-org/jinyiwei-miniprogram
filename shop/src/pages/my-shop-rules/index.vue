<template>
  <div class="page">

    <div class="weui-toptips weui-toptips_warn" v-if="errorTips">请输入店内制度</div>

    <div class="weui-cells__title"><span class="required">*</span>店内制度</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="" placeholder="请输入店内制度" v-model="ruleText" style="height: 9.9em; width: 100%;" />
          <!-- <div class="weui-textarea-counter">0/200</div> -->
        </div>
      </div>
    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSubmit">保 存</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post} from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',
      errorTips: false,
      ruleText: ''
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

    async handleSubmit(){
      if(!this.ruleText){
        this.errorTips = true
        return
      }
      const data = await post(`/companySystem/publishSystem`,{
        "content": this.ruleText,
        "empNo": this.$store.state.userInfo.shopEmployee.id
      });
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

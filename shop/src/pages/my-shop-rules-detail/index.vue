<template>
  <div class="page">

    <div class="weui-toptips weui-toptips_warn" v-if="errorTips">请输入完整信息</div>

    <!-- <div class="weui-cells__title"><span class="required" v-if="canEdit">*</span>店内制度</div> -->
    <div class="weui-cells weui-cells_after-title" v-if="canEdit">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>制度标题</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="title" style="font-size: 14px;" placeholder="请输入标题" />
        </div>
      </div>
    </div>


    <div class="weui-cells weui-cells_after-title no-t-b">
      <!-- <div class="weui-cell">
        <div class="weui-cell__bd">
           <input class="weui-input" v-model="title" placeholder="请输入标题" />
        </div>
      </div> -->



      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea :disabled="!canEdit" maxlength="10000000" :auto-height="true" :placeholder="canEdit?'请输入店内制度':''" v-model="ruleText"  style="min-height: 9.9em; width: 100%; font-size: 16px;" />
          <!-- <div class="weui-textarea-counter">0/200</div> -->
        </div>
      </div>
    </div>

    <div class="operate-btn" v-if="canEdit">
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
    this.id = this.$root.$mp.query.id;
    if(this.id){
      this.getDetail()
    }

  },
  components: {

  },
  data() {
    return {
      id: null,
      title: '',
      // role: '',
      errorTips: false,
      ruleText: '',

      // canEdit: false,
      // companySystemNo: null
    };
  },

  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {
    canEdit(){
      return this.$store.state.userInfo.shopEmployee.isAdmin
    }
  },
  methods: {

    async getDetail(){
      const data = await post(`/companySystem/viewSystem?empNo=${this.$store.state.userInfo.shopEmployee.id}&articleNo=${this.id}`);
      if(data.success){
        if(data.result){
          // this.canEdit = data.result.canEdit
          // this.ruleText = data.result.content
          // this.companySystemNo = data.result.companySystemNo
          this.title = data.result.title
          this.ruleText = data.result.content
          if(!this.canEdit){
            wx.setNavigationBarTitle({
              title: this.title
            })
          }
        }
      }
    },

    async handleSubmit(){
      if(!this.ruleText || !this.title){
        this.errorTips = true
        setTimeout(()=>{
          this.errorTips = false
        },1000)
        return
      }

      let param = {
        "content": this.ruleText,
        "empNo": this.$store.state.userInfo.shopEmployee.id,
        title: this.title
      }
      if(this.id){
        param.articleNo = this.id
      }

      const data = await post(`/companySystem/publishSystem`,param);
      if(data.success){
        wx.showToast({
          title: this.id ? '修改成功' : '新增成功',
          icon: 'success',
          duration: 2000,
          success(){

          }
        })
        setTimeout(()=>{
          wx.navigateBack({
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

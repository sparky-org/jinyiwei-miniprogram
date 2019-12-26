<template>
  <div class="page" :class="{'isAdmin': !isAdmin}">
    <div v-for="(item, index) in list" :key="index">
      <i-swipeout  i-class="i-swipeout-relus-item" operateWidth="80" :unclosable="true" :toggle="toggle">
        <view slot="content" @click="handleAdd(item.companySystemNo)">
           <dl>
             <dt style="color: #000; font-size: 36rpx; padding: 8rpx 0 2rpx 0;">{{item.title}}</dt>
             <dd style="color: #ccc;">{{item.createDate}}</dd>
           </dl>
        </view>
        <view slot="button" class="i-swipeout-button-group">
            <!-- <view class="i-swipeout-demo-button" style="width:60px"><i-icon size="32" type="like_fill" @click="handleClick(1)"></i-icon></view> -->
            <!-- <view class="i-swipeout-demo-button" style="width:60px"><i-icon size="32" type="share_fill" @click="handleClick(2)"></i-icon></view> -->
            <view class="delete" style="width:80px" @click="handleDelete(item)">删除</view>
        </view>
      </i-swipeout>
    </div>

    <div class="operate-btn" v-if="isAdmin">
      <button class="weui-btn" type="primary" @click="handleAdd(null)">新增制度</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post} from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
    this.getPoster()
  },
  components: {

  },
  data() {
    return {
      toggle: false,
      list: [],
      // role: '',
      // errorTips: false,
      // ruleText: '',

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
    isAdmin(){
      return this.$store.state.userInfo.shopEmployee.isAdmin
    }
  },
  methods: {

    handleDelete(item){

      wx.showModal({
        title: '提示',
        content: '确定要删除此制度吗？',
        // confirmText: "主操作",
        // cancelText: "辅助操作",
        success: async (res) => {
          console.log(res);
          if (res.confirm) {
            const data = await post("/companySystem/deleteSystem?empNo=" + this.$store.state.userInfo.shopEmployee.id+'&articleNo='+item.companySystemNo);
            if(data.success){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000,
                success(){

                }
              })
              this.toggle = !this.toggle
              this.getPoster()
            }
          } else {
            console.log('用户点击辅助操作')
          }
        }
      });



    },

    async getPoster(){
      const data = await post(`/companySystem/listSystem?shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`);
      if(data.success){
        if(data.result){
          // this.canEdit = data.result.canEdit
          // this.ruleText = data.result.content
          // this.companySystemNo = data.result.companySystemNo
          this.list = data.result || []
        }
      }
    },

    handleAdd(id){
      if(id){
        wx.navigateTo({
          url: "/pages/my-shop-rules-detail/main?id="+id
        });
      }else{
        wx.navigateTo({
          url: "/pages/my-shop-rules-detail/main"
        });
      }
    },

    // async handleSubmit(){
    //   if(!this.ruleText){
    //     this.errorTips = true
    //     setTimeout(()=>{
    //       this.errorTips = false
    //     },1000)
    //     return
    //   }

    //   let param = {
    //     "content": this.ruleText,
    //     "empNo": this.$store.state.userInfo.shopEmployee.id
    //   }
    //   if(this.companySystemNo){
    //     param.noticeNo = this.companySystemNo
    //   }

    //   const data = await post(`/companySystem/publishSystem`,param);
    //   if(data.success){
    //     wx.showToast({
    //       title: '发布成功',
    //       icon: 'success',
    //       duration: 2000,
    //       success(){

    //       }
    //     })
    //     setTimeout(()=>{
    //       wx.navigateBack({
    //         url: "/pages/workBench/main"
    //       });
    //     },1000)
    //   }
    // }


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

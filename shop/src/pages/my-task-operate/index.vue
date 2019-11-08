<template>
  <div class="page">

     <div class="weui-toptips weui-toptips_warn" v-if="errorTips">错误提示</div>

     <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>任务标题</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入任务标题" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>积分类型</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请选择积分类型" />
          <div class="weui-cell__ft weui-cell__ft_in-access" style="top: -35rpx"></div>
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>个数限制</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入个数限制" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">可见范围</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请选择可见范围" />
          <div class="weui-cell__ft weui-cell__ft_in-access" style="top: -35rpx"></div>
        </div>
      </div>


    </div>

    <div class="weui-cells__title"><span class="required">*</span>任务描述</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="" placeholder="请输入任务描述" style="height: 3.3em" />
          <!-- <div class="weui-textarea-counter">0/200</div> -->
        </div>
      </div>
    </div>

    <div class="operate-btn" v-if="type!='see'">
      <button class="weui-btn" type="primary" v-if="type=='add'">提交</button>
      <button class="weui-btn" type="primary" v-if="type=='edit'">修改</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
    this.id = this.$root.$mp.query.id;
    this.type = this.$root.$mp.query.type;
    console.info(this.type)
    if(this.type == 'edit'){
      wx.setNavigationBarTitle({
        title: '修改任务'
      })
    }
    if(this.type == 'add'){
      wx.setNavigationBarTitle({
        title: '发布任务'
      })
    }
    if(this.type == 'see'){
      wx.setNavigationBarTitle({
        title: '任务详情'
      })
    }
  },
  components: {

  },
  data() {
    return {
      // role: '',
      type: '',
      id: null,
      errorTips: false
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

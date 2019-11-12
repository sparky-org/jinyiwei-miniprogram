<template>
  <div class="page">
    <div class="weui-cells weui-cells_after-title">
      <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd"><i class="iconfont iconai-user" style="display: inline-block; color: #10AEFF;"></i> 已提交，待[<span style="color: #10AEFF; margin: 0 8rpx;">张总</span>]审批</div>
        <div class="weui-cell__ft weui-cell__ft_in-access">2019-10-11 19:12:38</div>
      </navigator>
    </div>
    <div class="weui-form-preview" style="margin-bottom: 20rpx;">

      <div class="weui-cells weui-cells_after-title no-t">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>申报标题</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入申报标题" value="1" />
          </div>
        </div>



        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>申报项目</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入申报目标" value="1" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>客户姓名</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入客户姓名" value="1" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>完成时间</div>
          </div>
          <div class="weui-cell__bd">
            <picker class="weui-btn" mode="date" :value="date" @change="bindTimeChange">
              <input class="weui-input" placeholder="请输入完成时间" value="1" />
            </picker>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>申报奖励</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入申报奖励" value="1" />
          </div>
        </div>

        <!-- <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>审批人</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入审批人" value="1" />
          </div>
        </div> -->

        <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label"><span class="required">*</span>申报内容</div>
            </div>
            <div class="weui-cell__bd" style="padding: 20rpx 0;">
              <textarea class="" placeholder="请输入申报内容" style="height: 3.3em; width: 100%;" v-model="noticeText" />
            </div>
          </div>
        </div>

        <div class="page__bd">
          <div class="weui-cells no-t" style="margin-top: 0;">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <div class="weui-uploader__title">抄送人(默认不抄送)</div>
                    <!-- <div class="weui-uploader__info">{{files.length}}/2</div> -->
                  </div>
                  <div class="weui-uploader__bd">
                    <div class="weui-uploader__files">
                      <div class="weui-uploader__file">袁凯,刘德华</div>
                      <i class="iconfont iconjia"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    <div class="operate-btn">
      <button class="weui-btn" type="warn" @click="handleAdd">撤 回</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',
      noticeText: '1212',
      date: ''
    };
  },

  mounted() {
    // this.id = this.$root.$mp.query.id;
    // console.info(this.id)
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
  },
  computed: {

  },
  methods: {

    bindTimeChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
    },
    handleAdd(){
      // wx.navigateTo({
      //   url: "/pages/my-score-operate/main"
      // });
    }

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

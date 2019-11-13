<template>
  <div class="page">
    <div class="weui-cells weui-cells_after-title">
      <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd"><i class="iconfont iconai-user" style="display: inline-block; color: #10AEFF;"></i> 已提交，待[<span style="color: #10AEFF; margin: 0 8rpx;">张总</span>]审批</div>
        <div class="weui-cell__ft weui-cell__ft_in-access">2019-10-11 19:12:38</div>
      </navigator>
    </div>
    <div class="weui-form-preview no-t" style="margin-bottom: 20rpx;">

      <div class="weui-cells weui-cells_after-title no-t">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>请假日期</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="" value="2019-11-11" />
          </div>
        </div>



        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>请假人数</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入请假人数" value="1" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>抄送人</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入抄送人" value="李德华,赵本山" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>申请人</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入完成时间" value="我" />
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
              <div class="weui-label"><span class="required">*</span>请假事由</div>
            </div>
            <div class="weui-cell__bd" style="padding: 20rpx 0;">
              <textarea class="" placeholder="请输入请假事由" style="height: 3.3em; width: 100%;" v-model="noticeText" />
            </div>
          </div>
        </div>

        <div class="page__bd">
          <div class="weui-cells" style="margin-top: 0; border-top: 0 none; margin-top: -1rpx;">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <div class="weui-uploader__title">附加照片</div>
                    <div class="weui-uploader__info">{{files.length}}/2</div>
                  </div>
                  <div class="weui-uploader__bd">
                    <div class="weui-uploader__files" id="uploaderFiles">
                      <div v-for="(item ,index) in files" :key="index">
                        <div class="weui-uploader__file">
                          <image class="weui-uploader__img" :src="item" mode="aspectFill" @click="predivImage" :id="item" />
                          <div class="delete-icon" @click="deleteImg" :id="item"></div>
                        </div>
                      </div>
                      <div class="weui-uploader__file">
                        <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                      </div>
                      <div class="weui-uploader__file">
                        <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                      </div>
                      <div class="weui-uploader__file">
                        <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                      </div>
                     <!-- <div class="weui-uploader__file weui-uploader__file_status">
                        <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                        <div class="weui-uploader__file-content">
                          <icon type="warn" size="23" color="#F43530"></icon>
                        </div>
                      </div>
                      <div class="weui-uploader__file weui-uploader__file_status">
                        <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                        <div class="weui-uploader__file-content">50%</div>
                      </div> -->
                    </div>
                    <!-- <div class="weui-uploader__input-box">
                      <div class="weui-uploader__input" @click="chooseImage"></div>
                    </div> -->
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
      files: [],
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

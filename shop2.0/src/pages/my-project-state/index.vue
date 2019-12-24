<template>
  <div class="page" v-if="form">
    <!-- <div class="weui-cells weui-cells_after-title">
      <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd"><i class="iconfont iconai-user" style="display: inline-block; color: #10AEFF;"></i> 已提交，待[<span style="color: #10AEFF; margin: 0 8rpx;">张总</span>]审批</div>
        <div class="weui-cell__ft weui-cell__ft_in-access">2019-10-11 19:12:38</div>
      </navigator>
    </div> -->

    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_access">
        <div class="weui-cell__bd"><i class="iconfont iconai-user" style="display: inline-block; color: #10AEFF;"></i> {{enumState[form.status]}}
        <template v-if="form.status=='NEW'">，待[<span style="color: #10AEFF; margin: 0 8rpx;">{{form.auditor}}</span>]审批</template>
        </div>
        <div class="weui-cell__ft ">{{form.applyCreateTime}}</div>
      </div>
    </div>

    <div class="weui-form-preview" style="margin-bottom: 20rpx;">

      <div class="weui-cells weui-cells_after-title no-t">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">申报标题</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" :value="form.title" />
          </div>
        </div>



        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">申报项目</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" :value="form.serviceItemName" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">客户姓名</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" :value="form.customerName" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">完成日期</div>
          </div>
          <div class="weui-cell__bd">
              <input class="weui-input" :value="form.date" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">完成时间</div>
          </div>
          <div class="weui-cell__bd">
              <input class="weui-input" :value="form.time" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">申报奖励</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" :value="form.applyPoint" />
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
              <textarea style="height: 3.3em; width: 100%;" v-model="form.content" />
            </div>
          </div>
        </div>

        <div class="page__bd" v-if="form.ccListStr">
          <div class="weui-cells no-t" style="margin-top: 0;">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <div class="weui-uploader">
                  <div class="weui-uploader__hd">
                    <div class="weui-uploader__title">抄送人</div>
                    <!-- <div class="weui-uploader__info">{{files.length}}/2</div> -->
                  </div>
                  <div class="weui-uploader__bd">
                    <div class="weui-uploader__files">
                      <div class="weui-uploader__file">{{form.ccListStr}}</div>
                      <!-- <i class="iconfont iconjia"></i> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>

    <div class="operate-btn" v-if="!type">
      <button class="weui-btn" type="warn" v-if="form.status=='NEW'" @click="handleBack">撤 回</button>
    </div>

    <div class="operate-btn" v-if="type=='approval' && form.status=='NEW' ">
      <div class="operate-btn">
        <div class="weui-flex">
          <div class="weui-flex__item" style="padding-right: 10rpx;">
            <button class="weui-btn" type="warn" @click="handleApproval(false)">拒 绝</button>
          </div>
          <div class="weui-flex__item" style="padding-left: 10rpx;">
            <button class="weui-btn" type="primary" @click="handleApproval(true)">同 意</button>
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
    this.id = this.$root.$mp.query.id;
    this.type = this.$root.$mp.query.type;
    this.applyNo =this.$root.$mp.query.applyNo;
    console.info(this.id)
    if(this.id){
      this.getData()
    }
  },
  components: {

  },
  data() {
    return {
      applyNo: '',
      type: '',
		  id: '',
      // role: '',
      noticeText: '1212',
      date: '',

      form: null,
      enumState: {
        'NEW': '已提交',
        'REVERTED': '已撤回',
        'PASSED': '审批通过',
        'REFUSED': '审批拒绝'
      },
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

    handleApproval(state){
      wx.showModal({
        title: '提示',
        content: state ? '确认同意该申请吗？' : '确认拒绝该申请吗？',
        // confirmText: "主操作",
        // cancelText: "辅助操作",
        success: async (res) => {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
            const data = await post(`/myApply/approve?auditEmpNo=${this.$store.state.userInfo.shopEmployee.id}&applyNo=${this.applyNo}&result=${state}`);
            if(data.success){
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 2000,
                success(){

                }
              })
              setTimeout(()=>{
                wx.navigateBack({
                  url: "/pages/my-approval/main"
                });
              },1000)
            }
          } else {
            console.log('用户点击辅助操作')
          }
        }
      });
    },

    bindTimeChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
    },
    handleAdd(){
      // wx.navigateTo({
      //   url: "/pages/my-score-operate/main"
      // });
    },

    async getData() {
      const data = await post("/service/getItemApply?serviceRecordNo="+this.id);

      if(data.success){

        console.info('data.result.ccEmpNames',data.result.ccEmpNames)
        if(data.result.ccEmpNames){
          data.result.ccListStr = data.result.ccEmpNames.join(',')
        }
        // if(data.result.picList){
        //   this.files = data.result.picList.split(',')
        // }
        if(data.result.completeTime){
          let d = data.result.completeTime.split(' ')
          data.result.date = d[0]
          data.result.time = d[1]
        }
        this.form = data.result
      }
    },

    handleBack(){

      wx.showModal({
        title: '提示',
        content: '确认要撤销该申请吗？',
        // confirmText: "主操作",
        // cancelText: "辅助操作",
        success: async (res) => {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
            const data = await post(`/service/revertServiceRecord?serviceRecordNo=${this.id}`);
            if(data.success){
              wx.showToast({
                title: '撤销成功',
                icon: 'success',
                duration: 2000,
                success(){

                }
              })
              setTimeout(()=>{
                wx.navigateBack({
                  url: "/pages/my-application/main"
                });
              },1000)
            }
          } else {
            console.log('用户点击辅助操作')
          }
        }
      });
    }
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

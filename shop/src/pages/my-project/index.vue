<template>
  <div class="page">
    <div class="weui-form-preview" style="margin-bottom: 20rpx;">
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>申报标题</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入申报标题" />
          </div>
        </div>



        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>申报项目</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入申报目标" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>客户姓名</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" disabled="disabled" :value="customerSelectData[0]?customerSelectData[0].name:''" @click="selectCustomerVisible=true" placeholder="请输入客户姓名" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>完成时间</div>
          </div>
          <div class="weui-cell__bd">
            <picker class="weui-btn" mode="date" :value="date" @change="bindTimeChange">
              <input class="weui-input" placeholder="请输入完成时间" />
            </picker>
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>申报奖励</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入申报奖励" />
          </div>
        </div>

        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label"><span class="required">*</span>审批人</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" disabled="disabled" :value="spData[0]?spData[0].name:''" @click="handleApproval" placeholder="请输入审批人" />
          </div>
        </div>

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
                      <div class="weui-uploader__file">
                        <span v-for="(item,index) in csData" :key="index">{{item.name}}<template v-if="index<csData.length-1">，</template></span>
                        <i class="iconfont iconjia" style="display: inline-block; position: relative; top: 6rpx; left: 10rpx;" @click="handleCopy"></i>
                      </div>
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
      <button class="weui-btn" type="primary" @click="handleAdd">确 定</button>
    </div>

    <select-staff :multiple="multiple" :data="selectData" :visible.sync="selectStaffVisible" @getSelectData="getSelectStaff"></select-staff>

    <select-customer :multiple="false" :data="customerSelectData" :visible.sync="selectCustomerVisible" @getSelectData="getSelectCustomer"></select-customer>


  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
import selectStaff from '@/components/select-staff';
import selectCustomer from '@/components/select-customer';

export default {
  onShow() {

  },
  components: {
    selectStaff,
    selectCustomer
  },
  data() {
    return {
      sp: null,
      selectStaffVisible: false,
      selectCustomerVisible: false,
      multiple: true,
      selectData: [],
      spData: [],
      csData: [],
      // role: '',
      noticeText: '',
      date: '',

      customerSelectData:[]
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
    getSelectStaff(data){
      console.info('data',data)
      if(this.multiple){
        this.csData = JSON.parse(JSON.stringify(data))
      }else{
        this.spData = JSON.parse(JSON.stringify(data))
      }
      // this.hasSelect = JSON.parse(JSON.stringify(data))
    },

    getSelectCustomer(data){
      console.info('选择的顾客是',data)
      this.customerSelectData = JSON.parse(JSON.stringify(data))
    },

    handleApproval(){
      this.multiple = false
      this.selectData = this.spData
      this.selectStaffVisible = true
    },

    handleCopy(){
      this.multiple = true
      this.selectData = this.csData
      this.selectStaffVisible = true
    },

    bindTimeChange(e) {
      console.log('选中的时间为：' + e.mp.detail.value);
    },
    handleAdd(){
      // 测试用 我的目标申报的详情页面是从我的申请里面跳转过来的
      wx.navigateTo({
        url: "/pages/my-project-state/main"
      });
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

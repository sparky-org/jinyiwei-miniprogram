<template>
  <div class="page">
    <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tipsMessage}}</div>

    <template v-if="!selectStaffVisible">

    <div class="weui-cells weui-cells_after-title">

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>开始日期</div>
        </div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" :value="beginDate" :end="endDate" @change="bindBeginDateChange">
            <input class="weui-input" v-model="beginDate" placeholder="请选择开始日期" disabled="disabled" />
          </picker>
        </div>
      </div>


      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>结束日期</div>
        </div>
        <div class="weui-cell__bd">
          <picker class="weui-btn" mode="date" :value="endDate" :start="beginDate" @change="bindEndDateChange">
            <input class="weui-input" v-model="endDate" placeholder="请选择结束日期" disabled="disabled" />
          </picker>
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>审批人</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" disabled="disabled" :value="spData[0]?spData[0].name:''" @click="handleApproval" placeholder="请选择审批人" />
        </div>
      </div>

      <!-- <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>抄送人</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请选择抄送人" />
        </div>
      </div> -->

      <div class="page__bd">
        <div class="weui-cells" style="margin-top: 0;">
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

    <div class="weui-cells weui-cells_after-title no-t" style="position:relative; z-index: 0;">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>请假事由</div>
        </div>
        <div class="weui-cell__bd" style="padding: 20rpx 0;">
           <textarea placeholder="请输入请假事由" v-model="reason" style="height: 3.3em; width: 100%;" />
        </div>
      </div>
    </div>

    <div class="page__bd">
      <div class="weui-cells" style="margin-top: 0; border-top: 0 none; margin-top: -1rpx;">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <div class="weui-uploader__title">附加图片</div>
                <!-- <div class="weui-uploader__info">{{files.length}}/2</div> -->
              </div>
              <div class="weui-uploader__bd">
                <div class="weui-uploader__files" id="uploaderFiles">
                  <div v-for="(item ,index) in myFiles" :key="index">

                    <div class="weui-uploader__file" v-if="item.state">
                      <image class="weui-uploader__img" :src="files[index]" mode="aspectFill" @click="predivImage" :id="files[index]" />
                      <div class="delete-icon" @click="deleteImg" :id="files[index]"></div>
                    </div>

                    <div class="weui-uploader__file weui-uploader__file_status" v-else>
                      <image class="weui-uploader__img" :src="files[index]" mode="aspectFill" @click="predivImage" :id="files[index]" />
                      <div class="delete-icon" @click="deleteImg" :id="files[index]"></div>
                      <div class="weui-uploader__file-content">
                        <icon type="warn" size="23" color="#F43530"></icon>
                      </div>
                    </div>

                  </div>
                  <!-- <div class="weui-uploader__file">
                    <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                  </div>
                  <div class="weui-uploader__file">
                    <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                  </div>
                  <div class="weui-uploader__file">
                    <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                  </div> -->
                  <!-- <div class="weui-uploader__file weui-uploader__file_status">
                    <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                    <div class="weui-uploader__file-content">
                      <icon type="warn" size="23" color="#F43530"></icon>
                    </div>
                  </div> -->
                  <!-- <div class="weui-uploader__file weui-uploader__file_status">
                    <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                    <div class="weui-uploader__file-content">50%</div>
                  </div> -->
                </div>
                <div class="weui-uploader__input-box">
                  <div class="weui-uploader__input" @click="chooseImage"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </template>

    <div class="operate-btn">
      <button class="weui-btn" type="primary" @click="handleSubmit">提 交</button>
    </div>

    <select-staff :multiple="multiple" :data="selectData" :visible.sync="selectStaffVisible" @getSelectData="getSelectStaff"></select-staff>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, host } from "../../utils";
import selectStaff from '@/components/select-staff';
// import { mapState, mapMutations } from "vuex";

export default {
  onShow() {
    this.applyType = this.$root.$mp.query.type;
    console.info('this.applyType', this.applyType)
  },
  components: {
    selectStaff
  },
  data() {
    return {
      applyType:'',
      // role: '',
      multiple: true,
      csData: [],
      spData: [],
      selectData: [],
      selectStaffVisible: false,


      errorTips: false,
      beginDate: '',
      endDate: '',
      reason:'',

      files: [],
      myFiles: [],

      tipsMessage:'',
      showTopTips: false
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
      if(!this.beginDate || !this.endDate || !this.spData.length || !this.reason){
        this.tipsMessage = '请填写完整的信息!'
        this.showTopTips = true
        setTimeout(()=>{
          this.showTopTips = false
        },1500)
        return
      }

      if(this.myFiles.length){
        let state = this.myFiles.every(item => {
          return item.state
        })
        if(!state){
          this.tipsMessage = '有上传失败的图片，请删除后再提交!'
          this.showTopTips = true
          setTimeout(()=>{
            this.showTopTips = false
          },1500)
          return
        }
      }

      let ccList = this.csData.map(item => {
        return item.id
      })
      let attachmentPicList = this.myFiles.map(item => {
        return item.url
      })
      const data = await post(`/myApply/newVacationApply`,{
        "applyEmpNo": this.$store.state.userInfo.shopEmployee.id,
        "attachmentPicList": attachmentPicList.join(','),
        "auditEmpNo": this.spData[0].id,
        "begin": this.beginDate,
        "ccList": ccList.join(','),
        "end": this.endDate,
        "reason": this.reason
      });
      if(data.success){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })
        if(this.applyType){
          wx.setStorageSync('application-type', this.applyType)
        }
        setTimeout(()=>{
          wx.navigateBack({
            url: '/pages/my-application/main'
          })
        },1000)
      }
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

    getSelectStaff(data){
      console.info('data',data)
      if(this.multiple){
        this.csData = JSON.parse(JSON.stringify(data))
      }else{
        this.spData = JSON.parse(JSON.stringify(data))
      }
      // this.hasSelect = JSON.parse(JSON.stringify(data))
    },

    bindBeginDateChange(e) {
      console.log('选中的日期为：' + e.mp.detail.value);
      this.beginDate = e.mp.detail.value
    },

    bindEndDateChange(e) {
      console.log('选中的日期为：' + e.mp.detail.value);
      this.endDate = e.mp.detail.value
    },

    chooseImage(e) {
      // let _this = this;
      wx.chooseImage({
        // count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          console.log('成功上传：' + res.tempFilePaths);
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          this.files = this.files.concat(res.tempFilePaths);
          this.upload(this.files)
        },
        fail: function() {
          // console.log('fail');
          // wx.showModal({
          //   title: '提示',
          //   content: '上传失败',
          //   showCancel: false
          // })

        },
        complete: function() {
          console.log('commplete');
        }
      });
    },
    predivImage(e) {
      console.log(e);
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      });
    },
    deleteImg(e) {
      let _this = this
      Array.prototype.indexOf = function(val) { // eslint-disable-line
        for (let i = 0; i < this.length; i++) {
          if (this[i] === val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) { // eslint-disable-line
        let index = this.indexOf(val);
        // _this.myFiles.splice(index,1)
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.files.remove(e.currentTarget.id);

      // let _index = this.files.indexOf(e.currentTarget.id)

      this.myFiles.forEach((item, idx) => {
        if(item.key == e.currentTarget.id){
          this.myFiles.splice(idx,1)
        }
      })

    },


    upload(list) {
      console.info('host',host,list,host + "/file/upload")
      wx.showToast({
        icon: "loading",
        title: "正在上传"
      })
      let i = 0
      list.forEach(item => {
        wx.uploadFile({
          url: host + "/file/upload",
          filePath: item,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            "token" : this.$store.state.userInfo.token,
          },
          // formData: {
          //   //和服务器约定的token, 一般也可以放在header中
          //   'session_token': wx.getStorageSync('session_token')
          // },
          success: (res) => {
            i++
            let result = JSON.parse(res.data)
            console.info(111111111,res,res.data.success, result.result[0])
            if (res.statusCode != 200) {
              if(!result.success){
                this.myFiles.push({
                  key: item,
                  state: false,
                  url: ''
                })
                // wx.showModal({
                //   title: '提示',
                //   content: '上传失败',
                //   showCancel: false
                // })
                return;
              }
            }else{
              this.myFiles.push({
                key: item,
                state: true,
                url: result.result[0]
              })
            }
            // var data = res.data
            // page.setData({  //上传成功修改显示头像
            //   src: list[0]
            // })
          },
          fail: (e) => {
            i++
            console.log('222222222222');
            this.myFiles.push({
              key: item,
              state: false,
              url: ''
            })
            // wx.showModal({
            //   title: '提示',
            //   content: '上传失败',
            //   showCancel: false
            // })
          },
          complete: () => {
            if(i == list.length){
              //wx.hideToast();  //隐藏Toast
            }
          }
        })
      })



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
  .weui-uploader__file {
    position: relative;
  }
  .weui-uploader__bd {
    overflow: visible;
  }
  .delete-icon {
    position: absolute;
    width: 40rpx;
    height: 40rpx;
    background: #f43530;
    right: -20rpx;
    top: -20rpx;
    border-radius: 40rpx;
    z-index: 5;
  }
  .delete-icon::before {
    content: '';
    width: 26rpx;
    height: 4rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
  }
  @import "./style.scss";
</style>

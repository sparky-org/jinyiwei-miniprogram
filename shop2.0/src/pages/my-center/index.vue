<template>
  <div class="my-center">
    <!-- 个人中心
    <div class="weui-cells__title">带说明的列表项</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">标题文字</div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div> -->
    <div class="weui-toptips weui-toptips_warn" v-if="showErrorTips">错误提示</div>

    <div class="weui-cells weui-cells_after-title" v-if="form">

      <div class="weui-cell weui-cell_input weui-cell_vcode" style="padding-top: 20rpx; padding-bottom: 20rpx;">
        <div class="weui-cell__hd">
          <div class="weui-label">头像</div>
        </div>
        <div class="weui-cell__bd">
          &#12288;
        </div>
        <div class="weui-cell__ft">
          <image @click="chooseImage" class="weui-vcode-img" :src="form.avatar" style="border-radius: 50%; width: 50px; height: 50px; margin-right: 30rpx;" />
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">用户名</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" disabled="disabled" placeholder="请输入姓名" v-model="form.name" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" disabled="disabled" placeholder="请输入手机号" v-model="form.phone" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">职位</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" disabled="disabled" placeholder="请输入职位" v-model="form.jobName" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">工号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" :disabled="type==null" placeholder="请输入工号" v-model="form.jobNo" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">总积分</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" :disabled="type==null" placeholder="请输入总积分" v-model="form.totalPoint" />
        </div>
      </div>
    </div>




    <div class="add-customer" v-if="type=='edit'">
      <button class="weui-btn" type="primary">提交</button>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post, host } from "../../utils";
export default {
  onShow() {
    // this.type = this.$root.$mp.query.type;
    // console.info(this.type)
    // wx.setNavigationBarTitle({
    //   title: this.type ? '修改个人信息' : '个人信息'
    // })
  },
  computed: {

  },
  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role)
    this.getDetail()
  },

  data() {
    return {
      showErrorTips: false,
      // role: ''
      type: null,
      form: null,

      files: [],
      myFiles: []
    };
  },
  components: {},
  methods: {
    async getDetail() {
      const data = await post("/employee/getEmployeeInfo?empNo="+this.$store.state.userInfo.shopEmployee.id);
      if(data.success){
        this.form = data.result
      }
    },

    async setInfo(avatarUrl){
      const data = await post("/employee/modifyEmployee",{
        "avatar": avatarUrl,
        "id": this.$store.state.userInfo.shopEmployee.id
      });
      if(data.success){
        wx.showToast({
          title: '修改头像成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })
      }
    },


    chooseImage(e) {
      // let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          console.log('成功上传：' + res.tempFilePaths);
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          this.files = this.files.concat(res.tempFilePaths);
          this.upload(this.files)

          this.form.avatar = this.files[0]
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
              // 编辑信息
              this.setInfo(result.result[0])
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


  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

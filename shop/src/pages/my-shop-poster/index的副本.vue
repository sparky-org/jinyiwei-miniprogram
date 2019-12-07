<template>
  <div class="page">

    <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tipsMessage}}</div>

    <!-- <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label"><span class="required">*</span>标题</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="content" placeholder="请输入标题" />
        </div>
      </div>
    </div> -->

    <!-- <div class="page__bd">
      <div class="weui-cells" style="margin-top: 0; border-top: 0 none; margin-top: -1rpx;">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <div class="weui-uploader__title">图片上传</div>
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
                  <div class="weui-uploader__file weui-uploader__file_status">
                    <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                    <div class="weui-uploader__file-content">
                      <icon type="warn" size="23" color="#F43530"></icon>
                    </div>
                  </div>
                  <div class="weui-uploader__file weui-uploader__file_status">
                    <image class="weui-uploader__img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg" mode="aspectFill" />
                    <div class="weui-uploader__file-content">50%</div>
                  </div>
                </div>
                <div class="weui-uploader__input-box">
                  <div class="weui-uploader__input" @click="chooseImage"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="page__bd" style="margin-top: -1rpx;">
      <div class="weui-cells" style="margin-top: 0; border-top: 0 none;">
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
                      <div class="delete-icon" v-if="canEdit" @click="deleteImg" :id="files[index]"></div>
                    </div>

                    <div class="weui-uploader__file weui-uploader__file_status" v-else>
                      <image class="weui-uploader__img" :src="files[index]" mode="aspectFill" @click="predivImage" :id="files[index]" />
                      <div class="delete-icon" @click="deleteImg" v-if="canEdit" :id="files[index]"></div>
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
                <div class="weui-uploader__input-box" v-if="canEdit">
                  <div class="weui-uploader__input" @click="chooseImage"></div>
                </div>
              </div>
            </div>
          </div>
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
import { get, post, host } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {

  },
  components: {

  },
  data() {
    return {
      // role: '',
      // content: '',
      files: [],
      myFiles: [],

      tipsMessage:'',
      showTopTips: false,


      canEdit: false,
      posterNo: null
      // files: ['https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4133574179,304311957&fm=26&gp=0.jpg']
    };
  },

  mounted() {
    // this.role = this.$store.state.userInfo.role
    // console.info('v-show="$store.state.userInfo.role',this.$store.state.userInfo.role);
    // this.getData();
    this.getPoster()
  },
  computed: {

  },
  methods: {

    async getPoster(){
      console.info('getPoster')
      const data = await post(`/poster/viewPosters?empNo=${this.$store.state.userInfo.shopEmployee.id}&shopNo=${this.$store.state.userInfo.shopEmployee.shopNo}`);
      if(data.success){
        this.canEdit = data.result.canEdit
        if(data.result.content){
          // this.files = [...this.files,'https://csdnimg.cn/pubfooter/images/csdn-zx.png']

          // this.files = data.result.content.split(',')
          // this.myFiles = this.files.map(item => {
          //   return {
          //     state: true,
          //     key: item,
          //     url: item
          //   }
          // })
          data.result.content.split(',').forEach(item => {
            wx.getImageInfo({
              src: item,
              success: res => {
                console.info('resimg', res)
                this.files.push(res.path)
                this.myFiles.push({
                  state: true,
                  key: res.path,
                  url: item
                })
              }
            })
          })
        }
        this.posterNo = data.result.posterNo
      }
    },

    async handleSubmit(){
      // if(!this.content){
      //   this.tipsMessage = '请填写标题'
      //   this.showTopTips = true
      //   setTimeout(()=>{
      //     this.showTopTips = false
      //   },1500)
      //   return
      // }

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
      // else{
      //   this.tipsMessage = '请先选择图片!'
      //   this.showTopTips = true
      //   setTimeout(()=>{
      //     this.showTopTips = false
      //   },1500)
      //   return
      // }

      let attachmentPicList = this.myFiles.map(item => {
        return item.url
      })

      let param = {
        "content": attachmentPicList.join(','),
        "empNo": this.$store.state.userInfo.shopEmployee.id
      }
      if(this.posterNo){
        param.posterNo = this.posterNo
      }

      const data = await post(`/poster/publishPoster`,param);
      if(data.success){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000,
          success(){

          }
        })
        setTimeout(()=>{
          wx.reLaunch({
            url: '/pages/workBench/main'
          })
        },1000)
      }
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
          this.upload(res.tempFilePaths)
          // res.tempFilePaths.forEach(item => {
          //   this.myFiles.push({
          //     state: true,
          //     key: item,
          //     url: item
          //   })
          // })

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
      console.info('host',host + "/file/upload", list)
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
    right: 0;
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

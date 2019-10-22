<template>
  <div class="message-container">
    <div v-for="(item, index) in messageList" :key="index" class="detail-item">
      <div class='time'>{{item.time}} {{item.title}}</div>
      <div class='content'>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    post,
    login,
    getStorageOpenid
  } from "../../utils";
  export default {
    onShow() {
      if (login()) {
        this.loadData()
      }
    },
    created() {
    },
    mounted() {
    },
    data() {
      return {
        userInfo: wx.getStorageSync("userInfo") || {},
        messageList: [{
          "desc": "12333",
          "id": 0,
          "time": "2019-10-19",
          "title": "今日头条",
          "type": "string"
        }]
      };
    },
    components: {},
    //下拉刷新
    onPullDownRefresh: function () {
      wx.stopPullDownRefresh()
      this.loadData()
    },
    methods: {
      //加载数据
      loadData: function () {
        post(`/message/getMessage?customerId=${this.userInfo.customerId}&shopId=${this.globalData.shopId}`).then(function(res) {
          
        })
      },
    },
    computed: {

    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";
</style>

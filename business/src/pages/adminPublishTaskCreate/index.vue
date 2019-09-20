<template>
  <div class=".publish_task_create">

    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">任务名称</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入任务名称" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">面向对象</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入面向对象" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">任务奖励</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入任务奖励" />
        </div>
      </div>
      <!-- <div class="weui-cell weui-cell_input weui-cell_vcode">
        <div class="weui-cell__hd">
          <div class="weui-label">手机号</div>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="请输入手机号" />
        </div>
        <div class="weui-cell__ft">
          <div class="weui-vcode-btn">获取验证码</div>
        </div>
      </div> -->
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">开始时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker mode="date" value="beginDate" start="2015-09-01" end="2017-09-01" @change="bindBeginDateChange">
            <div class="weui-input">{{beginDate}}</div>
          </picker>
        </div>
      </div>

      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">结束时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker mode="date" value="endDate" start="2015-09-01" end="2017-09-01" @change="bindEndDateChange">
            <div class="weui-input">{{endDate}}</div>
          </picker>
        </div>
      </div>


      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">任务内容</div>
        </div>
        <div class="weui-cell__bd" style="padding: 20rpx 0;">
          <textarea class="" placeholder="请输入任务内容" style="height: 3.8em" />
        </div>
      </div>

      <!-- <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">时间</div>
        </div>
        <div class="weui-cell__bd">
          <picker mode="time" value="time" start="09:01" end="21:01" @change="bindTimeChange">
            <div class="weui-input">{{time}}</div>
          </picker>
        </div>
      </div> -->

    </div>


    <div class="sureBth">
      <button class="weui-btn" type="primary">创 建</button>
    </div>

  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils";
import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    ...mapState(["cityName"])
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      banner: [],
      time: '09:01',
      beginDate: '2015-09-01',
      endDate: '2015-09-01',
    };
  },
  components: {},
  methods: {
    bindBeginDateChange(e) {
      this.beginDate = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    bindEndDateChange(e) {
      this.endDate = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    bindTimeChange(e) {
      this.time = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    ...mapMutations(["update"]),
    async getData() {
      const data = await get("/index/index");
      this.banner = data.banner;
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    },
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>

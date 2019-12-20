<template>
  <div class="test">
    <div>滑动删除</div>
    <i-swipeout  i-class="i-swipeout-demo-item" operateWidth="80" :unclosable="true" :toggle="toggle">
      <view slot="content">
          <i-cell
              i-class="i-cell-padding"
              title="猛虫过江"
              label="侏罗纪世界主题公园及豪华度假村被失控的恐龙们摧毁已有四年">
          </i-cell>
      </view>
      <view slot="button" class="i-swipeout-button-group">
          <!-- <view class="i-swipeout-demo-button" style="width:60px"><i-icon size="32" type="like_fill" @click="handleClick(1)"></i-icon></view> -->
          <!-- <view class="i-swipeout-demo-button" style="width:60px"><i-icon size="32" type="share_fill" @click="handleClick(2)"></i-icon></view> -->
          <view class="delete" style="width:80px" @click="handleClick(3)">删除</view>
      </view>
    </i-swipeout>

    <!-- <div>Tabs</div>
    <i-tabs :current="current" @change="handleChange">
        <i-tab key="tab1" title="选项1">1111</i-tab>
        <i-tab key="tab2" title="选项2">2222</i-tab>
        <i-tab key="tab3" title="选项3">3333</i-tab>
    </i-tabs> -->

    <div>通知</div>
    <i-notice-bar icon="systemprompt" loop>
      2018年世界杯,将于6月14日至7月15日举行2018年世界杯,将于6月14日至7月15日举行2018年世界杯,将于6月14日至7月15日举行
    </i-notice-bar>

    <div>步骤条</div>
    <van-steps :steps="steps" :active="active"/>

    <div>vant tabs</div>
    <van-tabs :active="active" @change="onChange"> <!-- type="card" -->
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>

    <div>折叠面板</div>
    <van-collapse :value="activeNames" @change="onCollapseChange"> <!--accordion 单开-->
      <van-collapse-item title="有赞微商城" name="1">
        提供多样店铺模板，快速搭建网上商城
      </van-collapse-item>
      <van-collapse-item title="有赞零售" name="2">
        网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
      </van-collapse-item>
      <van-collapse-item title="有赞美业" name="3">
        线上拓客，随时预约，贴心顺手的开单收银
      </van-collapse-item>
    </van-collapse>


    <div>提示</div>
    <van-notify id="van-notify" />
    <van-toast id="van-toast" />

    <div>icon</div>
    <van-icon name="close" />
    <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
    <van-icon name="chat" dot />
    <van-icon name="chat" info="9" />
    <van-icon name="chat" info="99+" />
    <van-icon name="chat" size="50px" />

  </div>
</template>

<script>
import Notify from '../../../static/vant/notify/notify';
import Toast from '../../../static/vant/toast/toast';

export default {
  onShow() {
    // ------------------------Toast组件-------------------
    // 文字提示
    // Toast('我是提示文案，建议不超过十五字~');

    // 加载提示
    // Toast.loading({
    //   mask: true,
    //   message: '加载中...'
    // });

    // 成功/失败提示
    // Toast.success('成功文案');
    // Toast.fail('失败文案');


    // ------------------------Notify组件-------------------
    // 主要通知
    // Notify({ type: 'primary', message: '通知内容' });

    // 成功通知
    // Notify({ type: 'success', message: '通知内容' });

    // 危险通知
    // Notify({ type: 'danger', message: '通知内容' });

    // 警告通知
    // Notify({ type: 'warning', message: '通知内容' });

    // 自定义消息通知的颜色和展示时长
    // Notify({
    //   message: '自定义颜色',
    //   color: '#ad0000',
    //   background: '#ffe1e1'
    // });

    // Notify({
    //   message: '自定义时长',
    //   duration: 1000
    // });

  },
  computed: {

  },
  mounted() {
  },
  data() {
    return {
      toggle: false,

      current:1,

      active: 0,
      steps: [
        {
          text: '步骤一',
          desc: '描述信息'
        },
        {
          text: '步骤二',
          desc: '描述信息'
        },
        {
          text: '步骤三',
          desc: '描述信息'
        },
        {
          text: '步骤四',
          desc: '描述信息'
        }
      ],

      activeNames: ['1']
    };
  },
  components: {},
  methods: {
    handleClick(type){
      console.info(type)
      if(type == 3){
        this.toggle = !this.toggle
      }
    },


    handleChange (event) {
      console.info(event.target.key)
      this.current =  event.target.key
    },

    onChange(event) {
      console.info(event.target)
      // wx.showToast({
      //   title: `切换到标签 ${event.detail.name}`,
      //   icon: 'none'
      // });
    },

    onCollapseChange(event){
       console.info(event)
       this.activeNames = event.mp.detail
    }

  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

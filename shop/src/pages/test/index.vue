<template>
  <div class="test">

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



  </div>
</template>

<script>


export default {
  onShow() {

  },
  computed: {

  },
  mounted() {
  },
  data() {
    return {
      toggle: false,
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
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>

<script>
import {getOpenid} from './utils'
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
  },
  methods: {
  }
};
</script>

<style lang="scss">
@import url("./iconfont/iconfont.css");

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}

page {
  background: #f4f4f4;
  height: 100%;
}

button {
  background: none;
  padding: 0;
  font-weight: normal;
  font-size: 32rpx;
  box-sizing: content-box;
}
button::after {
  border: 0;
}

view,
text {
  font-size: 28rpx;
  color: #333;
}

.wxParse .p {
  margin: 0 !important;
}

.wxParse .img {
  display: block !important;
}

/* this rule will be remove */

/* * {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
} */

// nav
.nav-list {
  display: flex;
  white-space: nowrap;
  align-items: center;
  background-color: #fff;
  .item {
    // min-width: 120rpx;
    display: inline-block;
    text-align: center;
    padding: 10rpx 30rpx;
    font-size: 28rpx;
    flex: 1;
    box-sizing: border-box;
    &.active {
      font-size: 34rpx;
      position: relative;
      &:before {
        content: '';
        width: 50%;
        height: 6rpx;
        position: absolute;
        display: block;
        background-color: #FA730E;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
      }
    }
  }
}

.order-img-contain, .order-img-contain image {
  width: 180rpx;
  height: 180rpx;
}

.flex-1 {
  flex: 1;
}

.no-more{
  padding: 0 0 30rpx 0;
  width: 100%;
  text-align: center;
  font-size: 22rpx;
  color: #999899;
  margin-top: 20rpx;
}

.circle-cart {
  width: 122rpx;
  height: 122rpx;
  position: fixed;
  right: 30rpx;
  bottom: 100rpx;
}

.primary-btn--plain {
  color: #E51C23;
  padding: 15rpx 20rpx;
  border: 1rpx solid #E51C23;
  display: inline-block;
  border-radius: 10rpx;
}

.primary-btn {
  color: #fff;
  padding: 15rpx 20rpx;
  background-color: #E51C23;
  display: inline-block;
  border-radius: 10rpx;
}

.weui-dialog {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .weui-mask {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, .3);
    position: absolute;
  }
  .weui-dialog__wrp {
    position: absolute;
    padding: 20rpx;
    width: 100%;
    box-sizing: border-box;
  }
}

</style>

<template>
  <div class="cart-container">
    <div class="cartlist" v-if="listData && listData.length">
      <div class="item" @touchstart="startMove" @touchmove="deleteGoods" @touchend="endMove" :data-index="index" v-for="(item,index) in listData" :key="index">
        <div class="con" :style="item.textStyle">
          <div class="icon" @click="chooseItem(item, index)" :class="[ item.active ? 'active' : '',{active:allcheck}]"></div>
          <div class="img">
            <img :src="item.picUrl" alt="">
          </div>
          <div class="info">
            <p>{{item.goodsName}}</p>
            <div class="price-num">
              <span v-if="item.usePoint" class="price">￥{{item.price}}</span>
              <span v-if="!item.usePoint" class="price">￥{{item.pointPrice}}</span>
              <div class='add-or-decrease'>
                <div class='decrease-contain' @click='decreaseItem(index)'>
                    <div class='decrease'>-</div>
                </div>
                <div class='number-contain'>
                  <input class='input-num' type="number" @input="changeInput($event, index)" :value="item.num"/>
                </div>
                <div class='add-contain' @click='addItem(index)'>
                    <div class='add'>+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div @click="delGoods(item, index)" class="delete" :style="item.textStyle1">
          <div>删除</div>
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      <img src="/static/images/no-cart.png" alt="">
      <p>购物车空空如也，快来挑选好货呗~</p>
      <navigator url="/pages/market/main" open-type="switchTab">
        <div class="btn primary-btn--plain">积分商城</div>
      </navigator>
    </div>
    <div class="fixed" v-if="listData && listData.length">
      <div @click="checkAll" :class="{active:allcheck}" class="left">
        全选({{isCheckedNumber}})
      </div>
      <div class="right">
        <div>￥{{allPrice}}</div>
        <div @click="orderDown">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    get,
    post,
    toLogin,
    getStorageOpenid
  } from "../../utils";
  export default {
    onShow() {
      if (toLogin()) {
        let userInfo = wx.getStorageSync("userInfo") || {}
        let listData = wx.getStorageSync(`goodsInfo-${userInfo.customerId}`) || []
        listData.map(data => {
          data.active = data.active || false
        })
        this.listData = listData
      }
      this.openId = getStorageOpenid();
    },
    created() {},
    data() {
      return {
        userInfo: wx.getStorageSync("userInfo") || {},
        openId: "",
        allcheck: false,
        listData: [],
        idList: [],
        tranX: 0,
        tranX1: 0,
        startX: "",
        startY: "",
        moveX: "",
        moveY: "",
        moveEndX: "",
        moveEndY: "",
        X: 0,
        Y: ""
      };
    },
    components: {},
    methods: {
      // 减少数量
      decreaseItem(index) {
        if (this.listData[index].num > 1) {
          this.listData[index].num--
          this.updateStorageSync()
        }
      },

      // 增加数量
      addItem(index) {
        this.listData[index].num++
        this.updateStorageSync()
      },

      // 修改商品数量
      changeInput ($event, index) {
        this.listData[index].num = $event.target.value || this.listData[index]
        this.updateStorageSync()
      },

      initTextStyle() {
        //滑动之前先初始化数据
        for (var i = 0; i < this.listData.length; i++) {
          this.listData[i].textStyle = "";
          this.listData[i].textStyle1 = "";
        }
      },

      startMove(e) {
        this.initTextStyle();
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
      },

      deleteGoods(e) {
        //滑动之前先初始化样式数据
        this.initTextStyle();
        var index = e.currentTarget.dataset.index;
        console.log(index);
        if (this.X <= -100) {
          this.flag = true;
        }
        if (!this.flag) {
          this.moveX = e.touches[0].pageX;
          this.moveY = e.touches[0].pageY;
          this.X = this.moveX - this.startX;
          this.Y = this.moveX - this.startY;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          if (this.X >= 100) {
            this.X = 0;
          }
          this.tranX = this.X;
          if (this.X <= -100) {
            this.X = -100;
          }
          this.tranX1 = this.X;
          this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
        } else {
          this.moveX = e.touches[0].pageX;
          this.moveY = e.touches[0].pageY;
          this.X = this.moveX - this.startX;
          this.Y = this.moveX - this.startY;

          this.tranX = this.X - 100;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          // transform:'translateX(' + tranX + 'rpx)'

          if (this.X + -100 > -100) {
            this.flag = false;
          }
          this.tranX1 = -100;
          this.listData[index].textStyle1 = `transform:translateX(-100rpx);`;
          console.log(this.listData[index].textStyle1);
          // this.listData = this.listData;
        }
        // if (Math.abs(this.X) > Math.abs(this.Y) && this.X > 20) {
        //   this.scrollflag = false;
        // } else if (Math.abs(this.X) > Math.abs(this.Y) && this.X < 20) {
        //   console.log("right 2 left");
        // }
      },

      endMove(e) {
        var index = e.currentTarget.dataset.index;
        if (this.X > -50) {
          this.tranX1 = 0;
          this.tranX = 0;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
        } else if (this.X <= -50) {
          this.tranX1 = -100;
          this.tranX = -100;
          this.listData[index].textStyle = `transform:translateX(${this.tranX}rpx);`;
          this.listData[index].textStyle1 = `transform:translateX(${this.tranX1}rpx);`;
        }
      },

      // 下单
      async orderDown() {
        let chooseData = this.listData.filter(data => {
          if (data.active) {
            let {num, goodsId, goodsName, price, picUrl, retailPrice} = data
            return {num, goodsId, goodsName, price, picUrl, retailPrice}
          }
        })
        if (chooseData.length == 0) {
          wx.showToast({
            title: "请选择商品",
            icon: "none",
            duration: 1500
          });
          return false;
        }
        wx.navigateTo({
          url: `/pages/confirmOrder/main?goodsList=${JSON.stringify(chooseData)}`
        })
      },

      // 更新本地存储购物车数据
      updateStorageSync() {
        wx.setStorageSync(`goodsInfo-${this.userInfo.customerId}`, this.listData)
      },

      // 删除商品
      async delGoods(item, index) {
        var _this = this;
        wx.showModal({
          title: "",
          content: "是否要删除该商品",
          success: function (res) {
            if (res.confirm) {
              _this.listData.splice(index, 1)
              _this.updateStorageSync()
            } else if (res.cancel) {
              console.log("用户点击取消");
              //滑动之前先初始化样式数据
              _this.initTextStyle();
            }
          }
        });
      },

      // 全选
      checkAll() {
        this.allCheck = !this.allCheck
        this.listData.forEach(data => {
          data.active = this.allCheck
        })
        this.updateStorageSync()
      },

      // 勾选或取消
      chooseItem(item, index) {
        let {listData} = this
        this.$set(this.listData, index, {...item, active: !item.active});
        this.updateStorageSync()
      }
    },
    computed: {
      isCheckedNumber() {
        let chooseData = this.listData.filter(data => data.active)
        this.allcheck = chooseData.length === this.listData.length
        return chooseData.length;
      },
      allPrice() {
        let chooseData = this.listData.filter(data => data.active)
        return chooseData.reduce((price, cur) => {
          price = price + cur.price * cur.num
          return price
        }, 0)
      }
    }
  };

</script>
<style lang='scss' scoped>
  @import "./style";
</style>

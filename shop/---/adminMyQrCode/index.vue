<template>
  <div class="my_QrCode">
    <img :src="imgCode" alt="我的二维码">
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get, post } from "../../utils";
// import { mapState, mapMutations } from "vuex";
export default {
  onShow() {
  },
  computed: {
    // ...mapState(["cityName"])
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      // banner: [],
      imgCode: ''
    };
  },
  components: {},
  methods: {
    // ...mapMutations(["update"]),
    async getData() {
      const data = await post(`/agency/employ/getMyQRCode?agencyId=${this.$store.state.userInfo.agencyId}&employId=${this.$store.state.userInfo.id}`);
      console.info(data,'二维码')
      if(data.success){
        this.imgCode = data.result
      }
    },
    // topicdetail(id) {
    //   wx.navigateTo({
    //     url: "/pages/topicdetail/main?id=" + id
    //   });
    // },
  },
  created() {

  }
};
</script>

<style lang='scss' scoped>
  @import "./style.scss";
</style>

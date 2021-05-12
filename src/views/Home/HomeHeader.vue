<template>
  <div class="header">
    <div class="base">
      <span class="time">
        {{ day }} <br>
        <b>{{ mouth }}月</b>
      </span>
      <h1 class="title">知乎日报</h1>
    </div>
    <!-- <button @click="changeBG"> {{toblack}} </button> -->
    <router-link to="/login" class="to">
      <div class="user"></div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    date: {
      type: String,
      default: '19970701',
    },
    // bg:{
    //   type:String,
    //   default:""
    // }
  },
  data() {
    return {

    };
  },
  methods: {
    changeBG() {
      if (this.bg === 'black') {
        this.$emit('change', '');
      } else {
        this.$emit('change', 'black');
      }
    },
    // handleTime() {
    //   let time = new Date();
    //   // 2021/5/8上午10:34:21
    //   time = time.toLocaleString();
    //   //格式化时间   2021/05/08上午10:34:21
    //   time = time.replace(/\d+/g, val => {
    //     val = val.length < 2 ? "0" + val : val;
    //     return val;
    //   });
    //   return time = time;
    // }
  },
  computed: {
    // toblack(){
    //   if(this.bg === "black"){
    //     return "正常模式"
    //   }
    //   return "黑暗模式"
    // },
    mouth() {
      // let time = this.handleTime();
      // return parseFloat(time.substr(5,2));
      return parseFloat(this.date.substr(4, 2));
    },
    day() {
      // let time = this.handleTime();
      // return parseFloat(time.substr(8,2));
      return parseFloat(this.date.substr(6, 2));
    },
  },
};
</script>
<style lang="stylus" scoped>
.header{
  display flex
  justify-content space-between
  padding 10px
  height 60px
  background white
  .base{
    display flex
    width 160px
    height 100%
    .time{
      height 100%
      width 60px
      text-align center
      font-size 20px
      line-height 20px
      b{
        font-size 14px
      }
    }
    .title{
      margin 0
      width 100px
      height 100%
      border-left 1px solid #ccc
      padding-left 1px
      font-size 22px
      text-align center
      line-height 40px
    }
  }

  .user{
    width 40px
    height 40px
    background url('../../assets/head.png') no-repeat
    background-size 100% 100%
    border-radius 40px
  }
}
</style>

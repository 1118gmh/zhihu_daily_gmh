<template>
  <div class="comment">
    <div class="nav">
      <span @click="goBack"></span>
      {{comment}} 条评论
    </div>

    <div class="empty"></div>
    <div class="longComments" v-if="longComments.length>0">
      <div class="title">长评</div>
      <template v-for="(data,index) in longComments">
        <li :key="index" class="item">
          <img :src="data.avatar" alt="">
          <div class="box">
            <div class="author"> {{data.author}} </div>
            <span class="content"> {{data.content}} </span>
            <div class="wrapper">
              <span class="time"> {{data.time | toTime()}} </span>
              <img src="../../assets/pinglun.svg" alt="">
              <span class="likes">
                              {{data.likes}}
              <img src="../../assets/zan.svg" alt="">
              </span>
            </div>
          </div>

        </li>
      </template>
    </div>
    <div class="shortComments" v-if="shortComments.length>0">
      <div class="title">短评</div>
      <template v-for="(data,index) in shortComments">
        <li :key="index" class="item">
          <img :src="data.avatar" alt="">
          <div class="box">
            <div class="author"> {{data.author}} </div>
            <span class="content"> {{data.content}} </span>
            <div class="wrapper">
              <span class="time"> {{data.time | toTime()}} </span>
              <img src="../../assets/pinglun.svg" alt="">
              <span class="likes">
                              {{data.likes}}
              <img src="../../assets/zan.svg" alt="">
              </span>
            </div>
          </div>

        </li>
      </template>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import * as types from '../../store/actions-type';

const { mapState, mapActions } = createNamespacedHelpers('detail/comment');
export default {
  computed: {
    ...mapState(['longComments', 'shortComments', 'isLong', 'isShort', 'comment']),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    ...mapActions([types.SET_COMMENT]),
  },
  mounted() {
    const { id } = this.$route.params;
    this[types.SET_COMMENT](id);
  },
};
</script>
<style lang="stylus" scoped>

.nav{
  position fixed
  top 0
  z-index 999
  width 100%
  height 40px
  background white
  border-bottom 1px solid #ccc
  text-align center
  font-size 20px
  line-height 40px
  font-weight bold
  span{
    float left
    display block
    margin 5px 5px
    width 30px
    height 30px
    background url(../../assets/back.svg) no-repeat;
    background-image 100% 100%
  }
}
.empty{
  width 100%
  height 40px
}
.shortComments,.longComments{
  position relative
  .title{
    padding-left 10px
    width 100%
    height 30px
    line-height 30px
    font-size 15px
    font-weight bolder
    letter-spacing 2px
  }
  .item{
    display flex
    justify-content space-between
    padding 10px
    border-bottom 1px solid #ccc
    img{
      width 40px
      height 40px
      border-radius 20px
    }
    .box{
      flex 1
      position relative
      padding-left 10px
      .author{
        margin-bottom 2px
        height 20px
        line-height 20px
        font-size 15px
        font-weight bold
      }
      .content{
        display block
        font-size 15px
        letter-spacing 1px
        line-height 24px
        color rgb(15,15,15)
      }
      .wrapper{
        padding 10px 0
        height 40px
        font-size 12px
        line-height 20px
        overflow hidden
        .time{
          float left
          color #ccc
        }
        img{
          float right
          margin 0 10px
          width 20px
          height 20px
        }
        .likes{
          float right
          line-height 22px
        }
      }
    }
  }
}

</style>

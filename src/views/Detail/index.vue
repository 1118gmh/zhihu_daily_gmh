<template>
  <div id="detail">
    <div class="comments">
      <router-link :to="{path:`/detail/${this.$route.params.id}/comment`}">
        <span><img src="../../assets/pinglun.svg" alt=""> {{comments.comments}} </span>
      </router-link>
      <span><img src="../../assets/zan.svg" alt=""> {{comments.popularity}} </span>
      <span><img src="../../assets/xing.svg" alt=""></span>
      <span><img src="../../assets/fenxiang.svg" alt=""></span>
    </div>
    <cube-button @click="goBack" class="back">返回</cube-button>
    <!-- {{detail}} -->
    <div v-html="body"></div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import * as types from '../../store/actions-type';

const { mapState, mapActions } = createNamespacedHelpers('detail');
export default {
  data() {
    return {
      body: '',
    };
  },
  computed: {
    ...mapState(['detail', 'comments']),
  },
  methods: {
    ...mapActions([types.SET_DETAIL, types.SET_COMMENTS]),
    goBack() {
      this.$router.go(-1);
    },
  },
  async created() {
    const { id } = this.$route.params;
    await this[types.SET_DETAIL](id);
    // 插入样式
    let link = document.getElementById('link');
    if (!link) {
      link = document.createElement('link');
      link.id = 'link';
      link.href = this.detail.css[0];
      link.rel = 'stylesheet';
      document.body.appendChild(link);
    }
    this.body = this.detail.body;
  },
  mounted() {
    const { id } = this.$route.params;
    this[types.SET_COMMENTS](id);
  },
};
</script>
<style lang="stylus" scoped>
#detail{
  position relative
}
img{
  height 30px
  height 30px
}
.comments{
  position fixed
  bottom 0
  display flex
  justify-content space-around
  width 100%
  height 40px
  background rgb(248,248,248)
  span{
    display block
    width 80px
    height 100%
    text-align center
    line-height 40px
    font-size 16px
  }
}
.back{
  position absolute
  top 10px
  lefft 0px
  width 100px
  height 50px
}
</style>

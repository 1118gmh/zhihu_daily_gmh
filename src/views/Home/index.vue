<template>
  <!-- <div class="home" :class="background"> -->
  <div class="home">
    <!-- nav -->
    <!-- <HomeHeader :date="date" class="nav" :class="background" :bg="background" @change="change"></HomeHeader> -->
    <HomeHeader :date="date" class="nav"></HomeHeader>
    <div class="empty"></div>

    <!-- 轮播图 -->
    <div class="home-slide">
      <cube-slide ref="slide" :data="slides">
        <template slot="dots" slot-scope="props">
          <span
            class="my-dot"
            :class="{ active: props.current === index }"
            v-for="(item, index) in props.dots"
            :key="index"
            >{{ index + 1 }}</span
          >
        </template>
        <cube-slide-item v-for="(item, index) in slides" :key="index">
          <router-link :to="{ path: `/detail/${item.id}` }">
            <img :src="item.image" />
            <span class="title"> {{ item.title }} </span>
            <span class="hint"> {{ item.hint }} </span>
          </router-link>
        </cube-slide-item>
      </cube-slide>
    </div>
    <!-- 今日列表 -->
    <!-- <ul class="news">
      <template v-for="news in todayNews">
        <li :key="news.id" class="item">
          <router-link :to="{ path: `/detail/${news.id}` }">
            <span class="title"> {{ news.title }} </span>
            <span class="hint"> {{ news.hint }} </span>
            <img :src="news.images[0]" alt="" />
          </router-link>
        </li>
      </template>
    </ul> -->

        <!-- 列表 -->
        <!-- <div class="home-wrapper"> -->
    <!-- <cube-recycle-list class="list" :size="size" :on-fetch="onFetch" :offset="offset"> -->
      <!-- <template slot="item" slot-scope="{ data }"> -->
    <ul class="list">
      <template v-for="(data,index) in items">
        <li :key="index">
          <div class="timeBox">
            <div class="line"></div>
            <div class="time">{{ data.date | formatTime() }}</div>
          </div>
          <ul class="news">
            <template v-for="(news,index) in data.stories">
              <li :key="index" class="item">
                <router-link :to="{ path: `/detail/${news.id}` }">
                  <span class="title"> {{ news.title }} </span>
                  <span class="hint"> {{ news.hint }} </span>
                  <img :src="news.images[0]" alt="" />
                </router-link>
              </li>
            </template>
          </ul>
        </li>
      </template>
    </ul>

      <!-- </template> -->
    <!-- </cube-recycle-list> -->
    <!-- </div> -->
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import { fetchList } from '@/api/home';
import HomeHeader from './HomeHeader';
import * as types from '../../store/actions-type';

const { mapActions, mapState } = createNamespacedHelpers('home');

export default {
  data() {
    return {
      // size: 1, //每次拉取几条数据
      // offset: 10, //距离底部拉取数据的距离
      time: new Date(),
      timer: null,
      // background:"black"

    };
  },
  components: {
    HomeHeader,
  },
  computed: {
    ...mapState(['slides', 'todayNews', 'date', 'items']),
  },
  created() {
    // vue组件已经创建，属性已经绑定，但是没有DOM元素，$el也不存在
    // 在这里可以定义一些公共的属性
    this.time = this.formatTime(this.time);
  },
  methods: {
    // change(value){
    //   this.background = value;
    // },
    addZero(str) {
      str = str.length < 2 ? `0${str}` : str;
      return str;
    },
    formatTime(t) {
      // 标准时间=> 20210510
      let time = t || new Date();
      time = time.toLocaleDateString().split('/');
      time[1] = this.addZero(time[1]);
      time[2] = this.addZero(time[2]);
      time = time.join('');
      return time;
    },
    handlleTime(t) {
      // 20210510=> 标准时间
      const year = t.substr(0, 4);
      const mouth = t.substr(4, 2);
      const day = t.substr(6, 2);
      return `${year}/${mouth}/${day}`;
    },
    mimeDay(t) {
      let time = this.handlleTime(t);
      // 昨日标准时间 Sun May 09 2021 23:58:33 GMT+0800 (中国标准时间)
      time = new Date(new Date(time).getTime() - 24 * 60 * 60);
      return this.formatTime(time);
    },
    ...mapActions([types.SET_CONTENT]),
    async onFetch() {
      // let items = [];
      const result = await fetchList(this.time);
      this.items.push(result);
      // 时间减1天
      this.time = this.mimeDay(this.time);
      // return items;
    },
    scroll() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const {
          scrollHeight,
          scrollTop,
          clientHeight,
        } = document.documentElement;

        if (scrollTop + clientHeight + 200 > scrollHeight) {
          this.onFetch();
        }
      }, 500);
    },
  },

  mounted() {
    // 根据数据和模板生成html，并且已经替换el属性指向的DOM对象
    // 在这里可以发送请求,获取数据，并且进行数据更新，同步视图更新
    this[types.SET_CONTENT]();

    window.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
  },

};
</script>

<style lang="stylus">
.black{
  background rgba(0,0,0,.8) !important
  color rgba(255,255,255,.8) !important
}

.home{
  background white
  position relative
  .list {
    padding 0
    margin-top 10px
  }
  .timeBox{
    position relative
    padding 0 10px
    width 100%
    height 21px
    line-height 21px
    .time{
      font-size 14px
      color #ccc
    }
    .line{
      position absolute
      right 0
      top 10px
      width 80%
      border-top 1px solid #ccc
    }
  }
  .news{
    position relative
    margin 0
    padding 0
    .item{
      position relative
      padding 10px
      width 100%
      height 100px
      .title{
        display block
        width 80%
        height 50px
        font-size 18px
        color black
        line-height 25px
        overflow hidden
        text-overflow ellipsis
      }
      .hint{
        font-size 14px
      }
      img{
        position absolute
        top 10px
        right 10px
        width 20%
      }
    }
  }

  .nav{
    position fixed
    top 0
    left 0
    z-index 100
    width 100%
  }
  .empty{
    height 60px
  }

  .home-slide{
    position relative
    width 100%
    height 100%
    .cube-slide-dots{
      bottom 10px
      right 20px
      text-align right
      .my-dot{
        margin 3px
        width 5px
        height 5px
        border-radius 5px
        transition all .3s
      }
      .active{
        background white
        width 15px
        transition all .3s
      }
    }
    .cube-slide-item{
      position relative
      img{
        width 100%
        height 100%
      }
      .title{
        position absolute
        left 10px
        bottom 50px
        width 90%
        overflow hidden
        display block
        font-size 20px
        color white
        white-space pre-line
      }
      .hint{
        position absolute;
        left 10px
        bottom 30px
        font-size 14px
        color #ccc
      }
    }
  }
}

</style>

<template>
  <div class="home">
    <header>
      <h1>
        <img src="~@/assets/img/home/主页左上角LOGO.png" alt="" />
      </h1>
      <div class="userInfo">
        <img :src="userService.image" alt="" v-imgError="defaultImg" />
        <h3>欢迎你,<span>admin</span></h3>
        <el-tooltip
          class="item"
          effect="dark"
          content="退出登录"
          placement="bottom"
        >
          <el-button @click="logout"
            >退出<i class="el-icon-caret-bottom"></i
          ></el-button>
        </el-tooltip>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters, createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import defaultImg from '@/assets/common/head.jpg'

export default {
  data() {
    return {
      // defaultImg: require('@/assets/common/head.jpg'),
      defaultImg,
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    ...mapState(['userInfo', 'userService']),
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>
<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}

.home {
  margin-top: 60px;
}
header {
  position: fixed;
  left: 0;
  overflow: hidden;
  height: 60px;
  width: 100%;
  background-color: #5373e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-60px);

  img {
    height: 36px;
    margin-left: 16px;
  }
  .userInfo {
    display: flex;
    color: #fff;
    margin-right: 28px;
    align-items: center;
    img {
      height: 34px;
      margin-right: 12px;
    }
    h3 {
      font-weight: normal;
      margin-right: 28px;
      font-size: 17px;
      line-height: 3;
      span {
        font-size: 15px;
        margin-left: 12px;
      }
    }
    .el-button {
      color: #fff;
      background: none;
      border: 0;
      font-size: 16px;
    }
  }
}
</style>

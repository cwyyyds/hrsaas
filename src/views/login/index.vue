<template>
  <div class="login-img">
    <div class="login">
      <!-- 商标 -->
      <img src="~@/assets/img/商标.png" alt="" class="brandImg" />

      <el-form
        ref="loginForm"
        class="demo-ruleForm"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="loginName">
          <el-input
            type="text"
            v-model="loginForm.loginName"
            placeholder="admin"
          >
            <template #prepend
              ><span class="el-icon-mobile-phone"></span
            ></template>
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item class="userPassword" prop="password">
          <el-input
            :type="isShow ? 'password' : 'text'"
            v-model="loginForm.password"
            placeholder="请输入密码"
          >
            <template #prepend
              ><span class="square-full el-icon-lock"></span
            ></template>
            <template #append
              ><span
                class="iconfont icon-biyan"
                v-show="isShow"
                @click="isShowFn"
              ></span>
              <span
                class="iconfont icon-in_zhengyan"
                v-show="!isShow"
                @click="isShowFn"
              ></span>
            </template>
          </el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item class="authCode" prop="code">
          <el-input
            type="text"
            v-model="loginForm.code"
            placeholder="请输入验证码"
          >
            <template #prepend
              ><span class="iconfont icon-yanzhengyanzhengma"></span>
            </template>
            <template #append
              ><img :src="codeImg" alt="" class="codeImg" @click="getCodeImg" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getToken(loginForm)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from '@/api'
import { createNamespacedHelpers } from 'vuex'
const { mapActions: mapCateforyActions } = createNamespacedHelpers('user')
export default {
  name: 'LoginIndex',

  data() {
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '1234',
      },
      loginFormRules: {
        loginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入4位验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' },
        ],
      },
      //控制密码是否可见
      isShow: 'true',
      //验证码地址
      codeImg: '',
      //验证码节流
      flag: true,
      //随机数

      //用户token
      userToken: '',
    }
  },

  created() {
    this.getCodeImg()
  },

  methods: {
    ...mapCateforyActions(['getToken']),

    //获取验证码图片
    async getCodeImg() {
      try {
        if (this.flag) {
          //生成哈希值 Number(24)长度 24
          this.loginForm.clientToken = Array.from(Array(Number(24) || 24), () =>
            Math.floor(Math.random() * 36).toString(36),
          ).join('')
          this.flag = false
          const res = await getCodeImg(this.loginForm.clientToken)
          this.codeImg = window.URL.createObjectURL(res.data)
          this.flag = true
          return
        }
        this.$message('刷新过快')
        // alert('刷新过快')
      } catch (e) {
        console.log(e)
        this.flag = true
      }
    },
    //控制密码是否可见
    isShowFn() {
      this.isShow = !this.isShow
    },
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
//覆盖高亮
.el-input__inner:focus,
.el-input__inner:hover {
  border-color: #dcdfe6;
}
//覆盖报错红色
.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus {
  border-color: #dcdfe6;
}

.login-img {
  height: 100vh;
  width: 100vw;
  background: url('~@/assets/img/background_img.png') no-repeat;
  background-size: cover;
  position: relative;
  //商标
  .brandImg {
    position: absolute;
    width: 96px;
    height: 96px;
    top: -12%;
    left: 41.1%;
  }
}
.login {
  position: absolute;
  width: 518px;
  height: 388px;
  top: 50%;
  left: 50%;
  margin-top: -194px;
  margin-left: -259px;
  background: #fff;
  padding: 76px 35px 0;
  border-radius: 10px;
}
//覆盖高亮

//输入框
.el-form-item__content {
  display: flex;
}
.el-input__inner {
  height: 52px;
  background-color: #fff;
  border-left: 0;
}
//图标
.el-input-group__prepend {
  background-color: #fff;
  border-right: 0;
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  width: 30px;
  font-size: 16px;
}
//闭眼
.userPassword {
  input {
    border-right: 0;
  }
  .el-input-group__append {
    background-color: #fff;
    width: 28px;
    padding: 8px 0 0;
  }
  .iconfont {
    font-size: 22px;
  }
}
//验证码图片
.authCode {
  .el-input-group__append {
    width: 134px;
    background-color: #fff;
    padding: 0;
  }
  .iconfont {
    font-size: 16px;
  }
  img {
    display: block;
    width: 100%;
  }
}

//按钮
.el-button--primary {
  color: #fff;
  background-color: #6679ed;
  border-color: #6679ed;
  width: 100%;
  margin-top: 8px;
  height: 48px;
}
</style>

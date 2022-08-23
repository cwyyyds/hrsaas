<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(value, key) in messages"
        :disabled="key === $i18n.locale"
        :key="key"
        :command="key"
        >{{ value.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n/index'
import Cookie from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages,
    }
  },

  created() {
    console.log(this.messages)
  },

  methods: {
    handleCommand(command) {
      this.$i18n.locale = command
      this.$router.go(0)
      Cookie.set('lang', command)
    },
  },
}
</script>

<style scoped lang="scss"></style>

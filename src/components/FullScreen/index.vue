<template>
  <!-- 放置一个图标 -->
  <div style="margin: 0 8px">
    <!-- 放置一个svg的图标 -->
    <svg-icon
      iconClass="fullscreen"
      className="fullscreen"
      @click="onFullScreen"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  methods: {
    onFullScreen() {
      console.log(1)
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>

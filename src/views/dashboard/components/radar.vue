<template>
  <!-- 雷达图  图表必须给高和宽度-->
  <div ref="main" class="radar-echart" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  // 页面渲染完毕事件
  mounted() {
    this.initRadar()
  },
  methods: {
    initRadar() {
      var myChart = echarts.init(this.$refs.main)
      let radarOption = {
        color: ['blue', '#FFE434', '#56A3F1', '#FF917C'],
        title: {
          text: '人员绩效表',
        },
        legend: {
          data: ['张三', '李四'],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: '打卡', max: 100 },
            { name: '出勤', max: 100 },
            { name: 'BUG数量', max: 100 },
            { name: '迟到', max: 100 },
            { name: '早退', max: 100 },
          ],
          axisLine: {
            lineStyle: {
              color: 'red',
            },
          },
          splitArea: {
            areaStyle: {
              color: ['skyblue', '#26C3BE', '#64AFE9', '#428BD4'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10,
            },
          },
        },
        series: [
          {
            name: '人员绩效表',
            type: 'radar',
            data: [
              {
                value: [100, 100, 100, 100, 100, 100],
                name: '张三',
              },
              {
                value: [80, 80, 80, 80, 80, 80],
                name: '李四',
              },
            ],
          },
        ],
      }
      myChart.setOption(radarOption)
    },
  },
}
</script>

<style>
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>

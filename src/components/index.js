import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
// console.log(PageTools) //打印出来是个对象，在index.vue里面添加name属性，log打印对象里面也有对象属性
const components = [PageTools, UploadExcel]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  },
}

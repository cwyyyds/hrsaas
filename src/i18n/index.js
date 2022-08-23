import Cookie from 'js-cookie'
import Vue from 'vue'
//语言
import VueI18n from 'vue-i18n'
import en from './messages/en'
import zh from './messages/zh'

Vue.use(VueI18n)

//准备翻译的语言环境
export const messages = {
  en,
  zh,
}

// 通过选项创建VueI18n 实例
const i18n = new VueI18n({
  locale: Cookie.get('lang') || 'zh', //设置地区//设置语言
  messages, //设置地区信息//设置语言信息
})
export default i18n
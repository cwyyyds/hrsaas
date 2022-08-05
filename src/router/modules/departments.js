import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: { title: '定位管理', icon: 'icon-dianweiguanli' },
    },
  ],
}

import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: { title: '人员管理', icon: 'icon-dianweiguanli' },
    },
  ],
}

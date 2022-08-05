import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: { title: '工单管理', icon: 'icon-dianweiguanli' },
    },
  ],
}

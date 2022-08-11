<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <tree-tools
          :treeNode="{ name: '传智教育', manager: '负责人' }"
          @add="showAddDet"
        />
        <!-- 树形 -->
        <el-tree :data="treedata" :props="defaultProps" default-expand-all>
          <!-- 这是作用域插槽 -->
          <!-- v-slot 获取组件内部slot提供的数据 -->
          <template v-slot="scope">
            <tree-tools
              :treeNode="scope.data"
              @add="showAddDet"
              @edit="showEdit"
              @remove="loadDepts"
            />
          </template>
        </el-tree>
      </el-card>
    </div>

    <AddDept
      ref="addDept"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
      @add-success="loadDepts"
    ></AddDept>
  </div>
</template>

<script>
import TreeTools from '@/components/tree-tools.vue'
import { getDeptsApi } from '@/api/deportments'
import { transListToTree } from '@/utils'
import AddDept from './components/app-dept.vue'
export default {
  data() {
    return {
      treedata: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],

      defaultProps: {
        label: 'name',
      },
      dialogVisible: false,
      currentNode: {},
      loading: false,
    }
  },

  components: {
    TreeTools,
    AddDept,
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      this.loading = true
      const res = await getDeptsApi()
      this.treedata = transListToTree(res.depts, '')
      this.loading = false
    },
    showAddDet(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    },
  },
}
</script>

<style scoped lang="scss"></style>

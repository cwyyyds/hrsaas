<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="角色管理" name="first">
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="dialogVisible = true"
            >新增角色</el-button
          >
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <el-button type="primary">分配权限</el-button>
              <el-button type="success">编辑</el-button>
              <el-button type="danger">删除</el-button>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <div class="block">
            <el-pagination
              layout="sizes,prev, pager, next"
              :page-size="pagesize"
              :page-sizes="[3, 5, 10, 20]"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="currentChange"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second"
          ><el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled :placeholder="companyObj.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                :placeholder="companyObj.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled :placeholder="companyObj.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled :placeholder="companyObj.remarks"></el-input>
            </el-form-item> </el-form
        ></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 添加角色对话框 -->
    <!-- :mpdel -->
    <!-- v-model @input :value -->
    <el-dialog
      @close="dialogClose"
      title="新增角色"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form
        ref="form"
        label-width="80px"
        :model="addRoleForm"
        :rules="addRoleFormRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, addRoleApi } from '@/api/rols'
import { getCompanyInfoApi } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      pagesize: 3,
      total: 0,
      page: 1,
      dialogVisible: false,
      addRoleForm: {
        name: '',
        description: '',
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
      },
      companyObj: {},
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    async getRoles() {
      const { rows, total } = await getRoles({
        page: this.page,
        pagesize: this.pagesize,
      })
      this.tableData = rows
      this.total = total
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    async onAddRole() {
      await this.$refs.form.validate()
      await addRoleApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.dialogVisible = false
      this.getRoles()
    },
    //点击取消
    onClose() {
      this.dialogVisible = false
    },
    //监听对话框关闭
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.description = ''
    },
    async getCompanyInfo() {
      console.log(1)
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId,
      )
      console.log(res)
      this.companyObj = res
    },
  },
}
</script>

<style scoped lang="less"></style>

<template>
  <!-- 灰色弹层是el-dialog组件内部的 -->
  <!-- 组件内部点击灰色遮罩层 再修改visible -->
  <!-- this.$emit('update:visible',false) -->

  <!-- .sync 修饰符的作用 -->

  <el-dialog
    @close="onClose"
    :title="dialogTitle"
    :visible="visible"
    width="50%"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formDataRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input placeholder="输入部门名称" v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input placeholder="输入部门编码" v-model="formData.code"></el-input>
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择部门负责人"
          style="width: 100%"
          v-model="formData.manager"
        >
          <el-option
            :label="item.username"
            :value="item.username"
            v-for="item in employees"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="输入部门介绍"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsApi,
  addDeptsApi,
  getDeptByApi,
  editDeptApi,
} from '@/api/deportments'
import { geEmployeesApi } from '@/api/employees'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },
  data() {
    const checkDeptName = async (rule, value, callback) => {
      if (this.formData.id) {
        const { depts } = await getDeptsApi()
        const filterDepts = depts.filter(
          (item) =>
            item.pid === this.formData.pid && item.id !== this.formData.id,
        )
        const isRepeat = filterDepts.some((item) => item.name === value)
        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.currentNode.children) return callback()
        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value,
        )
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }
    const checkDeptCode = async (rule, value, cb) => {
      const { depts } = await getDeptsApi()
      let isRepeat
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }

      isRepeat ? cb(new Error('部门重复')) : cb()
    }
    return {
      dialogVisible: true,
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      formDataRules: {
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: 'blur',
          },
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '部门编码不能为空',
            trigger: 'blur',
          },
          {
            validator: checkDeptCode,
            trigger: 'blur',
          },
        ],
        manager: [
          {
            required: true,
            message: '部门负责人不能为空',
            trigger: 'change',
          },
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空',
            trigger: 'blur',
          },
          {
            trigger: 'blur',
            min: 1,
            max: 300,
            message: '部门介绍要求1-50个字符',
          },
        ],
      },
      employees: [],
    }
  },

  created() {
    this.geEmployeesApi()
  },

  computed: {
    dialogTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },

  methods: {
    async geEmployeesApi() {
      const res = await geEmployeesApi()
      console.log(res)
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      }
    },
    async onSave() {
      await this.$refs.form.validate()

      try {
        if (this.formData.id) {
          await editDeptApi(this.formData)
          this.$message.success('编辑成功')
          this.onClose()
          this.$emit('add-success')
        } else {
          this.formData.pid = this.currentNode.id
          await addDeptsApi(this.formData)
          this.$message.success('新增部门成功')
          this.onClose()
          this.$emit('add-success')
        }
      } catch (err) {
        this.$message.success('新增部门失败')
      }
    },
    async getDeptById(id) {
      this.formData = await getDeptByApi(id)
    },
  },
}
</script>

<style scoped lang="less"></style>

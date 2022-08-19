<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcelFn"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="showAdd"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="EmployeesInfoList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工" sortable="">
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  border-radius: 50%;
                  height: 100px;
                  width: 100px;
                  padding: 10px;
                "
                alt=""
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatFormOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column
            label="账户状态"
            align="center"
            sortable=""
            prop="enableState"
          >
            <template slot-scope="{ row }">
              <!-- 根据当前状态来确定 是否打开开关 -->
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onRemove"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :total="total"
            :page-size="pages.size"
            @current-change="currentChange"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
    </div>

    <AddEmployees
      :visible.sync="showAddEmployees"
      @add-success="getEmployeesInfoApi"
    ></AddEmployees>

    <el-dialog title="二维码" :visible.sync="ercodeDialog">
      <el-row type="flex" justify="center">
        <canvas id="canvas" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployees } from '@/api/employees'
import employees from '@/constant/employees'
import AddEmployees from './components/add-employees.vue'
const { exportExcelMapPath, hireType } = employees
import QRcode from 'qrcode'
export default {
  data() {
    return {
      ercodeDialog: false,
      showAddEmployees: false,
      EmployeesInfoList: [],
      pages: {
        page: 1,
        size: 10,
      },
      total: 0,
    }
  },

  created() {
    this.getEmployeesInfoApi()
  },

  methods: {
    async getEmployeesInfoApi() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.EmployeesInfoList = rows
      this.total = total
    },
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesInfoApi()
    },
    formatFormOfEmployment(row, colum, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async onRemove(id) {
      await this.$confirm('是否删除改成员')
      await delEmployees(id)
      this.$message.success('删除成功')
      this.getEmployeesInfoApi()
    },
    showAdd() {
      this.showAddEmployees = true
    },
    // exportExcelFn() {
    //   import('@/vendor/Export2Excel').then((excel) => {
    //     excel.export_json_to_excel({
    //       header: ['姓名', '电话'], //表头 必填
    //       data: [
    //         ['张三', '123'],
    //         ['张三', '123'],
    //       ], //具体数据 必填
    //       filename: 'excel-list', //非必填
    //       autoWidth: true, //非必填
    //       bookType: 'xlsx', //非必填
    //     })
    //   })
    // },
    async exportExcelFn() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesInfoApi({
        page: 1,
        size: this.total,
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      console.log(data)
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: 'excel-list', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
      })
    },
    showErCodeDialog(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户还未设置头像')
      this.ercodeDialog = true

      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, staffPhoto)
      })
    },
  },

  components: {
    AddEmployees,
  },
}
</script>

<style scoped lang="less"></style>

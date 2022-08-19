<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :http-request="onServe"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img width="100%" :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDUqysXzCBuPfgT2MQFpAF5g17yZv1sTou',
  SecretKey: 'ta3GDuOcZJp7AMwVcU6TaS5SaS5SaT6U',
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      loading: false,
      fileList: [],
      previewImgDialog: false,
      imgUrl: '',
    }
  },

  created() {},

  methods: {
    onServe({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hmhr-31-1313341695' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode != 200) {
            return this.$message.error('亲,上传失败,请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
        },
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      const types = ['image/jpg', 'image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }

      const maxSize = 10 * 1024 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片不能超过10kb')
        return false
      }
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  height: 148px;
  width: 148px;
  overflow: hidden;
}
</style>

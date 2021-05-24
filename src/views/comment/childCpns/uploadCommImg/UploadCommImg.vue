<template>
  <div class="sctpxx">
      <div class="dasd">
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-upload class="myupload" ref="upload"
          action="12312"
          list-type="picture-card" :multiple="multiple"
          :on-preview="handlePictureCardPreview" :limit="limitnum"
          :auto-upload="auto_upload" :on-exceed="onexceed"  accept="image/*"
          :http-request="uploadFile" :on-change="onChange">
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
  </div>
</template>
<script>
export default {
  name: "uploadcommimg",
  data () {
    return {
    };
  }
}
</script>
<style scoped>
</style>
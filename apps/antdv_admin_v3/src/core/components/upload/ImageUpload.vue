<template>
  <div>
    <a-upload
      action="/api/upload"
      list-type="picture-card"
      accept="image/*"
      :file-list="fileList"
      @preview="handlePreview"
      :customRequest="upload"
      :remove="handleRemove"
      :disabled="loading"
      :showUploadList="{ showPreviewIcon: true, showRemoveIcon: !readonly }"
      class="x-upload-wrap"
    >
      <div v-if="fileList.length < max && !readonly">
        <div v-if="loading">
          <a-icon type="loading" />
          <div class="ant-upload-text">正在上传...</div>
        </div>
        <div v-else>
          <a-icon type="plus" />
          <div class="ant-upload-text">选取文件</div>
        </div>
      </div>
    </a-upload>
    <a-modal
      :visible="visible"
      :footer="null"
      @cancel="handleCancel"
      :title="''"
      :destroyOnClose="true"
      :bodyStyle="{ padding: 0 }"
      :wrapClassName="'img-modal'"
    >
      <img style="display: block;max-width: 100%;margin: 0 auto;" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
// import { upload, info } from '@/api/file'
import { upload } from '@/api/upload/file'

// eslint-disable-next-line no-unused-vars
function getBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

let FID = 1

function convert(f) {
  FID++
  return {
    // id: f.picId || FID,
    id: f.id || FID,
    uid: -FID,
    name: f.name || `${FID}.jpg`,
    status: 'done',
    isImg: true,
    ...f,
    // url: f.picUrl,
    url: f.url,
    path: f.url,
    preview: f.url
  }
}

export default {
  name: 'XImgUpload',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    max: {
      type: Number,
      default: 1000
    },
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: function (val) {
      if (val) {
        this.fileList = val.map(convert)
      }
    }
  },
  data() {
    return {
      visible: false,
      previewImage: '',
      fileList: [],
      readonly: false,
      loading: false,
      // loadingData: false,
      cur: null
    }
  },
  created() {
      this.fileList = this.value.map(convert)
    this.readonly = this.disabled
  },
  methods: {
    upload(options) {
      this.loading = true
      const file = options.file
      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('name', file.name)
      formData.append('categoryId', 0)
      // let base64Path = ''
      // getBase64(file).then((path) => {
      //   base64Path = path
      // })
      return upload(formData).then((ret) => {
        this.loading = false
        const d = ret.data
        const curFile = {
          // ...this.cur,
          name: d.name || '',
          url: d.url,
          id: d.id || FID++,
          // picUrl: d.picUrl,
          // picId: d.picId || FID++,
          status: 'done'
        }
        this.fileList = [...this.fileList, convert(curFile)]
        this.$emit('change', this.fileList)
      }).catch(e => {
        this.loading = false
        this.fileList = [...this.fileList]
      })
    },
    handleCancel() {
      this.visible = false
    },
    handlePreview(file) {
      this.previewImage = file.url || file.path
      this.visible = true
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter((f) => f.uid !== file.uid)
      this.$emit('change', this.fileList)
      return true
    }
  }
}
</script>
<style lang="less">
.x-upload-wrap {
  display: flex;
}
</style>

<!-- <template>
  <a-upload
    action=""
    :multiple="true"
    :show-upload-list="false"
    accept="image/*"
    :customRequest="upload"
    :disabled="loading"
    class=""
  >
    <slot></slot>
  </a-upload>
</template>
<script>
import { upload } from '@/api/upload/file'

export default {
  name: 'ImgUpload',
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    max: {
      type: Number,
      default: 1000,
    },
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  watch: {
    id(val, old) {
      if (val !== old) {
        this.categoryId = val
      }
    },
  },
  data() {
    return {
      loading: false,
      categoryId: 0,
    }
  },
  created() {
    this.categoryId = this.id
  },
  methods: {
    upload(options) {
      this.loading = true
      const file = options.file

      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('categoryId', this.categoryId)

      return upload(formData)
        .then((ret) => {
          this.loading = false
          const data = ret.data
          this.$emit('ok', data)
        })
        .catch((e) => {
          this.loading = false
          // this.$emit('error', data)
        })
    },
  },
}
</script> -->

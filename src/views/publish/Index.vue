<template>
  <div class="publish">
    <page-header-wrapper>
      <template v-slot:content>
        <QuillEditor v-model="content" />
      </template>
      <template v-slot:extraContent>
        <a-button @click="openDialog">Dialog Test</a-button>
      </template>
    </page-header-wrapper>
    <a-form>
      <a-form-item label="展示封面：" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" required>
        <a-radio-group v-decorator="['', { initialValue: '0' }]">
          <a-radio value="0">单图</a-radio>
          <a-radio value="1">三图</a-radio>
          <a-radio value="3">无封面</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="上传图片" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" help="优质的封面有利于推荐，格式支持JPEG、PNG">
        <a-upload
          name="videoUrl"
          accept="video/mp3"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :custom-request="handleUpload"
        >
          <img v-if="urls.secondImg" :src="urls.secondImg" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="声明原创" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" help="声明原创要求：正文字数>300（动漫/摄影领域加V认证的作者除外），且原创内容多于引用内容。抄袭、洗稿等滥用原创行为将有处罚，详见《声明原创须知》">
        <a-checkbox @change="onChange">
          声明原创
        </a-checkbox>
      </a-form-item>
      <a-form-item label="发文特权" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-checkbox-group @change="onChange">
          <a-checkbox value="0">
            允许赞赏（今日还有3次机会）
          </a-checkbox>
          <a-checkbox value="1">
            扩展链接
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="投放广告：" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" required>
        <a-radio-group v-decorator="['', { rules: [{ required: true }], initialValue: '0' }]" name="">
          <a-radio value="0">投放广告赚收益</a-radio>
          <a-radio value="1">不投放广告</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <div class="mt-32 ml-64">
      <a-button
        @click="saveInfo"
      >预览</a-button>
      <a-button
        @click="saveInfo"
      >存草稿</a-button>
      <a-button
        @click="saveInfo"
      >定时发布</a-button>
      <a-button
        type="primary"
        @click="saveInfo"
      >发布</a-button>
    </div>
  </div>

</template>

<script>
import QuillEditor from '@/components/Editor/QuillEditor'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'Index',
  components: { QuillEditor },
  data() {
    return {
      content: '',
      loading: false,
      urls: {
        firstImg: null,
        secondImg: null,
        thirdImg: null,
        videoUrl: null
      }
    }
  },
  methods: {
    saveInfo() {},
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
    },
    handleUpload(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.urls.secondImg = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt3M = file.size / 1033 / 1033 < 3
      if (!isLt3M) {
        this.$message.error('Image must smaller than 3MB!')
      }
      return isJpgOrPng && isLt3M
    },
    openDialog() {
      this.$dialog('你好')
      this.$success('你好')
    }
  }
}
</script>

<style scoped lang="less">
.publish {
  width: 100%;
  button{
    margin-left: 12px;
  }
  .ant-form-item-with-help{
    margin-bottom: 34px;
  }
}
</style>

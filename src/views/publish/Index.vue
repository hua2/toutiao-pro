<template>
  <div class="publish">
    <page-header-wrapper :title="false">
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="标题" required>
          <a-input
            v-model="formData.title"
          ></a-input>
        </a-form-item>
        <a-form-item label="板式：" :required="true">
          <a-radio-group v-model="formData.format">
            <a-radio :value="0">单图</a-radio>
            <a-radio :value="1">三图</a-radio>
            <a-radio :value="2">纯文字</a-radio>
            <a-radio :value="3">大图</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="formData.format===0 || formData.format===1 || formData.format===3"
          label="封面："
          :required="true"
        >
          <a-upload
            name="firstImg"
            accept="image/*"
            list-type="picture-card"
            :show-upload-list="false"
            class="pic-upload"
            :custom-request="(e=>handleUpload(e,'firstImg'))"
            :before-upload="beforeUpload"
          >
            <img v-if="urls.firstImg" :src="urls.firstImg" alt="avatar" />
            <div v-else>
              <a-icon :type="uploading.firstImg ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item v-if="formData.format===1" label="图片：">
          <a-upload
            style="width:120px"
            name="secondImg"
            accept="image/*"
            list-type="picture-card"
            class="pic-upload"
            :show-upload-list="false"
            :custom-request="(e=>handleUpload(e,'secondImg'))"
            :before-upload="beforeUpload"
          >
            <img v-if="urls.secondImg" :src="urls.secondImg" alt="avatar" />
            <div v-else>
              <a-icon :type="uploading.secondImg ? 'loading' : 'plus'" />
            </div>
          </a-upload>
          <a-upload
            style="width:120px"
            name="thirdImg"
            accept="image/*"
            list-type="picture-card"
            class="pic-upload"
            :show-upload-list="false"
            :custom-request="(e=>handleUpload(e,'thirdImg'))"
            :before-upload="beforeUpload"
          >
            <img v-if="urls.thirdImg" :src="urls.thirdImg" alt="avatar" />
            <div v-else>
              <a-icon :type="uploading.thirdImg ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="内容" required>
          <QuillEditor class="publish-editor" :value="formData.content" @change="onEditorChange" />
        </a-form-item>
        <a-form-item label="声明原创：" required>
          <a-radio-group v-model="formData.original">
            <a-radio :value="1">原创</a-radio>
            <a-radio :value="0">转载</a-radio>
          </a-radio-group>
          <template #help>
            声明原创要求：正文字数>300（动漫/摄影领域加V认证的作者除外），且原创内容多于引用内容。抄袭、洗稿等滥用原创行为将有处罚，
            <a href="#" @click="originalClick">详见《声明原创须知》</a>
          </template>
        </a-form-item>
      </a-form>
      <div class="flex justify-center">
        <a-button :loading="isLoading" @click="handleClose">取消</a-button>
        <a-button @click="previewClick">预览</a-button>
        <a-button
          :loading="isDraftLoading"
          :disabled="formData.title === '' || ((formData.format===0 ||formData.format===3) ?urls.firstImg === null:formData.format===1? urls.firstImg === null ||urls.secondImg === null ||urls.thirdImg === null:'')|| formData.original === ''
            || formData.content === ''"
          @click="publishDraft('0')"
        >存草稿</a-button>
        <a-button
          type="primary"
          :loading="isLoading"
          :disabled="formData.title === '' || ((formData.format===0 ||formData.format===3) ?urls.firstImg === null:formData.format===1? urls.firstImg === null ||urls.secondImg === null ||urls.thirdImg === null:'')|| formData.original === ''
            || formData.content === ''"
          @click="saveInfo('0')"
        >发布</a-button>
      </div>
    </page-header-wrapper>
    <ArticleModal ref="articleModal" />
    <PreviewModal ref="previewModal" />
  </div>

</template>

<script>
import QuillEditor from '@/components/Editor/QuillEditor'
import ArticleModal from '@/views/publish/modules/ArticleModal'
import PreviewModal from '@/views/publish/modules/PreviewModal'
export default {
  name: 'Index',
  components: { PreviewModal, ArticleModal, QuillEditor },
  data() {
    return {
      formData: {
        title: '',
        format: 0,
        original: 1,
        content: ''
      },
      type: 0,
      loading: false,
      isLoading: false,
      isDraftLoading: false,
      uploading: {
        firstImg: false,
        secondImg: false,
        thirdImg: false
      },
      urls: {
        firstImg: null,
        secondImg: null,
        thirdImg: null
      },
      id: undefined
    }
  },
  created() {
    // 获取 链接里的id
    this.id = this.$route.query.id
    if (this.id) {
      this.findOne()
    }
  },
  methods: {
    handleClose() {
      window.history.back()
    },
    originalClick() {
      this.$refs.articleModal.showDetailModal()
    },
    previewClick() {
      if (!this.formData.title || !this.formData.content) {
        this.$message.error('请输入标题和内容')
      } else {
        this.$refs.previewModal.showPreviewModal()
        this.$refs.previewModal.formData = this.formData
      }
    },
    onEditorChange(val) {
      this.formData.content = val
    },
    saveInfo(type) {
      this.isLoading = true
      this.$api.work.publishMedia({
        ...this.urls,
        ...this.formData,
        type: type,
        uid: this.$store.state.user.userId,
        state: 1
      }).then(res => {
        this.isLoading = false
        if (res.status === 'SUCCESS') {
          this.$message.success('发布成功')
          this.$router.push('/manage/works/index')
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    publishDraft(type) {
      this.isDraftLoading = true
      this.$api.work.publishDraft({
        ...this.formData,
        ...this.urls,
        type: type,
        uid: this.$store.state.user.userId,
        state: 0
      }).then(res => {
        this.isDraftLoading = false
        if (res.status === 'SUCCESS') {
          this.$message.success('发布成功')
          this.$router.push('/manage/works/index')
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    // 编辑获取数据
    findOne() {
      this.$api.work.findOne({ id: this.id }).then(res => {
        if (res.status === 'SUCCESS') {
          this.formData = res.data
          this.urls.firstImg = res.data.firstImg
          this.urls.secondImg = res.data.secondImg
          this.urls.thirdImg = res.data.thirdImg
        }
      })
    },
    handleUpload(e, type) {
      this.uploading[type] = true
      this.$api.work.uploadPicture(e.file, 0)
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.urls[type] = res.data
            this.uploading[type] = false
            console.log(this.urls)
            this.$message.success('上传成功')
          }
        })
        .catch(error => {
          console.log(error)
          this.$message.error('upload error!')
        })
    },
    beforeUpload(file) {
      if (!file.type.startsWith('image')) {
        this.$message.error('请上传图片')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped lang="less">
.publish {
  width: 100%;
  .pic-upload{
   img{
    width: 88px;
    height: 88px;
   }
  }

  button{
    margin-left: 12px;
  }
  a{
    color: #1356bd;
  }
  .ant-form-item-with-help{
    margin-bottom: 34px;
  }
  .publish-editor {
    width: 580px;
    /deep/ .ql-container.ql-snow {
       min-height: 260px;
      }
  }
}
</style>

<template>
  <div class="publish">
    <page-header-wrapper :title="false">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="标题" required>
          <a-input
            v-model="title"
          ></a-input>
        </a-form-item>
        <a-form-item label="板式：" :required="true">
          <a-radio-group v-decorator="['format', { initialValue: '0' }]" name="form.format">
            <a-radio value="0">单图</a-radio>
            <a-radio value="1">三图</a-radio>
            <a-radio value="2">纯文字</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-row style="padding-left: 130px;">
          <a-col :span="8">
            <a-form-item
              label="封面："
              :required="true"
            >
              <a-upload
                name="firstImg"
                accept="image/*"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :custom-request="handleUpload"
                :before-upload="beforeUpload"
              >
                <img v-if="urls.firstImg" :src="urls.firstImg" alt="avatar" />
                <div v-else>
                  <a-icon :type="uploading.firstImg ? 'loading' : 'plus'" />
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="图片：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-upload
                name="secondImg"
                accept="image/*"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :custom-request="handleUpload"
                :before-upload="beforeUpload"
              >
                <img v-if="urls.secondImg" :src="urls.secondImg" alt="avatar" />
                <div v-else>
                  <a-icon :type="uploading.secondImg ? 'loading' : 'plus'" />
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="图片：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-upload
                name="thirdImg"
                accept="image/*"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                :custom-request="handleUpload"
                :before-upload="beforeUpload"
              >
                <img v-if="urls.thirdImg" :src="urls.thirdImg" alt="avatar" />
                <div v-else>
                  <a-icon :type="uploading.thirdImg ? 'loading' : 'plus'" />
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item label="内容">
          <QuillEditor v-model="content" class="publish-editor" />
        </a-form-item>
        <a-form-item label="声明原创：">
          <a-radio-group v-decorator="['original', { rules: [{}], initialValue: '0' }]" name="original">
            <a-radio value="0">原创</a-radio>
            <a-radio value="1">非原创</a-radio>
          </a-radio-group>
          <template #help>
            声明原创要求：正文字数>300（动漫/摄影领域加V认证的作者除外），且原创内容多于引用内容。抄袭、洗稿等滥用原创行为将有处罚，
            <a href="#" @click="originalClick">详见《声明原创须知》</a>
          </template>
        </a-form-item>
      </a-form>
      <div class="flex justify-center">
        <a-button
        >预览</a-button>
        <a-button>存草稿</a-button>
        <a-button
          type="primary"
          @click="saveInfo"
        >发布</a-button>
      </div>
    </page-header-wrapper>
    <ArticleModal ref="articleModal" />
  </div>

</template>

<script>
import QuillEditor from '@/components/Editor/QuillEditor'
import ArticleModal from '@/views/publish/modules/ArticleModal'
export default {
  name: 'Index',
  components: { ArticleModal, QuillEditor },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'video-form' }),
      type: 0,
      title: '',
      format: 0,
      videoUrl: 0,
      original: 0,
      content: '',
      loading: false,
      uploading: {
        firstImg: false,
        secondImg: false,
        thirdImg: false,
        videoUrl: false
      },
      urls: {
        firstImg: null,
        secondImg: null,
        thirdImg: null,
        videoUrl: null
      }
    }
  },
  methods: {
    publishMedia() {
      this.$api.work.publishMedia().then(res => {
        if (res.status === 'SUCCESS') {
          console.log(res)
        }
      })
    },
    originalClick() {
      this.$refs.articleModal.showDetailModal()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    saveInfo() {
      this.$api.work.publishMedia({
        type: 0,
        title: this.title,
        firstImg: this.urls.firstImg,
        original: this.original,
        content: this.content
      }).then(res => {
        if (res.status === 'SUCCESS') {
          console.log(res)
        }
      })
    },
    handleUpload() {
      this.$api.work.uploadPicture()
        .then(res => {
          this.urls.firstImg = res.data
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

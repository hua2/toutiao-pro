<template>
  <div class="publish-video">
    <page-header-wrapper :title="false">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="上传" required>
          <a-upload
            name="videoUrl"
            accept="video/*"
            :show-upload-list="false"
            :custom-request="(e=>handleUpload(e,'videoUrl'))"
            :before-upload="beforeVideoUpload"
          >
            <a-button> <a-icon type="upload" /> Upload </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="标题" required>
          <a-textarea
            v-model="title"
            maxlength="30"
            :rows="1"
            @input="descInput"
          ></a-textarea>
          <span class="p-v-title">{{ remnant }}/30</span>
        </a-form-item>
        <a-form-item label="封面" required>
          <template #help>
            清晰美观的封面有利于推荐，建议分辨率不低于 1920*1080（大小不超过 20M）
          </template>
          <a-upload
            name="firstImg"
            accept="image/*"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :custom-request="(e=>handleUpload(e,'firstImg'))"
            :before-upload="beforeUpload"
          >
            <img v-if="urls.firstImg" :src="urls.firstImg" alt="avatar" />
            <div v-else>
              <a-icon :type="uploading.firstImg ? 'loading' : 'plus'" />
            </div>
          </a-upload>
        </a-form-item>
        <!-- <a-form-item label="视频简介">
          <a-textarea
            v-model="videoInfo"
            maxlength="400"
            :rows="1"
            @input="descVideoInput"
          ></a-textarea>
          <span class="p-v-title">{{ videoRemnant }}/400</span>
        </a-form-item> -->
        <a-form-item label="创作类型：" required>
          <a-radio-group v-model="original">
            <a-radio :value="0">原创</a-radio>
            <a-radio :value="1">转载</a-radio>
          </a-radio-group>
        </a-form-item>
        <!-- <a-form-item label="创作收益：">
          发布原创视频可获得收益，非原创内容勾选原创将受到处罚，详见 <a href="#">查看详情</a>
        </a-form-item>
        <a-form-item label="水印设置：" help="视频中增加带有你昵称的水印查看预览">
          <a-checkbox @change="onChange">
            开启专属水印
          </a-checkbox>
        </a-form-item>
        <a-form-item label="视频标签：">
          <a-input />
        </a-form-item>
        <a-form-item label="扩展链接：" help="视频中增加带有你昵称的水印查看预览">
          <a-checkbox @change="onChange">
            在角马能源APP的固定位置插入连接
          </a-checkbox>
        </a-form-item> -->
      </a-form>
      <div class="flex justify-center">
        <a-button>存草稿</a-button>
        <a-button
          type="primary"
          @click="saveInfo('1')"
        >发布</a-button>
      </div>
    </page-header-wrapper>
  </div>

</template>

<script>
export default {
  name: 'Video',
  components: { },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'video-form' }),
      type: 0,
      title: '',
      videoUrl: 0,
      original: 0,
      loading: false,
      isLoading: false,
      uploading: {
        firstImg: false,
        videoUrl: false
      },
      urls: {
        firstImg: null,
        videoUrl: null
      },
      remnant: 0
    }
  },
  methods: {
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    descInput() {
      const txtVal = this.title.length
      this.remnant = 0 + txtVal
    },
    // descVideoInput() {
    //   const videoVal = this.videoInfo.length
    //   this.remnant = 0 + videoVal
    // },
    saveInfo(type) {
      this.form.validateFields((err, values) => {
        console.log('values', values)
        if (!err) {
          this.isLoading = true
          this.$api.work.publishMedia({
            ...values,
            ...this.urls,
            title: this.title,
            type: type,
            original: this.original,
            format: this.format,
            content: this.content,
            informationType: this.informationType,
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
        }
      })
    },
    handleUpload(e, type) {
      this.$api.work.uploadPicture(e.file, 0)
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.urls[type] = res.data
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
    },
    beforeVideoUpload(file) {
      if (!file.type.startsWith('video')) {
        this.$message.error('请上传视频')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped lang="less">
.publish-video {
  width: 100%;
  .p-v-title {
    position: absolute;
    right: 12px;
  }
  a{
    color: #1356bd;
  }
  button{
    margin-left: 12px;
  }
  .ant-form-item-with-help{
    margin-bottom: 34px;
  }
}
</style>

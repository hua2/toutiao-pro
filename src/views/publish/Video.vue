<template>
  <div class="publish-video">
    <page-header-wrapper />
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="上传" required>
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :transform-file="transformFile"
        >
          <a-button> <a-icon type="upload" /> Upload </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="标题" required>
        <a-textarea
          v-model="userName"
          maxlength="30"
          :rows="1"
          @input="descInput"
        ></a-textarea>
        <span class="p-v-title">{{ remnant }}/30</span>
      </a-form-item>
      <a-form-item label="封面" required>
        <template #help>
          <h4>清晰美观的封面有利于推荐，建议分辨率不低于 1920*1080（大小不超过 20M）建议的封面</h4>
        </template>
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
      <a-form-item label="视频简介">
        <a-textarea
          v-model="videoInfo"
          maxlength="400"
          :rows="1"
          @input="descVideoInput"
        ></a-textarea>
        <span class="p-v-title">{{ videoRemnant }}/400</span>
      </a-form-item>
      <a-form-item label="创作类型：" required>
        <a-radio-group v-decorator="['', { rules: [{ required: true }], initialValue: '0' }]" name="">
          <a-radio value="0">原创</a-radio>
          <a-radio value="1">转载</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="创作收益：">
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
          在角马能源APP的固定位置插入连接 了解扩展链接
        </a-checkbox>
      </a-form-item>
    </a-form>
    <div class="mt-32 ml-64">
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
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'Video',
  components: { },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'video-form' }),
      loading: false,
      urls: {
        firstImg: null,
        secondImg: null,
        thirdImg: null,
        videoUrl: null
      },
      remnant: 0,
      userName: '',
      videoRemnant: 0,
      videoInfo: ''
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    saveInfo() {},
    descInput() {
      const txtVal = this.userName.length
      this.remnant = 0 + txtVal
    },
    descVideoInput() {
      const videoVal = this.videoInfo.length
      this.remnant = 0 + videoVal
    },
    transformFile(file) {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const canvas = document.createElement('canvas')
          const img = document.createElement('img')
          img.src = reader.result
          img.onload = () => {
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            ctx.fillStyle = 'red'
            ctx.textBaseline = 'middle'
            ctx.fillText('Ant Design', 20, 20)
            canvas.toBlob(resolve)
          }
        }
      })
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

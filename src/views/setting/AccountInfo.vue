<template>
  <div class="account flex pt-16">
    <div class="account-title">帐号信息</div>
    <div class="account-container">
      <InfoModal
        title="用户名"
        content="角马能源"
        edit="编辑"
        @update="accountClick"
      />
      <InfoModal
        title="用户简介"
        content="高一度看能源产业，我们为你解码能源风云。"
        edit="编辑"
        @update="accountInfoClick"
      />
      <div class="account-item">
        <div class="account-item-wrapper">
          <div class="label">用户头像</div>
          <div class="content">
            <a-upload
              name="secondImg"
              accept="image/*"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :custom-request="handleUpload"
              :before-upload="beforeUpload"
            >
              <img v-if="urls.image" :src="urls.image" alt="avatar" />
              <div v-else>
                <a-icon :type="uploading.image ? 'loading' : 'plus'" />
              </div>
            </a-upload>
          </div>
        </div>
      </div>
      <InfoModal title="头条号类型" content="企业" edit="更改类型" />
      <InfoModal title="头条号ID" content="1617710493171719" edit="复制ID" />
      <InfoModal
        title="作者二维码"
        img="http://sf3-ttcdn-tos.pstatp.com/obj/pgc-image/40599uonkf6f56p5.png"
        edit="下载二维码"
      />
      <AccountModal ref="accountModal" />
      <AccountInfoModal ref="accountInfoModal" />
    </div>
  </div>
</template>

<script>
import InfoModal from '@/views/setting/components/InfoModal'
import AccountModal from '@/views/setting/modules/AccountModal'
import AccountInfoModal from '@/views/setting/modules/AccountInfoModal'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'AccountInfo',
  components: { AccountInfoModal, AccountModal, InfoModal },
  data() {
    return {
      loading: false,
      uploading: {
        image: false
      },
      urls: {
        image: null
      }
    }
  },
  methods: {
    accountClick() {
      this.$refs.accountModal.showModal()
    },
    accountInfoClick() {
      this.$refs.accountInfoModal.showInfoModal()
    },
    handleUpload(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
    // handleUpload(e) {
    //   const file = e.file
    //   const key = e.filename
    //   const putFilename = key + '_' + new Date().getTime() + '_' + file.name
    //   this.uploading[key] = true
    //   OSSClient.put(putFilename, file)
    //           .then(res => {
    //             this.urls[key] = res.url
    //             this.uploading[key] = false
    //           })
    //           .catch(error => {
    //             console.log(error)
    //             this.uploading[key] = false
    //             this.$message.error('upload error!')
    //           })
    // },
    // beforeUpload(file) {
    //   const isImage = file.type.startsWith('image')
    //   if (!isImage) {
    //     this.$message.error('You can only upload Image file!')
    //   }
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isLt2M) {
    //     this.$message.error('Image must smaller than 2MB!')
    //   }
    //   return isImage && isLt2M
    // },
  }
}
</script>

<style scoped lang="less">
.account {
  width: 100%;
  padding-left: 12px;
  overflow-x: auto;
  }
  .account-title {
    margin-top: 22px;
    width: 120px;
    font-size: 16px;
    font-weight: 700;
    color: #222;
  }
  .account-container {
    flex: 1;
    .account-item {
      padding: 24px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e8e8e8;
      .account-item-wrapper {
        flex: 1;
        display: -webkit-box;
        .label {
          width: 142px;
        }
        .content {
          -webkit-box-flex: 1;
          color: #666;
          display: flex;
          justify-content: space-between;
          img {
            width: 60px;
            height: 60px;
            border: 1px solid #e8e8e8;
            background-color: #e8e8e8;
          }
          button {
            color: #1356bd;
            border: unset;
            background: #fff;
          }
        }
      }
    }
  }
</style>

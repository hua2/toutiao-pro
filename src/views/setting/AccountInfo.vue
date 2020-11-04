<template>
  <div class="account flex pt-16">
    <div class="account-title">帐号信息</div>
    <div class="account-container">
      <InfoModal
        title="用户名"
        :content="account.nickName"
        edit="编辑"
        @update="accountClick"
      />
      <InfoModal
        title="用户简介"
        :content="account.sign"
        edit="编辑"
        @update="accountInfoClick"
      />
      <div class="account-item">
        <div class="account-item-wrapper">
          <div class="label">用户头像</div>
          <div class="content">
            <a-upload
              name="firstImg"
              accept="image/*"
              list-type="picture-card"
              class="pic-upload"
              :show-upload-list="false"
              :custom-request="(e=>handleUpload(e,'firstImg'))"
              :before-upload="beforeUpload"
            >
              <img v-if="account.headPicUrl" :src="account.headPicUrl" alt="avatar" />
              <img v-else :src="urls.firstImg" alt="avatar" />
            </a-upload>
          </div>
        </div>
      </div>
      <!--      <InfoModal title="头条号类型" content="企业" edit="更改类型" />-->
      <!--      <InfoModal title="头条号ID" content="1617710493171719" edit="复制ID" />-->
      <!--      <InfoModal-->
      <!--        title="作者二维码"-->
      <!--        img="http://sf3-ttcdn-tos.pstatp.com/obj/pgc-image/40599uonkf6f56p5.png"-->
      <!--        edit="下载二维码"-->
      <!--      />-->
      <AccountModal ref="accountModal" />
      <AccountInfoModal ref="accountInfoModal" />
    </div>
  </div>
</template>

<script>
import InfoModal from '@/views/setting/components/InfoModal'
import AccountModal from '@/views/setting/modules/AccountModal'
import AccountInfoModal from '@/views/setting/modules/AccountInfoModal'

export default {
  name: 'AccountInfo',
  components: { AccountInfoModal, AccountModal, InfoModal },
  data() {
    return {
      loading: false,
      uploading: {
        firstImg: false
      },
      urls: {
        firstImg: null
      }
    }
  },
  computed: {
    account() {
      return this.$store.state.user.info
    }
  },
  methods: {
    // 更新头像
    updateHead() {
      this.$api.user
        .updateHead({
          id: this.$store.state.user.userId,
          headPicUrl: this.urls.firstImg
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.$store.dispatch('GetInfo')
          }
        })
    },
    accountClick() {
      this.$refs.accountModal.showModal()
    },
    accountInfoClick() {
      this.$refs.accountInfoModal.showInfoModal()
    },
    handleUpload(e, type) {
      this.uploading[type] = true
      this.$api.work.uploadPicture(e.file, 0)
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.urls[type] = res.data
            this.uploading[type] = false
            this.updateHead()
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
.account {
  width: 100%;
  padding-left: 12px;
  overflow-x: auto;

  .pic-upload {
    img {
      width: 88px;
      height: 88px;
    }
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
}
</style>

<template>
  <div>
    <a-modal
      title="手机号修改"
      :visible="visible"
      :confirm-loading="confirmLoading"
      width="420px"
      cancel-text="取消"
      ok-text="确定"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p class="text-12 mt-6">原手机号 {{ account.mobile }} </p>
      <div class="flex justify-between mb-16">
        <div>输新手机号：<a-input v-model="newMobile" placeholder="输入新手机号" style="width: 188px;"></a-input></div>
        <span v-if="showTimer"> {{ count }}s </span>
        <button v-else @click="getCode(newMobile)">发送验证码</button>
      </div>
      <div>手机验证码：<a-input v-model="identifyCode" :disabled="newMobile===''" placeholder="验证码" style="width: 188px;"></a-input></div>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'AccountMobileModal',
  data() {
    return {
      newMobile: '',
      identifyCode: '',
      showTimer: false,
      timer: null,
      count: 0,
      visible: false,
      confirmLoading: false,

      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false
      }
    }
  },
  computed: {
    account() {
      return this.$store.state.user.info
    }
  },
  methods: {
    getCode(mobile) {
      if (mobile === '') {
        this.$message.success('请输入要更换的手机号！')
        return
      }
      this.getMobileIndentifyCode(mobile).then(res => {
        if (res) {
          this.$message.success('验证码发送成功，请注意查收！')
          this.showTimeCountDown()
        }
      })
    },
    showTimeCountDown() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.showTimer = true
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.showTimer = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    showMobileModal() {
      this.visible = true
    },
    handleOk(e) {
      this.confirmLoading = true
      this.$api.user
        .updateMobile({
          id: this.$store.state.user.userId,
          mobile: this.newMobile,
          identifyCode: this.identifyCode
        })
        .then(res => {
          if (res.status === 'SUCCESS') {
            this.$message.success('修改成功，请重新登录！')
            this.confirmLoading = false
            this.$store.dispatch('GetInfo')
            if (this.timer) {
              clearInterval(this.timer)
              this.timer = null
              this.showTimer = false
            }
            this.$store.commit('Logout')
            this.$router.push({ name: 'login' })
          }
          if (res.status === 'FAIL') {
            this.$message.error('验证码错误！')
          }
        })
    },
    // 获取验证码
    getMobileIndentifyCode(mobile) {
      return new Promise((resolve, reject) => {
        this.$api.user
          .getMobileIndentifyCode(mobile)
          .then(res => {
            if (res.status === 'SUCCESS') {
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    handleClear() {
      this.newMobile = ''
    },
    handleCancel(e) {
      this.visible = false
      this.handleClear()
    }
  }
}
</script>
<style scoped lang="less">
</style>

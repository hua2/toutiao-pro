<template>
  <div class="main">
    <a-form
      id="formLogin"
      ref="formLogin"
      class="user-layout-login"
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
          size="large"
          type="text"
          placeholder="手机号"
        >
          <a-icon
            slot="prefix"
            type="mobile"
            :style="{ color: 'rgba(0,0,0,.25)' }"
          />
        </a-input>
      </a-form-item>

      <a-row :gutter="16">
        <a-col
          class="gutter-row"
          :span="16"
        >
          <a-form-item>
            <a-input
              v-decorator="['identifyCode', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
              size="large"
              type="text"
              placeholder="验证码"
            >
              <a-icon
                slot="prefix"
                type="mail"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col
          class="gutter-row"
          :span="8"
        >
          <a-button
            class="getCaptcha"
            tabindex="-1"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
            v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"
          ></a-button>
        </a-col>
      </a-row>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">自动登录</a-checkbox>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  data() {
    return {
      loginBtn: false,
      isLoginError: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false
      },
      source: 'pckey'
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this
      state.loginBtn = true

      const validateFieldsKey = ['mobile', 'identifyCode']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          Login({
            ...loginParams,
            source: this.source
          })
            .then((res) => this.loginSuccess(res))
            .catch((err) => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    getCaptcha(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      validateFields(['mobile'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)
          const hide = this.$message.loading('验证码发送中..', 0)
          this.$api.user.getMobileCode(values.mobile)
            .then((res) => {
              setTimeout(hide, 2500)
            })
            .catch((err) => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
              this.requestFailed(err)
            })
        }
      })
    },
    loginSuccess(res) {
      this.$router.push('/').catch((error) => {
        console.info(error.message)
      })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed(err) {
      console.log(err)
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description:
          ((err.response || {}).data || {}).message ||
          '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>

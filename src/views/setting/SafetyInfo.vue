<template>
  <div>
    <div class="user flex pt-16">
      <div class="account-title">安全中心</div>
      <div class="account-container">
        <div class="account-item">
          <div class="account-item-wrapper">
            <div class="label">安全评分</div>
            <div class="content">
              <div class="account-info">
                <!--                <a-progress :percent="30" style="width: 40%" />-->
                <div class="mt-24">
                  <div class="account-info-title">
                    你的帐号存在安全风险，建议优化以下 2 项
                  </div>
                  <div class="account-info-content">
                    <div class="account-info-item">
                      <div class="label">
                        <img src="../../assets/img/success-icon.png" alt="">
                        绑定手机
                      </div>
                      <div class="content">
                        当前已绑定{{ account.mobile }}<a href="#" @click="accountMobileClick">更换手机</a>
                      </div>
                    </div>
                    <!--                    <div class="account-info-item">-->
                    <!--                      <div class="label">-->
                    <!--                        <img-->
                    <!--                          src="../../assets/img/warn-icon.png"-->
                    <!--                          alt=""-->
                    <!--                        />登录密码-->
                    <!--                      </div>-->
                    <!--                      <div class="content">-->
                    <!--                        密码半年内未修改过<a href="#">修改</a>-->
                    <!--                      </div>-->
                    <!--                    </div>-->
                    <!--                    <div class="account-info-item">-->
                    <!--                      <div class="label">-->
                    <!--                        <img-->
                    <!--                          src="../../assets/img/warn-icon.png"-->
                    <!--                          alt=""-->
                    <!--                        />可信校验-->
                    <!--                      </div>-->
                    <!--                      <div class="content">-->
                    <!--                        开启后，非可信设备登录需验证手机号<a href="#">开启</a>-->
                    <!--                      </div>-->
                    <!--                    </div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--        <InfoModal-->
        <!--          title="帐号操作"-->
        <!--          content="登录、敏感操作记录"-->
        <!--          edit="查看操作记录"-->
        <!--        />-->
      </div>
    </div>
    <!--    <div class="user flex pt-16">-->
    <!--      <div class="account-title">帐号认证</div>-->
    <!--      <div class="account-container">-->
    <!--        <InfoModal-->
    <!--          title="创作能力证明"-->
    <!--          content="提交你的其它自媒体平台帐号信息，提高站内声明原创成功率；帮助平台快速发现你，为你提供更好的资源和服务"-->
    <!--          edit="提交证明"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->
    <AccountMobileModal ref="accountMobileModal" />
  </div>
</template>

<script>
import AccountMobileModal from '@/views/setting/modules/AccountMobileModal'
export default {
  name: 'SafetyInfo',
  components: { AccountMobileModal },
  data() {
    return {}
  },
  computed: {
    account() {
      return this.$store.state.user.info
    }
  },
  methods: {
    accountMobileClick() {
      this.$refs.accountMobileModal.showMobileModal()
    }
  }
}
</script>

<style scoped lang="less">
.user {
  width: 100%;
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
          display: flex;
          align-items: center;
        }
        .content {
          flex: 1;
          color: #666;
          display: -webkit-box;
          -webkit-box-flex: 1;
          display: flex;
          justify-content: space-between;
          .account-info {
            flex: 1;
            .account-info-title {
              font-size: 16px;
              line-height: 20px;
              color: #222;
            }
            .account-info-item {
              height: 60px;
              display: flex;
              align-items: center;
              border-bottom: 1px solid #e8e8e8;
              .label {
                width: 150px !important;
                img {
                  width: 24px;
                  height: 24px;
                  margin-right: 12px;
                }
              }
            }
          }

          img {
            width: 60px;
            height: 60px;
            border: 1px solid #e8e8e8;
            background-color: #e8e8e8;
          }
          a {
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

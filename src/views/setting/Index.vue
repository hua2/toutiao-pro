<template>
  <div class="setting">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="账号详情">
        <AccountInfo />
        <OperatorInfo />
        <SafetyInfo />
      </a-tab-pane>
      <a-tab-pane key="2" tab="功能设置" force-render>
        功能设置
      </a-tab-pane>
      <a-tab-pane key="3" tab="黑名单">
        黑名单
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import AccountInfo from '@/views/setting/AccountInfo'
import OperatorInfo from '@/views/setting/OperatorInfo'
import SafetyInfo from '@/views/setting/SafetyInfo'
export default {
  name: 'Index',
  components: { SafetyInfo, OperatorInfo, AccountInfo },
  data() {
    return {}
  },
  methods: {
    callback(key) {
      console.log(key)
    }
  }
}
</script>

<style scoped lang="less">
.setting {
}
</style>

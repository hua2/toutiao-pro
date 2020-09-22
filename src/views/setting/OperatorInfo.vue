<template>
  <div class="user flex pt-16">
    <div class="account-title">运营人信息</div>
    <div class="account-container">
      <InfoModal
        title="机构/公司名称"
        content="北京角马能源科技有限公司"
        edit="更改主体"
      />
      <InfoModal
        title="运营人"
        content="*灵 (4312*****1022)"
        edit="更改运营人"
      />
      <InfoModal title="网站" content="无" edit="更改网站" />
      <InfoModal
        title="联系邮箱"
        content="
929036066@qq.com
"
        edit="修改邮箱"
      />
      <InfoModal title="所在地" content="中国大陆/北京市" />
    </div>
  </div>
</template>

<script>
import InfoModal from '@/views/setting/components/InfoModal'
export default {
  name: 'OperatorInfo',
  components: { InfoModal },
  data() {
    return {}
  },
  methods: {}
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
  }
}
</style>

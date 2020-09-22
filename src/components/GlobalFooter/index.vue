<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <span><a href="#" target="_blank">关于角马头条</a><a href="#" target="_blank">用户协议</a>
        <a href="#" target="_blank">隐私协议</a> <a href="#" target="_blank">社区规范</a>
        <a href="#" target="_blank">侵权投诉</a><a href="#" target="_blank">联系我们</a></span>
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/vueComponent" target="_blank">角马能源</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>

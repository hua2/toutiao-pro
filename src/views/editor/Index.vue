<template>

  <page-header-wrapper>
    <template v-slot:content>
      <WangEditor v-model="content" />
    </template>
    <template v-slot:extraContent>
      <a-button @click="openDialog">Dialog Test</a-button>
    </template>
    <div>
      <QuillEditor v-model="content" />

    </div>
  </page-header-wrapper>
</template>
<script>
import WangEditor from '@/components/Editor/WangEditor'
import QuillEditor from '@/components/Editor/QuillEditor'
export default {
  name: 'Editor',
  components: { WangEditor, QuillEditor },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    openDialog() {
      this.$dialog('你好')
      this.$success('你好')
    }
  }
}
</script>>

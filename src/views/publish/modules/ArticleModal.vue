<template>
  <div>
    <a-modal
      title="声明原创须知"
      :visible="visible"
      :confirm-loading="confirmLoading"
      width="720px"
      cancel-text="取消"
      ok-text="确定"
      class="article-modal"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>满足以下要求可声明原创</p>
      <p> 1. 正文字数 > 300（动漫/摄影领域加V认证的作者除外）</p>
      <p>2. 原创内容多于引用内容</p>
      <p>声明原创后，抄袭、洗稿等滥用原创行为将有处罚</p>
      <div class="a-m-content">
        <p>同意声明「原创」，即代表您确认并承诺该作品是由您本人（或持有该账号的组织）自行创作完成，或者已经取得著作权人本人的授权。</p>
        <h4>如下情形可声明原创：</h4>
        <p>1. 由创作者自行创作的作品，且对作品拥有合法版权的内容；</p>
        <p>2. 获得著作权人本人授权，对原作品进行改编、翻译、注释、评议的内容；</p>
        <p>3. 获得著作权人本人独家授权的作品，享有信息网络传播权、有且仅有该帐号在角马能源发布。</p>
        <h4>包括但不限于以下情形请勿声明原创：</h4>
        <p>1. 抄袭、剽窃、搬运他人作品的。</p>
        <p>2. 歪曲、篡改他人作品的；</p>
        <p>3. 内容为 罗列常识、拼接要点等整合汇编的；</p>
        <p>4. 未获原作者授权发表或转载原作品的；</p>
        <p>5. 未获原作者授权，改编、翻译、注释、评议原作品的；</p>
        <p>6. 以售卖商品为目的或为个人/机构吸粉导流的；</p>
        <p>7. 不受《中华人民共和国著作权法》保护的内容，如法律/法规、国家机关的决议/决定/命令、其他具有立法/行政/司法性质的文件、官方正式译文、时事新闻、历法/通用数表/通用表格和公式等公共信息；</p>
        <p>8. 违反法律法规、政策及公序良俗的内容，诸如含有散布、传播暴力、淫秽、色情、低俗、赌博、暴力、不实等信息内容的，以及其他一切违反《社区公约》及本平台不定期发布和/或更新的各项规范、规则、声明、公告等内容的。</p>
        <h4>角马能源鼓励用户发布原创作品，声明「原创」的作品将拥有如下权益：</h4>
        <p>1. 具有「原创」标识</p>
        <p>2. 获得更多推荐与分成</p>
        <p>3. 支持站内维权</p>
        <h4>若您存在滥用原创的行为，角马能源将按照《角马能源原创公约》作出如下处罚：</h4>
        <p>1. 首次违规：扣除20分并给予警告；</p>
        <p>2. 二次违规：扣除20分并给予警告；</p>
        <p>3. 三次违规：扣除20分，并永久关闭「图文原创」功能使用权限。</p>
        <p>为作品声明原创，仅是您对作品内容原创性的单方承诺，并不代表角马能源认可作品的原创性。</p>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  name: 'ArticleModal',
  data() {
    return {
      visible: false,
      confirmLoading: false
    }
  },
  methods: {
    showDetailModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log('Clicked e', e)
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button', e)
      this.visible = false
    }
  }
}
</script>
<style scoped lang="less">
  .article-modal {
    /deep/ .ant-modal-body {
      p {
        color: #222;
        margin-bottom: 4px;

        &:nth-child(4) {
          margin-bottom: 16px;
        }
      }
      .a-m-content {
        height: 320px;
        overflow: scroll;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        background-color: #fff;
        padding: 16px 24px 0;
        font-size: 13px;
        line-height: 20px;
        h4{
          font-weight: 600;
          margin-bottom: 8px;
        }
        p{
          color: #666;
          margin-bottom: 8px;
        }
      }
    }
  }
</style>

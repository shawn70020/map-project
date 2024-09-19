<template>
  <div class="container">
    <h1>資料刪除指示</h1>
    <p>感謝您使用我們的服務！我們非常重視您的隱私權。根據相關法律，您有權要求刪除我們所持有的您的個人資料。</p>

    <h2>如何請求刪除您的資料</h2>
    <p>如果您希望刪除我們所持有的個人資料，請通過以下方式聯絡我們：</p>

    <div class="contact-info">
      <p><strong>電子郵件：</strong> <a :href="'mailto:' + supportEmail">{{ supportEmail }}</a></p>
      <p><strong>聯絡電話：</strong> {{ supportPhone }}</p>
    </div>

    <h2>請求處理時間</h2>
    <p>我們會在收到請求後的 30 個工作日內處理您的請求，並通過電子郵件通知您結果。</p>

    <h2>其他資訊</h2>
    <p>如需了解我們如何處理您的資料，請參閱我們的隱私政策。</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supportEmail: 'shawn70020@gmail.com', // 替換為你的實際電子郵件
      supportPhone: '0988673396' // 替換為你的實際電話
    };
  }
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}

h1 {
  color: #4CAF50;
}

p {
  margin-bottom: 1em;
}

.contact-info {
  margin-top: 20px;
}
</style>

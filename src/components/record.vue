<template>
  <!-- 彈出式窗口 -->
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup">
      <h2>{{ title }}</h2>
      <ul>
        <li v-for="(record, index) in records" :key="index">
          {{ record }}
        </li>
      </ul>
      <button @click="closePopup">關閉</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      required: true, // 記錄數據列表
    },
    title: {
      type: String,
      default: "記錄列表", // 彈窗標題
    },
  },
  methods: {
    closePopup() {
      this.$emit("close"); // 通知父組件關閉彈窗
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

button {
  margin-top: 20px;
}
</style>

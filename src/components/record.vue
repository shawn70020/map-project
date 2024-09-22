<template>
  <!-- 彈出式窗口 -->
  <div class="popup-overlay" @click.self="closePopup">
    <div class="popup">
      <h2>{{ title }}</h2>
      <ul>
        <li
          v-for="(record, index) in records"
          :key="index"
          @click="handleItemClick(record)"
        >
          {{ record }}
        </li>
      </ul>
      <button @click="closePopup" class="close-btn">關閉</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from "vue";

export default defineComponent({
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
  setup(props, { emit }) {
    const { records, title } = toRefs(props);

    const closePopup = () => {
      emit("close");
    };

    const handleItemClick = (record) => {
      emit("search", record); // 發送點擊的記錄到父組件
    };

    return {
      records,
      title,
      closePopup,
      handleItemClick,
    };
  },
});
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
  z-index: 9999;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

h2 {
  color: #000;
}

ul {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  list-style-type: none;
  margin: 0;
}

li {
  margin-bottom: 10px;
  color: #000;
  cursor: pointer;
}

button {
  margin-top: 20px;
}
</style>

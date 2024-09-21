<template>
  <div class="container">
    <h1>新北市都市更新地點查詢</h1>
    <button @click="toLocation">開始</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const toLocation = () => {
      router.push("/location");
    };
    return {
      toLocation,
    };
  },
};
</script>
<style scoped>
.container {
  text-align: center;
  padding-top:2rem;
}
</style>

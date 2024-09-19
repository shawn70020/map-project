<template>
  <div>
    <!-- 呈現地圖 -->
    <MapDisplay
      :geojsonData="geojsonData"
      :locationData="nearbyList"
      :selectedLocationId="selectedLocationId"
    />
    <!-- 搜尋地址 -->
    <input v-model="searchLocation" placeholder="請輸入地址" />
    <button @click="handleSearch">搜尋</button>

    <!-- 顯示搜尋到的地點資料 -->
    <h2>站點列表</h2>
    <ul>
      <li
        v-for="location in nearbyList"
        :key="location.id"
        @click="selectLocation(location.id)"
        style="cursor: pointer; margin: 5px 0"
      >
        {{ location.stopName }} - {{ location.distance }} 公里
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { geocodeAddress } from "../utils.js";
import MapDisplay from "../components/mapDisplay.vue"; // 引入地圖組件

export default {
  components: { MapDisplay },
  setup() {
    const geojsonData = ref(null); // 用來存放整理後的 GeoJSON 數據
    const searchLocation = ref("");
    const nearbyList = ref([]);
    const selectedLocationId = ref(null);
    onMounted(async () => {
      try {
        await fetchLocationData();
      } catch (error) {
        console.error("API 請求失敗", error);
      }
    });

    // 呼叫所有都更地點資料
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(
          "https://enterprise.oakmega.ai/api/v1/server/xinbei/geolocation-json?directory=tucheng.json"
        ); // 替換為實際的 API URL
        const data = response.data;

        // 假設你需要對數據進行一些處理，這裡可以添加整理邏輯
        geojsonData.value = {
          type: "FeatureCollection",
          features: data.result.features.map((feature) => ({
            type: "Feature",
            properties: feature.properties,
            geometry: feature.geometry,
          })),
        };
      } catch (error) {
        console.error("獲取 GeoJSON 數據出錯：", error);
      }
    };

    // 處理地址轉換與 API 請求
    const handleSearch = async () => {
      try {
        // 使用地址進行經緯度轉換
        const transforlocation = await geocodeAddress(searchLocation.value);
        console.log(`轉換成功，經度: ${location.lng}, 緯度: ${location.lat}`);

        // 呼叫 getNearLocationData，傳入轉換後的經緯度
        await getNearLocationData(transforlocation.lat, transforlocation.lng);
      } catch (error) {
        console.error("地理編碼失敗:", error);
      }
    };

    // 搜尋附近所有都更地點
    const getNearLocationData = async (lat, lng) => {
      try {
        const response = await axios.post(
          "https://enterprise.oakmega.ai/api/v1/server/xinbei/calc-distance",
          {
            lat,
            lng,
          }
        );
        console.log(response);
        console.log(response.result);
        // 整理站點數據
        nearbyList.value = response.data.result.map((item) => ({
          id: item.id,
          stopName: item.stop_name,
          name: item.name,
          longitude: item.longitude,
          latitude: item.latitude,
          distance: item.distance,
          radius: item.radius,
          isTod: item.is_tod,
        }));
      } catch (error) {
        console.error("API 呼叫失敗:", error);
      }
    };

    const selectLocation = (id) => {
      selectedLocationId.value = id;
    };

    return {
      searchLocation,
      fetchLocationData,
      handleSearch,
      nearbyList,
      geojsonData,
      selectLocation,
      selectedLocationId,
    };
  },
};
</script>

<template>
  <div class="location-bg">
    <!-- 呈現地圖 -->
    <MapDisplay
      :geojsonData="geojsonData"
      :locationData="nearbyList"
      :selectedLocationId="selectedLocationId"
      :userPosition="userLocation"
    />

    <div class="box-list">
      <!-- 搜尋地址 -->
      <div class="box-search">
        <input
          v-model="searchLocation"
          placeholder="請輸入新北地址"
          class="search-input"
        />
        <img
          src="../../public/img/search.svg"
          class="search-icon"
          @click="handleSearch"
          alt="search-icon"
        />
      </div>
      <!-- 顯示搜尋到的地點資料 -->
      <div>
        <h2>站點列表</h2>
        <ul>
          <li
            v-for="(location, index) in nearbyList"
            :key="location.id"
            @click="selectLocation(location.id)"
            class="stop-item"
            :class="{ selected: selectedIndex === index }"
          >
            <h5>{{ location.stopName }}</h5>
            <h5 class="blue-text">{{ location.distance }} 公里</h5>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { geocodeAddress } from "../utils.js";
import { useAppStore } from "../stores/index.js";
import MapDisplay from "../components/mapDisplay.vue"; // 引入地圖組件

export default {
  components: { MapDisplay },
  setup() {
    const appStore = useAppStore();
    const geojsonData = ref(null); // 用來存放整理後的 GeoJSON 數據
    const searchLocation = ref("");
    const nearbyList = ref([]);
    const selectedLocationId = ref(null);
    const userLocation = ref({});
    onMounted(async () => {
      try {
        await fetchLocationData();
      } catch (error) {
        console.error(error);
      }
    });

    // 呼叫所有都更地點資料
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(
          "https://enterprise.oakmega.ai/api/v1/server/xinbei/geolocation-json?directory=tucheng.json"
        ); // 替換為實際的 API URL
        const data = response.data;

        geojsonData.value = {
          type: "FeatureCollection",
          features: data.result.features.map((feature) => ({
            type: "Feature",
            properties: feature.properties,
            geometry: feature.geometry,
          })),
        };
      } catch (error) {
        console.error("獲取都更地點數據出錯：", error);
      }
    };

    // 處理地址轉換與 API 請求
    const handleSearch = async () => {
      // 先確認地址是否符合格式
      if (validateInput(searchLocation.value)) {
        try {
          // 使用地址進行經緯度轉換
          const transforlocation = await geocodeAddress(searchLocation.value);

          console.log(
            `轉換成功，經度: ${transforlocation.lng}, 緯度: ${transforlocation.lat}`
          );

          // 呼叫 getNearLocationData，傳入轉換後的經緯度
          userLocation.value = {
            lat: transforlocation.lat,
            lng: transforlocation.lng,
          };
          await getNearLocationData(transforlocation.lat, transforlocation.lng);
        } catch (error) {
          console.error("地址轉換失敗:", error);
        }
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
        console.error("附近都更地點獲取失敗:", error);
      }
    };

    const selectLocation = (id) => {
      selectedLocationId.value = id;
    };

    const validateInput = () => {
      // 正則表達式，只允許中文和數字
      const regex = /^[\u4e00-\u9fa5\d]+$/;

      // 移除輸入中的所有空格
      const trimmedValue = searchLocation.value.replace(/\s+/g, "");

      // 檢查修正過的輸入是否符合正則
      if (regex.test(trimmedValue)) {
        searchLocation.value = trimmedValue;
        return true;
      } else {
        // 如果不符合條件，彈出提示但不修改輸入值
        alert("只能輸入中文地址！");
        searchLocation.value = "";
        return false;
      }
    };

    return {
      searchLocation,
      fetchLocationData,
      handleSearch,
      nearbyList,
      userLocation,
      geojsonData,
      selectLocation,
      selectedLocationId,
      validateInput,
    };
  },
};
</script>

<style>
.box-center {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>

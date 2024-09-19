<template>
  <div id="map"></div>
  <!-- 地圖容器 -->
</template>

<script>
import { onMounted, ref, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  props: {
    geojsonData: {
      type: Object, // 用於接收多邊形的數據
      required: false,
    },
    locationData: {
      type: Array, // 用於接收站點的數據
      required: false,
    },
    selectedLocationId: {
      type: Number, // 用來接收使用者選中的標記的 id
      required: false,
    },
  },
  setup(props) {
    const map = ref(null);
    const markers = ref({}); // 用於存儲所有標記

    // 初始化地圖
    onMounted(() => {
      map.value = L.map("map").setView([25.033, 121.5654], 13); // 默認地圖視圖

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map.value);

      // 監聽 props.geojsonData，當有數據傳入時，將其繪製多邊形到地圖上
      watch(
        () => props.geojsonData,
        (newGeojsonData) => {
          if (newGeojsonData) {
            // 清空地圖上的現有多邊形圖層
            if (map.value.geoJsonLayer) {
              map.value.removeLayer(map.value.geoJsonLayer);
            }

            // 將新的 GeoJSON 數據添加到地圖
            map.value.geoJsonLayer = L.geoJSON(newGeojsonData, {
              onEachFeature: function (feature, layer) {
                if (feature.properties) {
                  const popupContent = `
                    <b>名稱:</b> ${feature.properties.TxtMemo}<br>
                    <b>分區:</b> ${feature.properties["分區"]}<br>
                    <b>面積:</b> ${feature.properties.SHAPE_Area} 平方米
                  `;
                  layer.bindPopup(popupContent);
                }
              },
              style: function (feature) {
                return { color: "#3388ff", weight: 2 };
              },
            }).addTo(map.value);

            // 使用 getBounds 獲取所有繪製圖層的邊界範圍
            const bounds = map.value.geoJsonLayer.getBounds();
            map.value.fitBounds(bounds); // 自動聚焦到多邊形區域
          }
        },
        { immediate: true }
      );

      // 監聽 props.locationData，當有數據傳入時，將其繪製站點標記到地圖上
      watch(
        () => props.locationData,
        (newLocationData) => {
          if (newLocationData) {
            // 清空地圖上的現有站點標記圖層
            if (map.value.markerLayer) {
              map.value.markerLayer.clearLayers();
            } else {
              map.value.markerLayer = L.layerGroup().addTo(map.value);
            }

            // 添加站點標記並存儲在 markers 中
            newLocationData.forEach((location) => {
              const { latitude, longitude, name, stopName, distance, id } = location;

              // 添加標記
              const marker = L.marker([latitude, longitude]).addTo(map.value.markerLayer);

              // 添加 popup，顯示站點名稱和距離
              marker.bindPopup(`
                <b>站點名稱:</b> ${stopName}<br>
                <b>站點代號:</b> ${name}<br>
                <b>距離:</b> ${distance} 公里
              `);

              // 將標記存儲到 markers 中，使用 id 作為鍵
              markers.value[id] = marker;
            });
          }
        },
        { immediate: true }
      );

      // 監聽選中的標記，移動地圖到對應位置
      watch(
        () => props.selectedLocationId,
        (newSelectedId) => {
          if (newSelectedId && markers.value[newSelectedId]) {
            const selectedMarker = markers.value[newSelectedId];
            // 移動地圖到標記的位置，並設置適當的縮放級別
            map.value.setView(selectedMarker.getLatLng(), 15);
            selectedMarker.openPopup(); // 自動打開該標記的彈出框
          }
        }
      );
    });

    return {
      map,
    };
  },
};
</script>

<style>
#map {
  height: 500px;
  width: 100vw;
}
</style>

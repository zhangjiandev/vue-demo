<template>
  <div>
    <h2>北京市边界展示</h2>
    <div id="map" style="height: 600px;"></div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet.heat'; // 引入 leaflet.heat 插件
import geojsonData from '/public/110000.json';

export default {
  name: "BeijingMap",
  setup() {
    // 初始化地图
    const initMap = async () => {
      //const map = L.map("map").setView([39.9042, 116.4074], 10); // 设置北京为中心
      const map = L.map('map').setView([35.8617, 104.1954], 5); // 设置中国的经纬度和缩放级别
      // 添加 OpenStreetMap 图层
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // 设置地图背景透明度
      }).addTo(map);

      // // 设置地图的最大显示范围，限制地图只显示北京市区域
      // const bounds = [
      //   [39.5, 116],    // 西南角（大致为北京市的左下角）
      //   [40.3, 117.1]  // 东北角（大致为北京市的右上角）
      // ];
      // map.setMaxBounds(bounds);

      //北京市的 GeoJSON 数据
      const beijingGeoJSON = ref(geojsonData)
          //await fetch('/110000.json');  // 公共目录的文件路径
      console.log('beijingGeoJSON:', beijingGeoJSON)

      //添加北京市边界
      L.geoJSON(beijingGeoJSON.value, {
        style: {
          color: "blue", // 边界线颜色
          weight: 2, // 边界线宽度
          fillColor: "#00ccff", // 填充颜色
          fillOpacity: 0.6, // 填充透明度
        },
      }).addTo(map);

      // 添加默认标记（北京）
      const marker = L.marker([39.9042, 116.4074]).addTo(map)
          .bindPopup("北京，这里可以自定义描述").openPopup();

      // L.circle([39.9042, 116.4074], {
      //   color: 'red',  // 圆圈的颜色
      //   fillColor: '#f03',  // 填充颜色
      //   fillOpacity: 0.5,  // 填充透明度
      //   radius: 5000  // 半径为 5 公里
      // }).addTo(map);

      var coordinates = [
        [39.91, 116.40], // 北京
        [39.92, 116.42], // 位置 2
        [39.93, 116.43], // 位置 3
        [39.94, 116.41], // 位置 4
        [39.91, 116.40]  // 闭合环形，回到起点
      ];

      // 创建并添加不规则区域（多边形）
      var polygon = L.polygon(coordinates, {
        color: 'red', // 设置边界颜色
        fillColor: 'orange', // 设置填充颜色
        fillOpacity: 0.5 // 设置填充透明度
      }).addTo(map);

      // 模拟气象数据（温度、湿度等）位置
      var weatherData = [
        {lat: 39.9042, lon: 116.4074, temperature: 22, humidity: 65}, // 北京
        {lat: 34.0522, lon: -118.2437, temperature: 30, humidity: 40}, // 洛杉矶
        {lat: 51.5074, lon: -0.1278, temperature: 18, humidity: 80}, // 伦敦
      ];

      // 在地图上添加气象标记并绑定弹出窗口
      weatherData.forEach(function (data) {
        var marker = L.marker([data.lat, data.lon]).addTo(map);
        marker.bindPopup(`
        <b>温度:</b> ${data.temperature}°C <br>
        <b>湿度:</b> ${data.humidity}%`);
      });

      // 模拟气象数据：温度（每个数据点代表某个区域的温度强度）
      // const heatData = [
      //   [39.9042, 116.4074, 22], // 北京
      //   [34.0522, -118.2437, 30], // 洛杉矶
      //   [51.5074, -0.1278, 18], // 伦敦
      //   [40.7128, -74.0060, 25]  // 纽约
      // ];

      // 创建热力图层
      //L.heatLayer(heatData, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);


      // 添加 OpenWeatherMap 云层图层（示例）
      // L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=3380e655194d65c0a8295bd9aa6c6b88', {
      //   opacity: 0.5,
      //   attribution: '天气数据 &copy; OpenWeatherMap'
      // }).addTo(map);

      // 添加模拟的温度图层（另一种瓦片图层）
      // L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/1h/WNDUV/{z}/{x}/{y}?date=16188989909&appid=3380e655194d65c0a8295bd9aa6c6b88', {
      //   opacity: 0.7,
      //   attribution: '天气数据 &copy; OpenWeatherMap'
      // }).addTo(map);
      // 模拟地震点数据（经纬度，震级，描述）
      const earthquakeData = [
        {lat: 39.9042, lng: 116.4074, magnitude: 5.6, description: "北京附近发生地震，震级5.6级"},
        {lat: 31.2304, lng: 121.4737, magnitude: 4.8, description: "上海附近发生地震，震级4.8级"},
        {lat: 22.3193, lng: 114.1694, magnitude: 6.2, description: "香港附近发生地震，震级6.2级"},
      ];

      // 在地图上添加地震点标记
      earthquakeData.forEach(data => {
        const marker = L.circleMarker([data.lat, data.lng], {
          radius: data.magnitude * 2, // 根据震级调整圆的大小
          color: 'red',
          fillColor: 'orange',
          fillOpacity: 0.8
        }).addTo(map);
        marker.bindPopup(`<b>地震信息</b><br>${data.description}`);
      });

      // 模拟热力图数据（用于模拟地震热力范围）
      const heatData = earthquakeData.map(data => [data.lat, data.lng, data.magnitude / 10]); // 强度比例调整

      // 添加热力图层
      const heatLayer = L.heatLayer(heatData, {
        radius: 25, // 热力点半径
        blur: 15,   // 模糊程度
        maxZoom: 10 // 最大缩放层级
      }).addTo(map);

      // 模拟台风路径数据
      const typhoonPath = [
        [18.4663, 114.3912],
        [20.3963, 115.7842],
        [22.3363, 116.5423],
        [24.4863, 117.2912]
      ];

      // 在地图上绘制台风路径
      const typhoonPolyline = L.polyline(typhoonPath, {
        color: 'blue',
        weight: 4,
        opacity: 0.7
      }).addTo(map);
      typhoonPolyline.bindPopup("模拟台风路径");
    };

    // 挂载后执行初始化地图逻辑
    onMounted(() => {
      initMap();
    });
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 600px;
}
</style>

<template>
  <div>
    <h2>北京市边界展示</h2>
    <div id="map" style="height: 600px;"></div>
  </div>
</template>

<script>
import {onMounted} from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet.heat'; // 引入 leaflet.heat 插件

export default {
  name: "BeijingMap",
  setup() {
    // 初始化地图
    const initMap = () => {
      //const map = L.map("map").setView([39.9042, 116.4074], 10); // 设置北京为中心
      const map = L.map('map').setView([35.8617, 104.1954], 5); // 设置中国的经纬度和缩放级别
      // 添加 OpenStreetMap 图层
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // 设置地图背景透明度
      }).addTo(map);

      // 北京市的 GeoJSON 数据
      const beijingGeoJSON = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                [
                  116.28657707765024,
                  40.01432085768994
                ],
                [
                  116.23249041658693,
                  39.99959469322508
                ],
                [
                  116.20803599343162,
                  39.96679776621906
                ],
                [
                  116.2044086544808,
                  39.93578719470378
                ],
                [
                  116.1978772413105,
                  39.90518095579719
                ],
                [
                  116.20678428276477,
                  39.87228386976287
                ],
                [
                  116.22464027545482,
                  39.839820006439794
                ],
                [
                  116.24489057969907,
                  39.8196933653189
                ],
                [
                  116.25859018182166,
                  39.80779778507414
                ],
                [
                  116.2633513511675,
                  39.783996712098485
                ],
                [
                  116.27466335849698,
                  39.774376932765506
                ],
                [
                  116.30801911589168,
                  39.777575268365126
                ],
                [
                  116.35865688921047,
                  39.7748254696219
                ],
                [
                  116.37831845766357,
                  39.756957083888125
                ],
                [
                  116.42240767404144,
                  39.77298626359632
                ],
                [
                  116.43492314935133,
                  39.791296960208854
                ],
                [
                  116.45041314333406,
                  39.79084047100824
                ],
                [
                  116.47425046277715,
                  39.80777515196459
                ],
                [
                  116.5129816701118,
                  39.823793141721524
                ],
                [
                  116.54515941615131,
                  39.85215958844495
                ],
                [
                  116.54158394436655,
                  39.86222248591477
                ],
                [
                  116.5421743971512,
                  39.89651589357874
                ],
                [
                  116.53681630101755,
                  39.93901717184863
                ],
                [
                  116.51894020159807,
                  39.958202061846265
                ],
                [
                  116.48437089705942,
                  40.007499841140714
                ],
                [
                  116.45219597695746,
                  40.014798656552216
                ],
                [
                  116.41227310299877,
                  40.01980464374074
                ],
                [
                  116.35210388056151,
                  40.01979956535857
                ],
                [
                  116.3109991731373,
                  40.01934435837967
                ],
                [
                  116.28598151706808,
                  40.01386434171559
                ]
              ],
              "type": "LineString"
            }
          }
        ]
      }


      //添加北京市边界
      L.geoJSON(beijingGeoJSON, {
        style: {
          color: "red", // 边界线颜色
          weight: 2, // 边界线宽度
          fillColor: "#f03", // 填充颜色
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
        { lat: 39.9042, lon: 116.4074, temperature: 22, humidity: 65 }, // 北京
        { lat: 34.0522, lon: -118.2437, temperature: 30, humidity: 40 }, // 洛杉矶
        { lat: 51.5074, lon: -0.1278, temperature: 18, humidity: 80 }, // 伦敦
      ];

      // 在地图上添加气象标记并绑定弹出窗口
      weatherData.forEach(function(data) {
        var marker = L.marker([data.lat, data.lon]).addTo(map);
        marker.bindPopup(`
        <b>温度:</b> ${data.temperature}°C <br>
        <b>湿度:</b> ${data.humidity}%`);
      });

      // 模拟气象数据：温度（每个数据点代表某个区域的温度强度）
      const heatData = [
        [39.9042, 116.4074, 22], // 北京
        [34.0522, -118.2437, 30], // 洛杉矶
        [51.5074, -0.1278, 18], // 伦敦
        [40.7128, -74.0060, 25]  // 纽约
      ];

      // 创建热力图层
      //L.heatLayer(heatData, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);


      // 添加 OpenWeatherMap 云层图层（示例）
      L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=3380e655194d65c0a8295bd9aa6c6b88', {
        opacity: 0.5,
        attribution: '天气数据 &copy; OpenWeatherMap'
      }).addTo(map);

      // 添加模拟的温度图层（另一种瓦片图层）
      // L.tileLayer('https://maps.openweathermap.org/maps/2.0/weather/1h/WNDUV/{z}/{x}/{y}?date=16188989909&appid=3380e655194d65c0a8295bd9aa6c6b88', {
      //   opacity: 0.7,
      //   attribution: '天气数据 &copy; OpenWeatherMap'
      // }).addTo(map);
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

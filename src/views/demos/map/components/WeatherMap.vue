<template>
  <div>
    <h2>四川市边界展示</h2>
    <div id="map" style="height: 600px;"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import L, { Map, Marker } from 'leaflet';
import "leaflet/dist/leaflet.css";
import 'leaflet.heat'; // 引入 leaflet.heat 插件
import geojsonData from '/src/assets/510000.json';
import rain1geojsonData from '/src/assets/rain1.json';
import testgeojson from '/src/assets/test.json'
import * as weatherCustom from "@/views/demos/map/components/WeatherMap.ts";
defineOptions({ name: 'SiChuanMap' })
const zoomLevel = ref(0);  // 用于记录点击的次数，控制放大的级别
// 四川省地图的中心和边界
const SICHUAN_CENTER = [30.5728, 104.0668]; // 四川省中心坐标（成都）
const SICHUAN_BOUNDS = [
  [26.0, 97.0], // 南西角
  [34.0, 110.0], // 北东角
];

// 随机生成模拟热力点数据
const generateHeatData = () => {
  const heatPoints = [];
  for (let i = 0; i < 100; i++) {
    const lat = 30 + Math.random() * 4; // 纬度随机范围
    const lng = 102 + Math.random() * 8; // 经度随机范围
    const intensity = Math.random(); // 热力强度 (0-1)
    heatPoints.push([lat, lng, intensity]);
  }
  return heatPoints;
}

//export default {
//  name: "SiChuanMap",
//  setup() {
    // 初始化地图
const map = ref<Map | null>(null);
//let customLayer: Layer | null = null; // 用于存储自定义图层
//const isLayerAdded = ref(false); // 控制图层显示/隐藏的状态
const initMap = async () => {
  //const map = L.map("map").setView([39.9042, 116.4074], 8); // 设置北京为中心
  //const map = L.map("map").setView([30.5728, 104.0668], 3); // 设置北京为中心
  map.value = L.map("map", {
    center: [30.5728, 104.0668], // 中心点
    zoom: 7, // 当前展示的层级
    maxZoom: 18, // 最大层级
    minZoom: 1, // 最小层级
    attributionControl: false, // 不展示版权信息
  });
  //const map = L.map('map').setView([35.8617, 104.1954], 5); // 设置中国的经纬度和缩放级别
  // 添加 OpenStreetMap 图层
  // const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   attribution:
  //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // 设置地图背景透明度
  // }).addTo(map);
  const tiandituKey = "2ab60d6b6e0982393f77359351b1b866";
  // 添加天地图普通地图图层
  // L.tileLayer('http://t{s}.tianditu.gov.cn/vec_w/wmts?layer=vec&style=default&tilematrixset=w&tilesize=256&version=1.0.0&format=tiles&tk=your-api-key', {
  //   subdomains: ['0', '1', '2', '3'], // 负载均衡
  //   attribution: '&copy; <a href="http://www.tianditu.gov.cn/">天地图</a> contributors',
  // }).addTo(map);
  L.tileLayer(
      `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tiandituKey}`
  ).addTo(map.value);
  L.tileLayer(
      `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tiandituKey}`
  ).addTo(map.value);

  // 获取瓦片图层 DOM 元素，添加 CSS 滤镜
  //tileLayer.getContainer().style.filter = 'grayscale(1)';
  // // 设置地图的最大显示范围，限制地图只显示北京市区域
  // const bounds = [
  //   [39.5, 116],    // 西南角（大致为北京市的左下角）
  //   [40.3, 117.1]  // 东北角（大致为北京市的右上角）
  // ];
  // map.setMaxBounds(bounds);

  //北京市的 GeoJSON 数据
  const beijingGeoJSON = ref(geojsonData)
      //await fetch('/110000.json');  // 公共目录的文件路径
  //console.log('beijingGeoJSON:', beijingGeoJSON)

  const highlightFeature = (e) => {
    let layer = e.target;

    layer.setStyle({
      weight: 3,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
      //fillColor: "#0022ff", // 填充颜色
    });

    layer.bringToFront();
  }
  const resetHighlight = (e) => {
    geojson.resetStyle(e.target);
  }

  const zoomToFeature = (e) => {
    map.fitBounds(e.target.getBounds());
  }
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }
  // const heatData = generateHeatData();
  // // 添加热力图层
  // const heatLayer = L.heatLayer(heatData, {
  //   radius: 25, // 热力点半径
  //   blur: 15, // 模糊程度
  //   maxZoom: 7, // 最大缩放等级
  // }).addTo(map);
  // const heatLayerElement = map.getPane('overlayPane').querySelector('.leaflet-heatmap-layer');
  // if (heatLayerElement) {
  //   heatLayerElement.style.zIndex = '650'; // 将 z-index 设置为较高的值
  // }
  //添加北京市边界
  let geojson = L.geoJSON(beijingGeoJSON.value, {
    style: {
      color: "#BCBAC0", // 边界线颜色
      weight: 1, // 边界线宽度
      fillColor: "#b0afea", // 填充颜色
      fillOpacity: 0.5, // 填充透明度
    },
    //onEachFeature: onEachFeature
  }).addTo(map.value);

  // 限制地图范围为四川省
  map.value.setMaxBounds(SICHUAN_BOUNDS);

  // // 生成热力点数据
  // const heatData = generateHeatData();
  // // 创建自定义 Pane 并设置 z-index
  // map.createPane('heatmapPane');
  // map.getPane('heatmapPane').style.zIndex = 650; // 设置较高的 z-index
  //
  // // 添加热力图层
  // const heatLayer = L.heatLayer(heatData, {
  //   radius: 25, // 热力点半径
  //   blur: 15, // 模糊程度
  //   maxZoom: 7, // 最大缩放等级
  // }).addTo(map);
  // //heatLayer.bringToFront();
  // // 将热力图层绑定到自定义 Pane
  // heatLayer.options.pane = 'heatmapPane';




  // L.circle([39.9042, 116.4074], {
  //   color: 'red',  // 圆圈的颜色
  //   fillColor: '#f03',  // 填充颜色
  //   fillOpacity: 0.5,  // 填充透明度
  //   radius: 5000  // 半径为 5 公里
  // }).addTo(map);

  // var coordinates = [
  //   [39.91, 116.40], // 北京
  //   [39.92, 116.42], // 位置 2
  //   [39.93, 116.43], // 位置 3
  //   [39.94, 116.41], // 位置 4
  //   [39.91, 116.40]  // 闭合环形，回到起点
  // ];

  // // 创建并添加不规则区域（多边形）
  // var polygon = L.polygon(coordinates, {
  //   color: 'red', // 设置边界颜色
  //   fillColor: 'orange', // 设置填充颜色
  //   fillOpacity: 0.5 // 设置填充透明度
  // }).addTo(map);

  // // 模拟气象数据（温度、湿度等）位置
  // var weatherData = [
  //   {lat: 39.9042, lon: 116.4074, temperature: 22, humidity: 65}, // 北京
  //   {lat: 34.0522, lon: -118.2437, temperature: 30, humidity: 40}, // 洛杉矶
  //   {lat: 51.5074, lon: -0.1278, temperature: 18, humidity: 80}, // 伦敦
  // ];
  //
  // // 在地图上添加气象标记并绑定弹出窗口
  // weatherData.forEach(function (data) {
  //   var marker = L.marker([data.lat, data.lon]).addTo(map);
  //   marker.bindPopup(`
  //   <b>温度:</b> ${data.temperature}°C <br>
  //   <b>湿度:</b> ${data.humidity}%`);
  // });

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
  // const earthquakeData = [
  //   {lat: 39.9042, lng: 116.4074, magnitude: 5.6, description: "北京附近发生地震，震级5.6级"},
  //   {lat: 31.2304, lng: 121.4737, magnitude: 4.8, description: "上海附近发生地震，震级4.8级"},
  //   {lat: 22.3193, lng: 114.1694, magnitude: 6.2, description: "香港附近发生地震，震级6.2级"},
  // ];
  //
  // // 在地图上添加地震点标记
  // earthquakeData.forEach(data => {
  //   const marker = L.circleMarker([data.lat, data.lng], {
  //     radius: data.magnitude * 2, // 根据震级调整圆的大小
  //     color: 'red',
  //     fillColor: 'orange',
  //     fillOpacity: 0.8
  //   }).addTo(map);
  //   marker.bindPopup(`<b>地震信息</b><br>${data.description}`);
  // });

  // 模拟热力图数据（用于模拟地震热力范围）
  //const heatData = earthquakeData.map(data => [data.lat, data.lng, data.magnitude / 10]); // 强度比例调整

  // 添加热力图层
  // const heatLayer = L.heatLayer(heatData, {
  //   radius: 25, // 热力点半径
  //   blur: 15,   // 模糊程度
  //   maxZoom: 10 // 最大缩放层级
  // }).addTo(map);

  // // 模拟台风路径数据
  // const typhoonPath = [
  //   [18.4663, 114.3912],
  //   [20.3963, 115.7842],
  //   [22.3363, 116.5423],
  //   [24.4863, 117.2912]
  // ];
  //
  // // 在地图上绘制台风路径
  // const typhoonPolyline = L.polyline(typhoonPath, {
  //   color: 'blue',
  //   weight: 4,
  //   opacity: 0.7
  // }).addTo(map);
  // typhoonPolyline.bindPopup("模拟台风路径");
  // 监听地图点击事件
  // 处理地图点击事件

  const handleMapClick = (latlng) => {
    zoomLevel.value++;
    //console.log('handleMapClick:', zoomLevel)

    // 设置市级（缩放到10级）或者区县级（缩放到12级）
    if (zoomLevel.value === 1) {
      // 第一次点击，放大到市级
      map.value.setView(latlng, 10); // 放大到市级（缩放等级为10）
    } else if (zoomLevel.value === 2) {
      // 第二次点击，放大到区县级
      map.value.setView(latlng, 12); // 放大到区县级（缩放等级为12）
    } else {
      // 重置为初始状态，返回到初始的缩放级别和中心
      zoomLevel.value = 0;
      map.value.setView([30.5728, 104.0668], 7); // 返回到初始的缩放级别
    }
  };
  map.value.on('click', (e) => {
    handleMapClick(e.latlng);
  });

  // 标记点的坐标数组
  const locations = [
    { lat: 30.531547656598505, lng: 104.20156321808673, popup: '北京市' },
    { lat: 30.620560448769837, lng: 103.95218459523755, popup: '上海市' },
    { lat: 30.39269423961626, lng: 103.36231971642536, popup: '广州市' }
  ];

  // 动态添加标记
  locations.forEach(location => {
    const marker = L.marker([location.lat, location.lng]).addTo(map.value);
    //marker.bindPopup(`<b>${location.popup}</b><br>这是一个标记点。`);
    marker.on('click',() => {
      // 设置地图的中心点为标记的位置，并缩放到缩放级别 10
      handleMapClick(marker.getLatLng());
    })
  });
};
// // 添加一个示例图层
// function addCustomLayer() {
//   const rain1 = ref(rain1geojsonData)
//   const testgeojson1 = ref(testgeojson)
//   if (!map.value) return;
//
//   if (isLayerAdded.value) {
//     // 移除图层
//     if (customLayer) {
//       map.value.removeLayer(customLayer);
//       customLayer = null;
//     }
//   } else {
//     // 添加图层
//     // const bounds = [[
//     //   113.64225339283132,
//     //   36.50422412633192
//     // ],
//     //   [
//     //     113.64225339283132,
//     //     36.50422412633192
//     //   ]];
//     // customLayer = L.rectangle(bounds, { color: 'blue', weight: 1, fillOpacity: 0.3 });
//     // customLayer.addTo(map.value);
//
//     customLayer = L.geoJSON(rain1.value, {
//       style: {
//         color: "#1274e7", // 边界线颜色
//         weight: 1, // 边界线宽度
//         fillColor: "#1274e7", // 填充颜色
//         fillOpacity: 0.3, // 填充透明度
//       },
//       //onEachFeature: onEachFeature
//     }).addTo(map.value);
//     //geojson.bringToFront()
//   }
//
//
//   // 切换状态
//   isLayerAdded.value = !isLayerAdded.value;
// }

// // 创建自定义控件
const createCustomControl = () => {
  const control = L.Control.extend({
    options: {
      position: 'topright', // 控件位置
    },
    onAdd() {
      // 创建一个 DOM 元素
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
      container.style.backgroundColor = 'white';
      container.style.width = '120px';
      container.style.height = '30px';
      container.style.cursor = 'pointer';
      // 使用 flexbox 实现内容居中
      container.style.display = 'flex';
      container.style.justifyContent = 'center'; // 水平居中
      container.style.alignItems = 'center'; // 垂直居中
      container.innerHTML = '显示四川省雨量图';
      container.title = '添加自定义层';

      // 点击事件
      container.onclick = (event) => {
        event.preventDefault(); // 防止默认事件
        L.DomEvent.stopPropagation(event); // 阻止事件冒泡
        addCustomLayer(); // 添加自定义图层
      };
      return container;
    },
  });
  return new control();
}

// 挂载后执行初始化地图逻辑
onMounted(() => {
  initMap();
  // 添加自定义控件
  const customControl = weatherCustom.createCustomControl01(map);
  //map.value.addControl(customControl);
});
  //},
//};
</script>

<style scoped>
#map { height: 600px; }
.leaflet-bar {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.3);
}
.leaflet-control-custom {
  background-color: #007bff;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>

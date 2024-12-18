<template>
  <div id="cesiumContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import * as Cesium from 'cesium';
import 'cesium/Widgets/widgets.css'; // 引入 Cesium 样式

// 初始化 Cesium Viewer
onMounted(() => {
  // 设置 Cesium 的静态资源路径
  window.CESIUM_BASE_URL = '/cesium/';

  // const viewer = new Cesium.Viewer('cesiumContainer', {
  //   imageryProvider: new Cesium.UrlTemplateImageryProvider({
  //     url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     credit: '© OpenStreetMap contributors',
  //   }),
  //   baseLayerPicker: false, // 关闭底图选择器
  //   timeline: false, // 关闭时间轴
  //   animation: false, // 关闭动画控件
  // });
  // const viewer = new Cesium.Viewer('cesiumContainer', {
  //   imageryProviderViewModel: new Cesium.UrlTemplateImageryProvider({
  //     url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //     credit: '© OpenStreetMap contributors',
  //     // Enabling cross-origin support for images
  //     subdomains: ['a', 'b', 'c'],
  //     tilingScheme: new Cesium.WebMercatorTilingScheme(),
  //   }),
  // });
  // 初始化 Cesium Viewer
  // const viewer = new Cesium.Viewer('cesiumContainer', {
  //   imageryProvider: new Cesium.IonImageryProvider({ assetId: 2 }), // 使用 Cesium 默认图层
  //   baseLayerPicker: true, // 底图选择器
  //   geocoder: true, // 地理编码器
  //   timeline: true, // 时间线
  //   animation: true, // 动画控件
  // });

  // const viewer = new Cesium.Viewer('cesiumContainer', {
  //   imageryProviderViewModel: new Cesium.IonImageryProvider({ assetId: 2 }), // 使用 Cesium 的默认地图
  // });

  // const viewer = new Cesium.Viewer('cesiumContainer', {
  //   imageryProviderViewModel: new Cesium.UrlTemplateImageryProvider({
  //     url : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // 使用 OpenStreetMap 图层
  //     credit: '© OpenStreetMap contributors',
  //     crossOrigin: 'anonymous' // 解决跨域问题
  //   }),
  // });

  const tiandituKey = "2ab60d6b6e0982393f77359351b1b866";
  const tiandituImageryProvider = new Cesium.WebMapTileServiceImageryProvider({
    url : `https://t{s}.tianditu.gov.cn/img_w/wmts?tk=${tiandituKey}`,
    layer : 'img',
    style : 'default',
    format : 'tiles',
    tileMatrixSetID : 'w',
    subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
    maximumLevel : 18
  });

  const viewer = new Cesium.Viewer('cesiumContainer')
  // const tdtLayer = new Cesium.UrlTemplateImageryProvider({
  //   url: "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",
  //   subdomains: ["a", "b", "c", "d"],
  //
  // })
  viewer.imageryLayers.addImageryProvider(tiandituImageryProvider);
  // 设置相机位置（北京）
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042, 1000000), // 经度、纬度、高度
  });

  // 添加一个示例点
  const point = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(116.4074, 39.9042),
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED,
    },
    description: '这是北京的一个点',
  });
});
</script>

<style scoped>
/* 确保 Cesium 容器样式正确 */
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>

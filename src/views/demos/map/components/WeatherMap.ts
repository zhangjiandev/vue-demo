import L, { Map, Marker } from 'leaflet';
import {ref} from "vue"; //四川省雨量图
let customLayer: Layer | null = null; // 用于存储自定义图层
let defaultLayer: Layer | null = null;
const isLayerAdded = ref(false); // 控制图层显示/隐藏的状态
// 添加自定义按钮，方便功能调试 !>>
// 定义按钮信息
const buttons = [
    {
        label: '📍', // 按钮内容
        title: '清除', // 鼠标悬停时的提示文本
        map: undefined,
        action: (event, map) => {
            event.preventDefault(); // 防止默认事件
            L.DomEvent.stopPropagation(event); // 阻止事件冒泡
            removeLayer(map)
            //alert('点击了定位按钮');
            // 在这里添加定位功能
        }
    },
    {
        label: '🗺️',
        title: '切换地图',
        map: undefined,
        action: (event, map) => {
            alert('切换地图');
            // 在这里实现切换地图功能
        }
    },
    {
        label: '🌦️',
        title: '显示天气',
        map: undefined,
        action: (event, map) => {
            event.preventDefault(); // 防止默认事件
            L.DomEvent.stopPropagation(event); // 阻止事件冒泡
            addCustomLayer(map)
            // 在这里实现显示天气功能
        }
    }
];
const createCustomControl01 = (map: Map) => {
    const control = L.Control.extend({
        options: {
            position: 'topright', // 控件位置
        },
        onAdd() {
            const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
            buttons.forEach(button => {
                const buttonElement = L.DomUtil.create('button', 'leaflet-control-custom');
                buttonElement.innerHTML = button.label;
                buttonElement.title = button.title;
                // 添加点击事件
                buttonElement.onclick = function(event) {
                    button.action(event, map);  // 将 map 传递给 action 方法
                };
                container.appendChild(buttonElement);
            });
            return container;
        },
    });
    map.value.addControl(new control());
}
// 添加自定义按钮，方便功能调试 !<<

// 添加四川省雨量图图层 !>>
import rain1geojsonData from '@/assets/rain1.json';
function addCustomLayer(map: Map) {
    if(defaultLayer) map.value.removeLayer(defaultLayer);
    setDefaultLayer(map, "#fdfd86")
    const rain1 = ref(rain1geojsonData)
    //const testgeojson1 = ref(testgeojson)
    if (!map.value) return;

    if (isLayerAdded.value) {
        // 移除图层
        if (customLayer) {
            map.value.removeLayer(customLayer);
            customLayer = null;
        }
    } else {

        customLayer = L.geoJSON(rain1.value, {
            // style: {
            //     color: "#1274e7", // 边界线颜色
            //     weight: 1, // 边界线宽度
            //     fillColor: "#1274e7", // 填充颜色
            //     fillOpacity: 0.3, // 填充透明度
            // },
            style: getFeatureStyle,
            //onEachFeature: onEachFeature
        }).addTo(map.value);
    }
    // 切换状态
    isLayerAdded.value = !isLayerAdded.value;
}

// 样式方法，根据 `properties` 设置不同颜色
function getFeatureStyle(feature) {
    const colors = {
        type1: '#57abf9',
        type2: '#21fcfc',
        type3: '#f9b06a',
        type4: '#21fcfc',
        type5: '#57abf9',
        type6: '#57abf9',
        //type3: 'green',
    };

    const color = feature.properties.color; // 假设 GeoJSON 的每个 feature 有一个 `type` 属性
    return {
        fillColor: color || 'gray', // 默认颜色为灰色
        weight: 1,
        opacity: 1,
        color: '#BCBAC0',
        fillOpacity: 0.8,
    };
}
// 添加四川省雨量图图层 !<<

// 清空已有图层 >>!
function removeLayer(map: Map) {
    // 移除图层
    if(customLayer) map.value.removeLayer(customLayer);
    if(defaultLayer) map.value.removeLayer(defaultLayer);
    isLayerAdded.value = !isLayerAdded.value;
    setDefaultLayer(map, "#b0afea")
}
// 清空已有图层 !<<
// 默认四川边界图层 >>!
import geojsonData from "@/assets/510000.json";
function setDefaultLayer(map: Map, color: string) {
    if(defaultLayer) map.value.removeLayer(defaultLayer);
    //debugger
    const beijingGeoJSON = ref(geojsonData)
    defaultLayer = L.geoJSON(beijingGeoJSON.value, {
        style: {
            color: "#BCBAC0", // 边界线颜色
            weight: 1, // 边界线宽度
            //fillColor: "#fdfd86", // 填充颜色
            //fillColor: "#b0afea", // 填充颜色
            fillColor: color || "#fdfd86", // 填充颜色
            fillOpacity: 0.3, // 填充透明度
        },
        //onEachFeature: onEachFeature
    }).addTo(map.value);
}
// 默认四川边界图层 !<<

export {createCustomControl01, removeLayer}
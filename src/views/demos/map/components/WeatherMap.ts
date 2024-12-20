import L, { Map, Marker } from 'leaflet';
// 创建自定义控件 首页点击“风险预警”，显示四川省雨量图 !>>
// 添加自定义按钮，方便功能调试
import rain1geojsonData from '/src/assets/rain1.json';
import {ref} from "vue"; //四川省雨量图
let customLayer: Layer | null = null; // 用于存储自定义图层
const isLayerAdded = ref(false); // 控制图层显示/隐藏的状态
// 定义按钮信息
const buttons = [
    {
        label: '📍', // 按钮内容
        title: '定位', // 鼠标悬停时的提示文本
        map: undefined,
        action: (event, map) => {
            alert('点击了定位按钮');
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

// 添加一个示例图层
function addCustomLayer(map: Map) {
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
            style: {
                color: "#1274e7", // 边界线颜色
                weight: 1, // 边界线宽度
                fillColor: "#1274e7", // 填充颜色
                fillOpacity: 0.3, // 填充透明度
            },
            //onEachFeature: onEachFeature
        }).addTo(map.value);
    }
    // 切换状态
    isLayerAdded.value = !isLayerAdded.value;
}
// 创建自定义控件 首页点击“风险预警”，显示四川省雨量图 <<!
export {createCustomControl01}
<template>
  <div>
    <!-- Level 1 -->
    <div>
      <h3>一级分类</h3>
      <div class="level-container">
        <span
            :class="{ selected: selectedLevel1 === 'all' }"
            @click="handleLevel1Click('all')"
        >
          所有
        </span>
        <div v-for="item in level1Data" :key="item.id">
          <span
              :class="{ selected: selectedLevel1 === item.id }"
              @click="handleLevel1Click(item)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Level 2 -->
    <div v-if="selectedLevel1">
      <h3>2级分类</h3>
      <div class="level-container">
        <span
            :class="{ selected: selectedLevel2 === 'all' }"
            @click="handleLevel2Click('all')"
        >
          所有
        </span>
        <div v-for="item in level2Data" :key="item.id">
          <span
              :class="{ selected: selectedLevel2 === item.id }"
              @click="handleLevel2Click(item)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Level 3 -->
    <div v-if="selectedLevel2">
      <h3>标签</h3>
      <div class="level-container">
        <div v-for="item in level3Data" :key="item.id">
          <span
              :class="{ selected: selectedLevel3 === item.id }"
              @click="handleLevel3Click(item)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';

// 初始数据
const data = [
  {
    id: 1,
    name: "客户信息",
    level: 1,
    parent: 0,
    children: [
      {
        id: 4,
        name: "基本信息",
        level: 2,
        parent: 1,
        children: [
          { id: 9, name: "一线城市务工青年", level: 3, parent: 4, children: [] },
          { id: 10, name: "测试客户标签1", level: 3, parent: 4, children: [] },
          { id: 11, name: "测试客户标签2", level: 3, parent: 4, children: [] }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "行为偏好",
    level: 1,
    parent: 0,
    children: [
      {
        id: 5,
        name: "购买记录",
        level: 2,
        parent: 2,
        children: [
          { id: 12, name: "已购买产品", level: 3, parent: 5, children: [] },
          { id: 13, name: "最近购买时间", level: 3, parent: 5, children: [] }
        ]
      },
      {
        id: 6,
        name: "产品偏好",
        level: 2,
        parent: 2,
        children: [
          { id: 14, name: "偏好类别", level: 3, parent: 6, children: [] },
          { id: 15, name: "购买频率", level: 3, parent: 6, children: [] }
        ]
      }
    ]
  },
  // 其他数据...
];

// 存储数据的集合
const level1Data = computed(() => data.filter(item => item.level === 1));
const level2Data = ref([]);
const level3Data = ref([]);

// 选择的数据
const selectedLevel1 = ref('all'); // 默认选中所有
const selectedLevel2 = ref('all'); // 默认选中所有
const selectedLevel3 = ref(null);

// 处理Level 1点击事件
const handleLevel1Click = (item: any) => {
  if (item === 'all') {
    selectedLevel1.value = 'all';
    level2Data.value = data.flatMap(i => i.children); // 显示所有2级
    level3Data.value = data.flatMap(i => i.children.flatMap(c => c.children)); // 显示所有3级
  } else {
    selectedLevel1.value = item.id;
    const selectedLevel1Data = data.find(i => i.id === item.id);
    level2Data.value = selectedLevel1Data ? selectedLevel1Data.children : [];
    level3Data.value = []; // 清空Level 3
    selectedLevel2.value = 'all'; // 默认显示所有2级
    selectedLevel3.value = null; // 清空3级选项
  }
};

// 处理Level 2点击事件
const handleLevel2Click = (item: any) => {
  if (item === 'all') {
    selectedLevel2.value = 'all';
    level3Data.value = data.flatMap(i => i.children.flatMap(c => c.children)); // 显示所有3级
  } else {
    selectedLevel2.value = item.id;
    const selectedLevel2Data = level2Data.value.find(i => i.id === item.id);
    level3Data.value = selectedLevel2Data ? selectedLevel2Data.children : [];
  }
};

// 处理Level 3点击事件
const handleLevel3Click = (item: any) => {
  selectedLevel3.value = item.id;
};
onMounted(() => {
  handleLevel1Click('all')
})
</script>

<style scoped>
/* 选中的样式 */
.selected {
  font-weight: bold;
  color: #42b983;
}

/* 平铺显示 */
.level-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.level-container span {
  cursor: pointer;
  padding: 5px;
}

.level-container span.selected {
  font-weight: bold;
  color: #42b983;
}
</style>

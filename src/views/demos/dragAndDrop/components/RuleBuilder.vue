<template>
  <div class="rule-builder flex h-full">
    <!-- 左侧侧边栏 -->
    <div class="w-1/4 p-4 bg-gray-100">
      <h2 class="text-lg font-bold mb-4">可用组件</h2>
      <!-- 属性组件下拉列表 -->
      <div class="sidebar-item">
        <p class="font-medium">属性组件</p>
        <select v-model="selectedAttribute" class="w-full p-2 border rounded">
          <option disabled value="">选择属性</option>
          <option value="性别">性别</option>
          <option value="年龄">年龄</option>
          <option value="月收入">月收入</option>
        </select>
      </div>

      <!-- 可用组件区，显示属性组件的实例 -->
      <Draggable
          v-model="availableComponents"
          group="available"
          @start="handleDragStart"
          @end="handleDragEnd"
      >
        <template #item="{ element }">
          <div class="sidebar-item" @click="addComponentToRuleGroup(element)">
            <p class="font-medium">{{ element.label }}</p>
          </div>
        </template>
      </Draggable>
    </div>

    <!-- 右侧规则组合区 -->
    <div class="flex-grow p-4 bg-gray-50">
      <h2 class="text-lg font-bold mb-4">规则组合区</h2>
      <Draggable
          v-model="ruleGroups"
          group="groups"
          @start="handleDragStart"
          @end="handleDragEnd"
          class="bg-white p-4 border rounded shadow min-h-[200px]"
      >
        <template #item="{ element, index }">
          <div class="rule-group" :key="index">
            <p class="font-medium">{{ element.label }}</p>
            <!-- 显示属性组件副本 -->
            <template v-if="element.type === 'attribute'">
              <select v-model="element.selectedValue" class="w-full p-2 border rounded">
                <option disabled value="">请选择属性值</option>
                <option v-if="element.selectedAttribute === '性别'" value="男">男</option>
                <option v-if="element.selectedAttribute === '性别'" value="女">女</option>
                <option v-if="element.selectedAttribute === '年龄'" value="10">10</option>
                <option v-if="element.selectedAttribute === '年龄'" value="20">20</option>
                <option v-if="element.selectedAttribute === '年龄'" value="30">30</option>
                <option v-if="element.selectedAttribute === '月收入'" value="5万">5万</option>
                <option v-if="element.selectedAttribute === '月收入'" value="10万">10万</option>
                <option v-if="element.selectedAttribute === '月收入'" value="20万">20万</option>
              </select>
            </template>
          </div>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Draggable from "vuedraggable";

interface ComponentItem {
  type: string;
  label: string;
  description: string;
  selectedAttribute?: string; // 选择的属性
  selectedValue?: string; // 属性值
}

export default defineComponent({
  name: "RuleBuilder",
  components: { Draggable },
  setup() {
    // 定义可用组件，包括属性组件和其他组件
    const availableComponents = ref<ComponentItem[]>([]);
    const ruleGroups = ref<ComponentItem[]>([]);

    const selectedAttribute = ref<string>("");

    // 拖拽开始事件
    const handleDragStart = () => {
      console.log("开始拖拽");
    };

    // 拖拽结束事件
    const handleDragEnd = () => {
      console.log("拖拽结束");
    };

    // 添加属性组件副本到规则组合区
    const addComponentToRuleGroup = (element: ComponentItem) => {
      if (selectedAttribute.value) {
        const newComponent = {
          type: "attribute",
          label: selectedAttribute.value,
          selectedAttribute: selectedAttribute.value,
          selectedValue: "", // 默认没有选择值
        };
        ruleGroups.value.push(newComponent);
        selectedAttribute.value = ""; // 清空下拉选择
      }
    };

    return {
      availableComponents,
      ruleGroups,
      selectedAttribute,
      handleDragStart,
      handleDragEnd,
      addComponentToRuleGroup,
    };
  },
});
</script>

<style scoped>
.rule-builder {
  font-family: Arial, sans-serif;
}

.sidebar-item {
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 5px;
  cursor: grab;
  transition: background-color 0.3s ease;
}

.sidebar-item:hover {
  background-color: #ececec;
}

.rule-group {
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
}

.min-h-\[200px\] {
  min-height: 200px;
}
</style>

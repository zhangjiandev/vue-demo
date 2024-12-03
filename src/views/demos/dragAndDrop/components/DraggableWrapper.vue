<template>
  <div class="draggable-wrapper">
    <draggable v-model="items" @end="onDragEnd">
      <template #item="{ element }">
        <div class="drag-item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import draggable from "vuedraggable";

interface Item {
  id: number;
  name: string;
}

export default defineComponent({
  name: "DraggableWrapper",
  components: { draggable },
  setup() {
    const items = ref<Item[]>([
      { id: 1, name: "预定义组件 1" },
      { id: 2, name: "预定义组件 2" },
      { id: 3, name: "预定义组件 3" },
    ]);

    const onDragEnd = (event: any) => {
      console.log("拖拽完成:", items.value);
    };

    return { items, onDragEnd };
  },
});
</script>

<style scoped>
.draggable-wrapper {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.drag-item {
  padding: 10px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: move;
}
</style>

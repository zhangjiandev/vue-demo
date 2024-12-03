<template>
  <div class="w-1/4 bg-gray-100 p-4">
    <h2 class="text-lg font-bold mb-4">可用组件</h2>
    <div
        v-for="(component, index) in components"
        :key="index"
        class="bg-white border rounded p-2 mb-2 cursor-move"
        @mousedown="startDrag(component)"
    >
      {{ component.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    components: {
      type: Array as PropType<{ type: string; label: string }[]>,
      required: true,
    },
  },
  emits: ["drag-start"],
  setup(props, { emit }) {
    const startDrag = (component: { type: string; label: string }) => {
      emit("drag-start", component);
    };

    return { startDrag };
  },
});
</script>

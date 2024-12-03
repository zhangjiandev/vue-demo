<template>
  <select v-model="selected" @change="emitChange">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<{ value: string; label: string }[]>, // 泛型数组
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const selected = ref(props.options[0]?.value || "");

    const emitChange = () => {
      emit("update:modelValue", selected.value);
    };

    return { selected, emitChange };
  },
});
</script>

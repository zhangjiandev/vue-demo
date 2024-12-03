<template>
  <div class="border p-4">
    <h3>{{ group.name }}</h3>
    <div v-for="(item, index) in group.items" :key="index">
      <Dropdown :options="item.options" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dropdown from "./Dropdown.vue";

interface RuleItem {
  options: { value: string; label: string }[];
}

interface RuleGroup {
  name: string;
  items: RuleItem[];
}

export default defineComponent({
  components: { Dropdown },
  props: {
    group: {
      type: Object as PropType<RuleGroup>,
      required: true,
    },
  },
});
</script>

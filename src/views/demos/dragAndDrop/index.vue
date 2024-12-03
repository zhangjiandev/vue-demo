<template>
  <div class="h-screen flex">
    <RuleBuilder />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RuleBuilder from "./components/RuleBuilder.vue";

export default defineComponent({
  components: { RuleBuilder },
});
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}
</style>

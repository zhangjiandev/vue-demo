<template>
  <div class="new-rule-form">
    <CreateRule :object="object"></CreateRule>
    <div class="search-container">
      <el-button type="primary" @click="printObjects">搜索</el-button>
      <el-button>重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, defineExpose, toRaw } from 'vue'
import CreateRule from './components/CreateRule.vue'
const printObjects = () => {
  console.log('objects', objects)
}
const objects = {
  rules: 'and',
  list: [
    {
      dataTypes: '',
      types: '',
      //site: '',
      symbol: '',
      rules: '',
      type: 'condition'
    }
  ]
}
const object = ref(objects)
// export default {
//   name: 'NewRuleForm',
//   components: {
//     CreateRule
//   },
//   data() {
//     return {
//       object: {
//         rules: 'and',
//         list: [
//           {
//               types: '',
//               //site: '',
//               symbol: '',
//               rules: '',
//               type: 'condition'
//           }
//         ]
//       }
//     }
//   }
// }
</script>
<style>
.search-container {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  background-color: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}
</style>
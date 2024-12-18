
<template>
<el-radio-group v-model="radioData.value" @change="radioHandle">
  <el-radio :value="item.value" v-for="item in radioData.option" :key="item.value">{{item.label}}</el-radio>
</el-radio-group>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { onMounted, reactive, ref, defineExpose, toRaw } from 'vue'
const radioHandle = () => {
  console.log('radioHandle,', radioData.value.value)
}
const radioData = ref({
  value: 1,
  option:
      [
        {
          label: 'r1',
          value: 1
        },
        {
          label: 'r2',
          value: 2
        }
      ]
})
</script>
<template>
  <div class="relation-item">
    <div class="term">
      <span class="element">
        <el-select placeholder="请选择条件项" v-model="termvalue.key" @change="getChange">
          <el-option
              v-for="item in Edict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </span>
      <span class="comparison">
        <el-select placeholder="请选择关系符" v-model="termvalue.op" @change="getChange">
          <el-option
              v-for="item in Cdict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </span>
      <span>
        <el-switch v-model="termvalue.flag" inline-prompt active-text="数值" inactive-text="条件"/>
      </span>
      <span class="value" v-if="termvalue.flag">
        <el-input-number
            v-model="termvalue.value"
            class="mx-4"
            :min="1"
            controls-position="right"
            style="width: 80px"
            @change="getChange"
        />
        <el-select placeholder="单位" v-model="termvalue.units" style="width: 80px" @change="getChange">
          <el-option
              v-for="item in Unitsdict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </span>
      <span class="value" v-else>
        <el-input placeholder="请输入条件值" v-model="termvalue.valueKey" style="width: 80px" @change="getChange" />
      </span>
    </div>
    <el-button plain class="delete-term" @click="toDelete"> 删除 </el-button>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, defineEmits, toRaw } from 'vue'
const Demit = defineEmits(['toDelete','getChange'])
const props = defineProps({
  pos: {
    type: String,
    default: '',
  },
  data: {
    type: [Array, Object],
    default: () => {},
  },
})
const Cdict = [
  { label: '等于', value: '==' },
  { label: '不等于', value: '!=' },
  { label: '大于', value: '>' },
  { label: '小于', value: '<' },
  { label: '大于等于', value: '>=' },
  { label: '小于等于', value: '<=' },
]
const { key, op, value,valueKey, flag, units } = reactive(props.data)
const termvalue = reactive({
  key: key,
  op: op,
  flag:flag??false,
  value: value,
  valueKey: valueKey,
  units: units,
})
const Edict = [
  { label: 'Key1', value: 'Key1' },
  { label: 'Key2', value: 'Key2' },
  { label: 'Key3', value: 'Key3' },
]
const Unitsdict = [
  { label: 'Key1', value: 'Key1' },
  { label: 'Key2', value: 'Key2' },
  { label: 'Key3', value: 'Key3' },
]
const toDelete = () => {
  Demit('toDelete', props.pos)
}
const getChange = () => {
  Demit('getChange',termvalue,props.pos)
}
</script>
<style lang="scss" scoped>
.relation-item {
  display: flex;
  margin-left: 20px;
}
.term {
  display: flex;
  > span {
    margin-right: 2px;
  }
}
.value {
  display: flex;
  > div {
    margin-left: 2px;
  }
}
.element {
  width: 100px;
}
.comparison {
  width: 80px;
}
</style>
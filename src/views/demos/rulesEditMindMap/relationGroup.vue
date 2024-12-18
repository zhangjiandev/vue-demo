<template>
  <div class="relation-group">
    <div class="relational">
      <el-select class="relation-sign" v-model="value" @change="getChangePos">
        <el-option
            v-for="item in dict"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
    <div class="conditions">
      <div v-for="(v, i) in children" :key="v">
        <RelationGroup
            v-if="v.children && v.children.length"
            :pos="getNewPos(i)"
            :data="v"
            @onTermChange="handleTermChange"
        >
        </RelationGroup>
        <RelationItem
            v-else
            :pos="getNewPos(i)"
            :data="v"
            @toDelete="toDelete"
            @getChange="getChange"
        >
        </RelationItem>
      </div>
      <div class="operators">
        <el-button plain class="add-term" @click="handleAddTerm('addTerm')">加条件</el-button>
        <el-button  plain class="add-group" @click="handleAddGroup('addGroup')">加条件组</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, computed, ref, defineEmits, toRaw,reactive } from 'vue'
import RelationItem from './relationItem.vue'
import { posSeparator } from '@/utils/model'
const Gemit = defineEmits(['onTermChange']);
const props = defineProps({
  pos: {
    type: String,
    default: '',
  },
  data: {
    type: [Array,Object],
    default: () => {},
  },
})
onMounted(()=>{
  console.log('props.data',props.data,props.data.children);
})
// const {children,ops}=reactive(props.data)
const children = computed(() => {
  return props.data.children;
});
const ops = computed(() => {
  return props.data.ops;
})
const defaultOpsValue = 'and'
const relationValue = ops.value || defaultOpsValue
const value=ref(relationValue)
const getNewPos = (i) => {
  // 如果当前项是整个 value (即组件的起始项)时，新位置即当前序号
  return props.pos?`${props.pos}${posSeparator}${i}`:String(i)
}
const dict = [
  { label: '且', value: 'and' },
  { label: '或', value: 'or' },
]
const record = { key: '', op: '', value: '' }
const group = {
  ops: 'and',
  children: [{ key: '', op: '', value: '' }]
}
const handleAddTerm=(e)=>{
  Gemit('onTermChange',e, props.pos,record)
}
const handleAddGroup=(e)=>{
  Gemit('onTermChange',e, props.pos,group)
}
const handleTermChange=(e,pos,v)=>{
  Gemit('onTermChange',e, pos,v)
}
const getChangePos=(e)=>{
  Gemit('onTermChange', 'changeOps', props.pos,{key:'ops',value:e})
}
const toDelete=(pos)=>{
  Gemit('onTermChange', 'deleteTerm', pos,'')
}
const getChange=(e,pos)=>{
  Gemit('onTermChange', 'changeTerm', pos,e )
}
</script>
<style lang="scss" scoped>
.relation-group{
  display: flex;
}
.operators{
  margin-left: 20px;
}

</style>
<template>
  <div class="relation-tree">
    <RelationGroup pos="" :data="relations" @onTermChange="handleTermChange" > </RelationGroup>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, defineExpose, toRaw } from 'vue'
import RelationGroup from './relationGroup.vue'
import { getNewValue } from '@/utils/model'
const defaultRelation = {
  ops: 'and',
  children: [
    { key: 'Key1',flag:false, op: '>', value: 0 },
    {
      ops: 'or',
      children: [
        { key: 'Key2', flag:false,op: '<', value: 20 },
        { key: 'Key3',flag:true, op: '>', value: 10,units: 'bar'},
      ],
    },
  ],
}
const relations = ref(defaultRelation)
const handleTermChange = (e, pos,v) => {  //获取增删改查的数据
  relations.value = getNewValue(relations.value, pos, e, v)
}
</script>
<style>
.relation-tree {
  .relation-group {
    .relational {
      width: 85px;
      padding: 0 4px 0 18px;
      margin: 16px 0;
      border-right: 1px solid #d9d9d9;
      display: flex;
      align-items: center;
    }

    .conditions {
      > div {
        position: relative;
        padding-top: 8px;
        &::before {
          content: '';
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 0px;
          width: 16px;
          height: 1px;
          border-bottom: 1px solid #d9d9d9;
          background-color: #fff;
        }
        &:first-child {
          &::before {
            width: 16px;
            height: 24px;
            top: 0px;
            left: -1px;
            width: 20px;
          }
        }

        &.relation-group:before {
          top: 20px;
        }
        &:last-child {
          &::before {
            top: inherit;
            bottom: 15px;
            left: -20px;
            width: 17px;
            border-bottom: 0;
            border-top: 1px solid #d9d9d9;
          }
        }
      }
    }
  }
}
</style>
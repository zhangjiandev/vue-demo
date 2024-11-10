<template>
  <el-tree
      :data="treeData"
      show-checkbox
      check-strictly
      :props="defaultProps" />
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
const treeData = ref([
  {
    label: '一级 1',
    disabled: false,  // 禁用该节点的复选框
    children: [
      {
        label: '二级 1-1',
        disabled: true,
        children: [{ label: '三级 1-1-1', disabled: true }],
      },
    ],
  },
  {
    label: '一级 2',
    disabled: true,
    children: [
      {
        label: '二级 2-1',
        disabled: true,
        children: [{ label: '三级 2-1-1', disabled: true }],
      },
    ],
  },
]);

const defaultProps = {
  children: 'children',
  label: 'label',
  //disabled: 'disabled', // 让每个节点都可以禁用
};

// 自定义渲染内容，使复选框不可选
const renderContent = (nodeData) => {
  return h('span', [
    h('el-checkbox', {
      modelValue: nodeData.checked,  // 控制复选框的选中状态
      disabled: true,                // 强制禁用复选框
    }),
    h('span', { style: { 'margin-left': '8px' } }, nodeData.data.label)
  ]);
};
</script>

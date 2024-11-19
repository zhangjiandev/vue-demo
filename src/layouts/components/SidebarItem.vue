<template>
  <template v-if="!item.meta?.hidden">
    <el-sub-menu 
      v-if="hasChildren(item)" 
      :index="resolvePath(item.path)"
    >
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(item.path)"
      />
    </el-sub-menu>

    <el-menu-item 
      v-else 
      :index="resolvePath(item.path)"
    >
      <el-icon v-if="item.meta?.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>{{ item.meta?.title }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'

export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object as () => RouteRecordRaw,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const hasChildren = (route: RouteRecordRaw) => {
      return route.children && route.children.length > 0 && !route.meta?.hideChildrenInMenu
    }

    const resolvePath = (routePath: string) => {
      if (path.isAbsolute(routePath)) {
        return routePath
      }
      return path.resolve(props.basePath, routePath)
    }

    return {
      hasChildren,
      resolvePath
    }
  }
})
</script>

<style lang="scss" scoped>
.el-menu-item.is-active,
.el-sub-menu.is-active {
  background-color: #263445;
}
</style> 
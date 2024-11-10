<template>
  <div class="layout">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.content {
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
}
</style>

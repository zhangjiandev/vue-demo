<template>
  <div class="sidebar">
    <ul>
      <li><router-link to="/page1">Page 1</router-link></li>
      <li><router-link to="/page2">Page 2</router-link></li>
<!--      <li><router-link to="/page3">Page 3</router-link></li>-->
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Sidebar',
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f5f5f5;
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  text-decoration: none;
  color: #333;
}

a.router-link-active {
  font-weight: bold;
  color: blue;
}
</style>

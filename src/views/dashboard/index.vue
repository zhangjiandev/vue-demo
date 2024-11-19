<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>用户总数</span>
            </div>
          </template>
          <div class="card-body">
            <h2>{{ statistics.userCount }}</h2>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>今日访问</span>
            </div>
          </template>
          <div class="card-body">
            <h2>{{ statistics.visitCount }}</h2>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>系统消息</span>
            </div>
          </template>
          <div class="card-body">
            <h2>{{ statistics.messageCount }}</h2>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
            </div>
          </template>
          <div class="card-body">
            <h2>{{ statistics.todoCount }}</h2>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Statistics {
  userCount: number
  visitCount: number
  messageCount: number
  todoCount: number
}

const statistics = ref<Statistics>({
  userCount: 0,
  visitCount: 0,
  messageCount: 0,
  todoCount: 0
})

onMounted(() => {
  // 模拟获取数据
  statistics.value = {
    userCount: 1234,
    visitCount: 5678,
    messageCount: 90,
    todoCount: 12
  }
})
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  
  .el-card {
    margin-bottom: 20px;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .card-body {
      text-align: center;
      padding: 20px 0;
      
      h2 {
        margin: 0;
        font-size: 24px;
        color: #409EFF;
      }
    }
  }
}
</style> 
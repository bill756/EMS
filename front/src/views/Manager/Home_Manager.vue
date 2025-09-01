<template>
  <div class="home-manager">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">九堡凯博鞋业管理系统</h1>
      <p class="page-subtitle">数据概览与统计分析</p>
    </div>

    <!-- 统计卡片区域 -->
    <div class="stats-grid">
      <!-- 员工总数统计 -->
      <el-card class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon employee">
            <el-icon>
              <Avatar/>
            </el-icon>
          </div>
          <div class="stat-info">
            <h3 class="stat-number">{{ totalEmployees }}</h3>
            <p class="stat-label">员工总数</p>
            <span class="stat-detail">老板1人 + 组长9人 + 员工45人</span>
          </div>
        </div>
      </el-card>

      <!-- 小组数量统计 -->
      <el-card class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon group">
            <el-icon>
              <UserFilled/>
            </el-icon>
          </div>
          <div class="stat-info">
            <h3 class="stat-number">{{ totalGroups }}</h3>
            <p class="stat-label">生产小组</p>
            <span class="stat-detail">每组6人（1组长+5员工）</span>
          </div>
        </div>
      </el-card>

      <!-- 今日出勤率 -->
      <el-card class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon attendance">
            <el-icon>
              <Calendar/>
            </el-icon>
          </div>
          <div class="stat-info">
            <h3 class="stat-number">{{ attendanceRate }}%</h3>
            <p class="stat-label">今日出勤率</p>
            <span class="stat-detail">{{ attendedCount }}/{{ totalEmployees }}人出勤</span>
          </div>
        </div>
      </el-card>

      <!-- 今日产量统计 -->
      <el-card class="stat-card" shadow="hover">
        <div class="stat-content">
          <div class="stat-icon production">
            <el-icon>
              <TrendCharts/>
            </el-icon>
          </div>
          <div class="stat-info">
            <h3 class="stat-number">{{ todayProduction }}</h3>
            <p class="stat-label">今日产量（双）</p>
            <span class="stat-detail">良品率 {{ qualityRate }}%</span>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 图表和快捷操作区域 -->
    <div class="dashboard-content">
      <!-- 左侧图表区域 -->
      <div class="chart-section">
        <!-- 生产趋势图 -->
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">近7天生产趋势</span>
              <el-button size="small" type="primary" @click="refreshChartData">
                <el-icon>
                  <Refresh/>
                </el-icon>
                刷新
              </el-button>
            </div>
          </template>
          <div class="chart-container">
            <div class="chart-placeholder">
              <el-icon class="chart-icon">
                <TrendCharts/>
              </el-icon>
              <p>生产趋势图表区域</p>
              <p class="chart-note">显示近7天各小组产量对比</p>
            </div>
          </div>
        </el-card>

        <!-- 小组产量排行 -->
        <el-card class="chart-card" shadow="hover">
          <template #header>
            <span class="card-title">小组产量排行</span>
          </template>
          <div class="ranking-list">
            <div
                v-for="(group, index) in groupRanking"
                :key="group.id"
                :class="{ 'top-three': index < 3 }"
                class="ranking-item"
            >
              <div :class="`rank-${index + 1}`" class="rank-number">
                {{ index + 1 }}
              </div>
              <div class="group-info">
                <span class="group-name">{{ group.name }}</span>
                <span class="group-leader">组长：{{ group.leader }}</span>
              </div>
              <div class="production-info">
                <span class="production-count">{{ group.production }}双</span>
                <span class="quality-rate">良品率{{ group.qualityRate }}%</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 右侧快捷操作区域 -->
      <div class="quick-actions">
        <el-card class="action-card" shadow="hover">
          <template #header>
            <span class="card-title">快捷操作</span>
          </template>
          <div class="action-grid">
            <div class="action-item" @click="navigateTo('/manager/employee')">
              <el-icon class="action-icon">
                <Avatar/>
              </el-icon>
              <span class="action-label">员工管理</span>
              <p class="action-desc">查看员工工作量和良品率</p>
            </div>
            <div class="action-item" @click="navigateTo('/manager/attendance')">
              <el-icon class="action-icon">
                <Calendar/>
              </el-icon>
              <span class="action-label">考勤打卡</span>
              <p class="action-desc">员工签到和请假管理</p>
            </div>
            <div class="action-item" @click="navigateTo('/manager/group')">
              <el-icon class="action-icon">
                <UserFilled/>
              </el-icon>
              <span class="action-label">小组管理</span>
              <p class="action-desc">工序安排和组员分配</p>
            </div>
            <div class="action-item" @click="navigateTo('/manager/salary')">
              <el-icon class="action-icon">
                <Money/>
              </el-icon>
              <span class="action-label">工资统计</span>
              <p class="action-desc">工资计算和个税扣除</p>
            </div>
          </div>
        </el-card>

        <!-- 今日待办事项 -->
        <el-card class="todo-card" shadow="hover">
          <template #header>
            <span class="card-title">今日待办</span>
          </template>
          <div class="todo-list">
            <div v-for="todo in todoList" :key="todo.id" class="todo-item">
              <el-checkbox v-model="todo.completed" @change="updateTodo(todo)">
                {{ todo.content }}
              </el-checkbox>
              <span class="todo-time">{{ todo.time }}</span>
            </div>
          </div>
          <el-button class="add-todo-btn" size="small" type="primary" @click="showAddTodoDialog">
            <el-icon>
              <Plus/>
            </el-icon>
            添加待办
          </el-button>
        </el-card>
      </div>
    </div>

    <!-- 添加待办对话框 -->
    <el-dialog v-model="addTodoVisible" title="添加待办事项" width="400px">
      <el-form :model="newTodo" label-width="80px">
        <el-form-item label="内容">
          <el-input v-model="newTodo.content" placeholder="请输入待办事项内容"/>
        </el-form-item>
        <el-form-item label="时间">
          <el-time-picker v-model="newTodo.time" placeholder="选择时间"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addTodoVisible = false">取消</el-button>
        <el-button type="primary" @click="addTodo">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {Avatar, Calendar, Money, Plus, Refresh, TrendCharts, UserFilled} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'

// 路由实例
const router = useRouter()

// 统计数据
const totalEmployees = ref(55) // 1老板 + 9组长 + 45员工
const totalGroups = ref(9)
const attendanceRate = ref(92.7)
const attendedCount = ref(51)
const todayProduction = ref(1280)
const qualityRate = ref(96.5)

// 小组排行数据
const groupRanking = ref([
  {id: 1, name: '第一小组', leader: '张三', production: 156, qualityRate: 98.2},
  {id: 2, name: '第二小组', leader: '李四', production: 152, qualityRate: 97.8},
  {id: 3, name: '第三小组', leader: '王五', production: 148, qualityRate: 96.9},
  {id: 4, name: '第四小组', leader: '赵六', production: 145, qualityRate: 96.5},
  {id: 5, name: '第五小组', leader: '钱七', production: 142, qualityRate: 95.8},
  {id: 6, name: '第六小组', leader: '孙八', production: 138, qualityRate: 95.2},
  {id: 7, name: '第七小组', leader: '周九', production: 135, qualityRate: 94.8},
  {id: 8, name: '第八小组', leader: '吴十', production: 132, qualityRate: 94.3},
  {id: 9, name: '第九小组', leader: '郑一', production: 128, qualityRate: 93.9}
])

// 待办事项
const todoList = ref([
  {id: 1, content: '检查第三小组设备维护情况', completed: false, time: '09:00'},
  {id: 2, content: '审核本周工资统计表', completed: false, time: '14:00'},
  {id: 3, content: '安排新员工培训', completed: true, time: '16:00'}
])

// 添加待办相关
const addTodoVisible = ref(false)
const newTodo = ref({
  content: '',
  time: null
})

/**
 * 页面导航
 * @param {string} path - 目标路径
 */
const navigateTo = (path) => {
  console.log(`导航到页面: ${path}`)
  router.push(path)
}

/**
 * 刷新图表数据
 */
const refreshChartData = () => {
  console.log('刷新图表数据')
  ElMessage.success('图表数据已刷新')
}

/**
 * 更新待办事项状态
 * @param {Object} todo - 待办事项对象
 */
const updateTodo = (todo) => {
  console.log(`更新待办事项: ${todo.content}, 状态: ${todo.completed}`)
  ElMessage.success(todo.completed ? '任务已完成' : '任务已取消完成')
}

/**
 * 显示添加待办对话框
 */
const showAddTodoDialog = () => {
  console.log('显示添加待办对话框')
  addTodoVisible.value = true
}

/**
 * 添加新的待办事项
 */
const addTodo = () => {
  if (!newTodo.value.content.trim()) {
    ElMessage.warning('请输入待办事项内容')
    return
  }

  const todo = {
    id: Date.now(),
    content: newTodo.value.content,
    completed: false,
    time: newTodo.value.time ? newTodo.value.time.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    }) : '待定'
  }

  todoList.value.push(todo)
  console.log('添加待办事项:', todo)

  // 重置表单
  newTodo.value = {content: '', time: null}
  addTodoVisible.value = false
  ElMessage.success('待办事项添加成功')
}

/**
 * 组件挂载时初始化数据
 */
onMounted(() => {
  console.log('首页管理组件已挂载，初始化数据')
  // 这里可以调用API获取实时数据
})
</script>

<style scoped>
/* 主容器样式 */
.home-manager {
  padding: 0;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* 页面头部样式 */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

/* 统计卡片网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
  padding: 10px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 24px;
  color: white;
}

.stat-icon.employee {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.stat-icon.group {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

.stat-icon.attendance {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.stat-icon.production {
  background: linear-gradient(135deg, #43e97b, #38f9d7);
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.stat-label {
  font-size: 16px;
  color: #7f8c8d;
  margin: 0 0 5px 0;
  font-weight: 500;
}

.stat-detail {
  font-size: 12px;
  color: #95a5a6;
}

/* 仪表板内容区域 */
.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.chart-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart-card {
  border-radius: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.chart-container {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  text-align: center;
  color: #95a5a6;
}

.chart-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.chart-note {
  font-size: 12px;
  margin-top: 5px;
}

/* 排行榜样式 */
.ranking-list {
  max-height: 400px;
  overflow-y: auto;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.ranking-item:hover {
  background-color: #f8f9fa;
}

.ranking-item.top-three {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.1), transparent);
}

.rank-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 15px;
  color: white;
}

.rank-number.rank-1 {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
}

.rank-number.rank-2 {
  background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
}

.rank-number.rank-3 {
  background: linear-gradient(135deg, #cd7f32, #daa520);
}

.rank-number:not(.rank-1):not(.rank-2):not(.rank-3) {
  background: linear-gradient(135deg, #95a5a6, #bdc3c7);
}

.group-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.group-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2px;
}

.group-leader {
  font-size: 12px;
  color: #7f8c8d;
}

.production-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.production-count {
  font-weight: 600;
  color: #27ae60;
  margin-bottom: 2px;
}

.quality-rate {
  font-size: 12px;
  color: #3498db;
}

/* 快捷操作区域 */
.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.action-card, .todo-card {
  border-radius: 12px;
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.action-item {
  padding: 20px;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-item:hover {
  border-color: #667eea;
  background-color: rgba(102, 126, 234, 0.05);
  transform: translateY(-2px);
}

.action-icon {
  font-size: 32px;
  color: #667eea;
  margin-bottom: 10px;
}

.action-label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.action-desc {
  font-size: 12px;
  color: #7f8c8d;
  margin: 0;
}

/* 待办事项样式 */
.todo-list {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.todo-time {
  font-size: 12px;
  color: #95a5a6;
}

.add-todo-btn {
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }

  .action-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .page-header {
    padding: 20px;
  }

  .page-title {
    font-size: 24px;
  }
}
</style>
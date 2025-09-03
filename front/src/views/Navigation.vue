<template>
  <div>
    <!--头部区域 Start-->
    <div class="head">
      <!--左侧-->
      <div class="title">
        <img alt="员工管理系统" class="title_logo" src="../assets/imgs/employee_logo.svg">
        <span>员工管理系统</span>
      </div>
      <!--右侧-->
      <div class="setting">
        <!--搜索-->
        <el-input
            v-model="input"
            :prefix-icon="Search"
            placeholder="搜索"
            style="width: 240px"
        />
        <!--头像下拉菜单-->
        <el-dropdown trigger="click">
          <div class="avatar-container">
            <img alt="管理员头像" class="admin" src="../assets/imgs/admin_avatar.svg">
            <span class="user-name">管理员</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-icon>
                  <Setting/>
                </el-icon>
                <span>设置</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon>
                  <PictureRounded/>
                </el-icon>
                <span>更改头像</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon>
                  <Lock/>
                </el-icon>
                <span>修改密码</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-icon>
                  <SwitchButton/>
                </el-icon>
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!--头部区域 End-->

    <!--菜单区域 Start-->
    <div class="container">
      <!-- 左侧菜单栏 -->
      <div class="menu-container">
        <!-- 使用Element Plus的el-menu组件 -->
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical"
            default-active="1"
            text-color="#fff">
          <!-- 首页菜单项 -->
          <el-menu-item index="1" @click="router.push('/')">
            <el-icon>
              <HomeFilled/>
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <!-- 小组管理菜单项 -->
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <UserFilled/>
              </el-icon>
              <span>小组管理</span>
            </template>
            <el-menu-item index="2-1" @click="router.push('/groupShow')">看板</el-menu-item>
            <el-menu-item index="2-2" @click="router.push('/groupManager')">管理</el-menu-item>
          </el-sub-menu>
          <!-- 员工管理菜单项 -->
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <Avatar/>
              </el-icon>
              <span>员工管理</span>
            </template>
            <el-menu-item index="3-1" @click="router.push('/employeeShow')">看板</el-menu-item>
            <el-menu-item index="3-2" @click="router.push('/employeeManager')">管理</el-menu-item>
          </el-sub-menu>
          <!-- 考勤管理菜单项 -->
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <Calendar/>
              </el-icon>
              <span>考勤管理</span>
            </template>
            <el-menu-item index="4-1" @click="router.push('/attendanceShow')">看板</el-menu-item>
            <el-menu-item index="4-2" @click="router.push('/attendanceManager')">管理</el-menu-item>
          </el-sub-menu>
          <!-- 工资管理菜单项 -->
          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <Money/>
              </el-icon>
              <span>工资管理</span>
            </template>
            <el-menu-item index="5-1" @click="router.push('/salaryShow')">看板</el-menu-item>
            <el-menu-item index="5-2" @click="router.push('/salaryManager')">管理</el-menu-item>
          </el-sub-menu>
          <!-- 考核管理菜单项 -->
          <el-sub-menu index="6">
            <template #title>
              <el-icon>
                <Histogram/>
              </el-icon>
              <span>考核管理</span>
            </template>
            <el-menu-item index="6-1" @click="router.push('/assessmentShow')">看板</el-menu-item>
            <el-menu-item index="6-2" @click="router.push('/assessmentManager')">管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <!-- 右侧内容区域 -->
      <div class="content-container">
        <RouterView/>
      </div>
    </div>
    <!--菜单区域 End-->
  </div>
</template>

<style scoped>
.head {
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e6e6;
  background-color: var(--card-bg);
  box-shadow: var(--box-shadow);
  position: relative;
  z-index: 10;
}

.title {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title_logo {
  width: 40px;
  height: 40px;
  padding: 0 5px 0 5px;
  vertical-align: middle;
}

.setting {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}

.admin {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  background: white;
  padding: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.admin:hover {
  transform: scale(1.08);
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.avatar-container {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-right: 10px;
}

.avatar-container:hover {
  background-color: rgba(102, 126, 234, 0.1);
}


.user-name {
  font-size: 14px;
  margin: 0 5px;
  color: #2c3e50;
  font-weight: 600;
  transition: color 0.3s ease;
}

.avatar-container:hover .user-name {
  color: #667eea;
}

/* 容器样式 - 用于布局菜单和内容区域 */
.container {
  display: flex;
  height: calc(100vh - 60px); /* 减去头部高度 */
}

/* 左侧菜单容器样式 */
.menu-container {
  width: 160px; /* 菜单宽度 */
  background-color: var(--card-bg);
  height: 100%;
  transition: all var(--transition-duration);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 5;
}

/* 右侧内容区域样式 */
.content-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto; /* 内容过多时可滚动 */
  background-color: var(--bg-color);
}

/* 垂直菜单样式 */
.el-menu-vertical {
  border-right: none; /* 移除右侧边框 */
  width: 100%;
  background-color: transparent;
}

/* 覆盖Element Plus菜单样式 */
:deep(.el-menu) {
  background-color: transparent;
}

:deep(.el-menu-item) {
  height: 50px;
  line-height: 50px;
  color: var(--text-regular);
  transition: all var(--transition-duration) ease;
}

:deep(.el-menu-item:hover) {
  background-color: rgba(58, 142, 230, 0.1);
}

:deep(.el-menu-item.is-active) {
  color: var(--primary-color);
  background-color: rgba(58, 142, 230, 0.1);
  border-right: 3px solid var(--primary-color);
}

/* 一级菜单文字和图标颜色 */
:deep(.el-menu-item),
:deep(.el-sub-menu .el-sub-menu__title) {
  color: #000000 !important;
}

/* 一级菜单hover状态 */
:deep(.el-menu-item:hover),
:deep(.el-sub-menu .el-sub-menu__title:hover) {
  color: rgb(80, 97, 238) !important;
}

/* 一级菜单激活状态 */
:deep(.el-menu-item.is-active) {
  color: #2a40da !important;
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

:deep(.el-dropdown-menu__item i) {
  margin-right: 10px;
  font-size: 16px;
  color: var(--text-regular);
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--primary-color);
}

:deep(.el-dropdown-menu__item:hover i) {
  color: var(--primary-color);
}
</style>


<script lang="ts" setup>
import {ref} from 'vue'
import {
  Avatar,
  Calendar,
  HomeFilled,
  Lock,
  Money,
  Histogram,
  PictureRounded,
  Search,
  Setting,
  SwitchButton,
  UserFilled
} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'

const input = ref('')
const router = useRouter()

</script>
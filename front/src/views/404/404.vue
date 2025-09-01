<template>
  <div class="error-container">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <!-- 主要内容 -->
    <div class="error-content">
      <!-- 404数字 -->
      <div class="error-number">
        <span class="digit">4</span>
        <span class="digit">0</span>
        <span class="digit">4</span>
      </div>

      <!-- 错误图标 -->
      <div class="error-icon">
        <el-icon :size="80" class="icon-animation">
          <Warning/>
        </el-icon>
      </div>

      <!-- 错误信息 -->
      <h1 class="error-title">页面未找到</h1>
      <p class="error-description">
        抱歉，您访问的页面不存在或已被移动
      </p>
      <p class="error-suggestion">
        请检查URL地址是否正确，或返回首页继续浏览
      </p>

      <!-- 操作按钮 -->
      <div class="error-actions">
        <el-button
            class="home-button"
            size="large"
            type="primary"
            @click="goHome"
        >
          <el-icon>
            <House/>
          </el-icon>
          返回首页
        </el-button>
        <el-button
            class="back-button"
            size="large"
            @click="goBack"
        >
          <el-icon>
            <ArrowLeft/>
          </el-icon>
          返回上页
        </el-button>
      </div>

      <!-- 帮助链接 -->
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {ArrowLeft, House, Warning} from '@element-plus/icons-vue'

const router = useRouter()

const goHome = () => {
  router.push('/manager')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.error-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 10%;
  right: 30%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* 主要内容 */
.error-content {
  text-align: center;
  color: white;
  z-index: 1;
  max-width: 600px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 404数字 */
.error-number {
  font-size: 120px;
  font-weight: 900;
  margin-bottom: 20px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: 10px;
}

.digit {
  display: inline-block;
  animation: bounce 1s ease-in-out infinite;
}

.digit:nth-child(1) {
  animation-delay: 0.1s;
}

.digit:nth-child(2) {
  animation-delay: 0.2s;
}

.digit:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* 错误图标 */
.error-icon {
  margin-bottom: 30px;
}

.icon-animation {
  animation: pulse 2s ease-in-out infinite;
  color: #ffd700;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* 文本样式 */
.error-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.error-description {
  font-size: 18px;
  margin-bottom: 10px;
  opacity: 0.9;
  line-height: 1.6;
}

.error-suggestion {
  font-size: 16px;
  margin-bottom: 40px;
  opacity: 0.8;
  line-height: 1.5;
}

/* 按钮样式 */
.error-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.home-button {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  border: none;
  border-radius: 25px;
  padding: 12px 30px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 25px;
  padding: 12px 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* 帮助链接 */
.help-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.help-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.help-link:hover {
  color: white;
  text-decoration: underline;
}

.divider {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-content {
    margin: 20px;
    padding: 30px 20px;
  }

  .error-number {
    font-size: 80px;
    letter-spacing: 5px;
  }

  .error-title {
    font-size: 28px;
  }

  .error-description {
    font-size: 16px;
  }

  .error-suggestion {
    font-size: 14px;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
  }

  .home-button,
  .back-button {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .error-number {
    font-size: 60px;
  }

  .error-title {
    font-size: 24px;
  }

  .floating-shape {
    display: none;
  }
}
</style>
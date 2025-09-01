# 员工管理系统 (EMS)

## 项目简介

员工管理系统是一个基于前后端分离架构的企业级员工管理平台，专为鞋业制造企业设计。系统提供员工信息管理、小组管理、考勤管理、工资统计等核心功能，帮助企业提高管理效率和生产力。

## 技术栈

### 后端技术
- **Java 21** - 编程语言
- **Spring Boot 3.5.4** - 应用框架
- **MyBatis 3.0.3** - 持久层框架
- **MySQL** - 数据库
- **Maven** - 项目构建工具
- **Spring Boot Actuator** - 应用监控

### 前端技术
- **Vue 3.5.13** - 前端框架
- **Element Plus 2.10.1** - UI组件库
- **Vue Router 4.5.0** - 路由管理
- **Axios 1.11.0** - HTTP客户端
- **Vite 6.2.4** - 构建工具
- **Sass 1.89.1** - CSS预处理器

## 项目结构

```
EMS/
├── back/                           # 后端项目
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/
│   │       │   ├── BackendApplication.java    # 启动类
│   │       │   ├── controller/               # 控制器层
│   │       │   │   └── AdminController.java
│   │       │   ├── service/                  # 服务层
│   │       │   │   └── AdminService.java
│   │       │   ├── mapper/                   # 数据访问层
│   │       │   │   └── AdminMapper.java
│   │       │   ├── entity/                   # 实体类
│   │       │   │   └── Admin.java
│   │       │   ├── common/                   # 通用类
│   │       │   │   ├── Result.java           # 统一响应结果
│   │       │   │   └── CorsConfig.java       # 跨域配置
│   │       │   └── exception/                # 异常处理
│   │       │       ├── GlobalExceptionHandler.java
│   │       │       └── CustomerException.java
│   │       └── resources/
│   │           ├── application.yml           # 应用配置
│   │           └── mapper/                   # MyBatis映射文件
│   │               └── AdminMapper.xml
│   └── pom.xml                              # Maven配置
├── front/                          # 前端项目
│   ├── public/                     # 静态资源
│   │   ├── favicon.svg
│   │   └── employee_logo.svg
│   ├── src/
│   │   ├── App.vue                 # 根组件
│   │   ├── main.js                 # 入口文件
│   │   ├── router/                 # 路由配置
│   │   │   └── index.js
│   │   ├── utils/                  # 工具类
│   │   │   └── request.js          # HTTP请求封装
│   │   ├── assets/                 # 静态资源
│   │   │   ├── css/
│   │   │   │   ├── global.css      # 全局样式
│   │   │   │   └── index.scss      # Element Plus主题
│   │   │   └── imgs/
│   │   │       ├── admin_avatar.svg
│   │   │       └── employee_logo.svg
│   │   └── views/                  # 页面组件
│   │       ├── 404/
│   │       │   └── 404.vue
│   │       └── Manager/
│   │           ├── Manager.vue     # 管理系统主布局
│   │           ├── Home_Manager.vue # 管理系统首页
│   │           └── test.vue        # 测试页面
│   ├── index.html                  # HTML模板
│   ├── package.json                # 依赖配置
│   ├── vite.config.js              # Vite配置
│   └── jsconfig.json               # JavaScript配置
└── .gitignore                      # Git忽略文件
```

## 功能特性

### 已实现功能
- ✅ **管理员管理** - 管理员信息查询和管理
- ✅ **系统首页** - 数据概览和统计分析
- ✅ **响应式布局** - 适配不同屏幕尺寸
- ✅ **全局异常处理** - 统一的错误处理机制
- ✅ **跨域配置** - 支持前后端分离部署
- ✅ **统一响应格式** - 标准化的API响应结构

### 规划功能
- 🔄 **员工管理** - 员工信息增删改查
- 🔄 **小组管理** - 生产小组管理和工序安排
- 🔄 **考勤管理** - 员工签到、请假管理
- 🔄 **工资管理** - 工资计算和个税扣除
- 🔄 **生产统计** - 生产数据统计和分析
- 🔄 **权限管理** - 用户角色和权限控制

## 安装与运行

### 环境要求
- Java 21+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### 后端启动

1. 克隆项目到本地
```bash
git clone <repository-url>
cd EMS/back
```

2. 配置数据库
```sql
-- 创建数据库
CREATE DATABASE emp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建管理员表
USE emp;
CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    name VARCHAR(50)
);
```

3. 修改数据库配置
编辑 `src/main/resources/application.yml`，修改数据库连接信息：
```yaml
spring:
  datasource:
    username: your_username
    password: your_password
    url: jdbc:mysql://localhost:3306/emp
```

4. 启动后端服务
```bash
mvn spring-boot:run
```

后端服务将在 `http://localhost:8080` 启动

### 前端启动

1. 进入前端目录
```bash
cd EMS/front
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

前端应用将在 `http://localhost:5173` 启动

### 生产环境部署

1. 构建前端项目
```bash
cd front
npm run build
```

2. 打包后端项目
```bash
cd back
mvn clean package
```

## API接口

### 管理员接口

#### 查询所有管理员
- **URL**: `GET /admin/selectAll`
- **描述**: 获取所有管理员信息
- **响应格式**:
```json
{
  "code": "200",
  "msg": "success",
  "data": [
    {
      "id": 1,
      "username": "admin",
      "password": "******",
      "email": "admin@example.com",
      "phone": "13800138000",
      "name": "管理员"
    }
  ]
}
```

## 数据库设计

### admin表（管理员表）
| 字段名 | 类型 | 长度 | 是否为空 | 描述 |
|--------|------|------|----------|------|
| id | INT | - | NOT NULL | 主键，自增 |
| username | VARCHAR | 50 | NOT NULL | 用户名 |
| password | VARCHAR | 100 | NOT NULL | 密码 |
| email | VARCHAR | 100 | NULL | 邮箱 |
| phone | VARCHAR | 20 | NULL | 电话 |
| name | VARCHAR | 50 | NULL | 姓名 |

## 开发规范

### 后端开发规范
- 使用RESTful API设计风格
- 统一使用Result类封装响应结果
- 异常统一通过GlobalExceptionHandler处理
- 数据库字段命名使用下划线，Java实体类使用驼峰命名
- 所有接口都要有适当的日志记录

### 前端开发规范
- 使用Vue 3 Composition API
- 组件命名使用PascalCase
- 样式使用scoped避免污染
- 统一使用Element Plus组件库
- HTTP请求统一通过request.js封装

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- 项目维护者：[您的姓名]
- 邮箱：[您的邮箱]
- 项目地址：[GitHub仓库地址]

## 更新日志

### v0.1.0 (2024-01-XX)
- ✨ 初始版本发布
- ✨ 实现管理员基础功能
- ✨ 完成系统首页设计
- ✨ 建立前后端分离架构
- ✨ 配置开发环境和构建工具

---

**注意**: 本项目仍在开发中，部分功能可能尚未完全实现。如有问题或建议，欢迎提交Issue或Pull Request。
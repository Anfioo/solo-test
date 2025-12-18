<template>
  <div id="app">
    <!-- 导航栏 -->
    <header class="navbar" :class="{ scrolled: isScrolled }">
      <div class="nav-container">
        <div class="logo">
          <router-link to="/">高端品牌</router-link>
        </div>
        <nav class="nav-menu">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link to="/products" class="nav-item">产品</router-link>
          <router-link to="/solutions" class="nav-item">解决方案</router-link>
          <router-link to="/about" class="nav-item">品牌故事</router-link>
          <router-link to="/news" class="nav-item">资讯</router-link>
          <router-link to="/support" class="nav-item">售后服务</router-link>
        </nav>
        <div class="nav-actions">
          <button class="nav-btn">预约体验</button>
        </div>
      </div>
    </header>
    
    <!-- 主内容区 -->
    <main class="main-content">
      <router-view />
    </main>
    
    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3>产品</h3>
          <ul>
            <li><router-link to="/products">手机</router-link></li>
            <li><router-link to="/products">平板</router-link></li>
            <li><router-link to="/products">耳机</router-link></li>
            <li><router-link to="/products">配件</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>解决方案</h3>
          <ul>
            <li><router-link to="/solutions">办公</router-link></li>
            <li><router-link to="/solutions">娱乐</router-link></li>
            <li><router-link to="/solutions">运动</router-link></li>
            <li><router-link to="/solutions">智能家居</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>关于我们</h3>
          <ul>
            <li><router-link to="/about">品牌历程</router-link></li>
            <li><router-link to="/about">品牌理念</router-link></li>
            <li><router-link to="/about">研发实力</router-link></li>
            <li><router-link to="/news">最新资讯</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>售后服务</h3>
          <ul>
            <li><router-link to="/support">服务说明</router-link></li>
            <li><router-link to="/support">常见问题</router-link></li>
            <li><router-link to="/support">服务网点</router-link></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 高端品牌. 保留所有权利.</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  data() {
    return {
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>

<style>


/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: transparent;
}

.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
}

.logo a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar.scrolled .logo a {
  color: #333;
}

.nav-menu {
  display: flex;
  gap: 40px;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.navbar.scrolled .nav-item {
  color: #333;
}

.nav-item:hover {
  color: #007bff;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  transition: width 0.3s ease;
}

.nav-item:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  gap: 15px;
}

.nav-btn {
  padding: 10px 25px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.navbar.scrolled .nav-btn {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.nav-btn:hover {
  background-color: white;
  color: #333;
  transform: translateY(-2px);
}

.navbar.scrolled .nav-btn:hover {
  background-color: #0056b3;
  border-color: #0056b3;
  color: white;
}

/* 主内容区 */
.main-content {
  margin-top: 80px;
  min-height: calc(100vh - 80px);
}

/* 页脚样式 */
.footer {
  background-color: #f8f9fa;
  padding: 60px 0 20px;
  margin-top: 100px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 12px;
}

.footer-section ul li a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-section ul li a:hover {
  color: #007bff;
}

.footer-bottom {
  max-width: 1400px;
  margin: 40px auto 0;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #e0e0e0;
  color: #999;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .nav-menu {
    gap: 20px;
  }
  
  .nav-item {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .nav-actions {
    display: none;
  }
  
  .nav-container {
    padding: 0 15px;
  }
}
</style>
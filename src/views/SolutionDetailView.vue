<template>
  <div class="solution-detail">
    <!-- 解决方案头部 -->
    <section class="solution-header">
      <div class="section-container">
        <h1 class="solution-title">{{ currentSolution.name }}</h1>
        <p class="solution-description">{{ currentSolution.description }}</p>
      </div>
    </section>
    
    <!-- 解决方案视频 -->
    <section class="solution-video-section">
      <div class="section-container">
        <div class="video-wrapper">
          <video 
            ref="videoRef"
            :src="currentSolution.video" 
            :poster="currentSolution.image" 
            autoplay 
            muted 
            loop 
            playsinline
          ></video>
        </div>
      </div>
    </section>
    
    <!-- 解决方案详情内容 -->
    <section class="solution-content">
      <div class="section-container">
        <!-- 适用场景描述 -->
        <div class="content-block">
          <h2 class="block-title">适用场景</h2>
          <div class="scene-description">
            <p>{{ currentSolution.sceneDescription }}</p>
          </div>
        </div>
        
        <!-- 核心产品清单 -->
        <div class="content-block">
          <h2 class="block-title">核心产品清单</h2>
          <div class="product-list">
            <div 
              v-for="product in currentSolution.coreProducts" 
              :key="product.id"
              class="product-item"
              @click="goToProductDetail(product.id)"
            >
              <div class="product-image">
                <img :src="product.image" :alt="product.name" />
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-tagline">{{ product.tagline }}</p>
                <p class="product-price">{{ product.price }}</p>
              </div>
              <div class="view-product-btn">查看产品</div>
            </div>
          </div>
        </div>
        
        <!-- 应用案例 -->
        <div class="content-block">
          <h2 class="block-title">应用案例</h2>
          <div class="case-study">
            <div class="case-image">
              <img :src="currentSolution.caseImage" :alt="currentSolution.name + ' 应用案例'" />
            </div>
            <div class="case-content">
              <h3 class="case-title">{{ currentSolution.caseTitle }}</h3>
              <p class="case-description">{{ currentSolution.caseDescription }}</p>
              <div class="case-results">
                <h4>实施效果</h4>
                <ul>
                  <li v-for="(result, index) in currentSolution.caseResults" :key="index">{{ result }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SolutionDetailView',
  data() {
    return {
      // 当前解决方案ID
      solutionId: 1,
      
      // 解决方案数据
      currentSolution: {
        id: 1,
        name: '智能办公解决方案',
        description: '为现代办公环境打造的智能解决方案，让工作更高效、更便捷',
        image: 'https://picsum.photos/id/81/800/500',
        video: '/src/assets/videos/solution1.mp4',
        sceneDescription: '适用于现代办公环境，包括小型创业公司、大型企业办公室、远程办公人员等。无论是日常文档处理、视频会议、还是团队协作，都能提供高效、便捷的解决方案。',
        coreProducts: [
          {
            id: 2,
            name: '智能平板 Air',
            tagline: '轻办公，随享生活',
            price: '¥5,999',
            image: 'https://picsum.photos/id/82/300/300'
          },
          {
            id: 3,
            name: '无线耳机 Max',
            tagline: '沉浸式音效，舒适佩戴',
            price: '¥2,999',
            image: 'https://picsum.photos/id/83/300/300'
          },
          {
            id: 6,
            name: '智能音箱 Mini',
            tagline: '智能语音，便捷生活',
            price: '¥399',
            image: 'https://picsum.photos/id/84/300/300'
          },
          {
            id: 12,
            name: '蓝牙键盘 Slim',
            tagline: '轻薄便携，高效输入',
            price: '¥699',
            image: 'https://picsum.photos/id/85/300/300'
          }
        ],
        caseTitle: '某科技公司智能办公改造',
        caseImage: 'https://picsum.photos/id/86/600/400',
        caseDescription: '某科技公司为提升员工工作效率，引入了我们的智能办公解决方案。通过智能平板、无线耳机、智能音箱等设备的协同工作，实现了办公流程的简化和效率的提升。',
        caseResults: [
          '员工工作效率提升30%',
          '会议准备时间减少50%',
          '设备管理成本降低20%',
          '员工满意度提升40%'
        ]
      }
    }
  },
  mounted() {
    // 获取解决方案ID
    const id = this.$route.params.id
    if (id) {
      this.solutionId = parseInt(id)
      this.loadSolutionData()
    }
  },
  methods: {
    // 加载解决方案数据
    loadSolutionData() {
      // 这里可以根据解决方案ID从静态数据中获取解决方案信息
      // 由于是演示，我们使用默认解决方案数据
      console.log('加载解决方案ID:', this.solutionId)
    },
    
    // 跳转到产品详情页
    goToProductDetail(productId) {
      this.$router.push(`/product/${productId}`)
    }
  }
}
</script>

<style scoped>
/* 解决方案详情页基础样式 */
.solution-detail {
  background-color: white;
}

/* 解决方案头部 */
.solution-header {
  padding: 80px 0;
  background-color: #f8f9fa;
  text-align: center;
}

.solution-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

.solution-description {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.5;
}

/* 解决方案视频 */
.solution-video-section {
  background-color: #000;
  padding: 0;
}

.video-wrapper {
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 解决方案详情内容 */
.solution-content {
  padding: 80px 0;
  background-color: white;
}

.content-block {
  margin-bottom: 80px;
}

.block-title {
  font-size: 2rem;
  margin-bottom: 40px;
  color: #333;
  position: relative;
  padding-bottom: 15px;
}

.block-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  border-radius: 2px;
}

/* 适用场景描述 */
.scene-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  max-width: 1000px;
}

/* 核心产品清单 */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.product-item {
  background-color: #f8f9fa;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 200px;
  overflow: hidden;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.product-image img {
  max-width: 100%;
  max-height: 160px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-item:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 30px;
  flex: 1;
}

.product-name {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #333;
}

.product-tagline {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.4;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}

.view-product-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0;
  transition: all 0.3s ease;
  transform: translateY(-10px);
}

.product-item:hover .view-product-btn {
  opacity: 1;
  transform: translateY(0);
}

/* 应用案例 */
.case-study {
  display: flex;
  gap: 50px;
  align-items: center;
}

.case-image {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.case-image:hover {
  transform: scale(1.02);
}

.case-image img {
  width: 100%;
  height: auto;
  display: block;
}

.case-content {
  flex: 1;
}

.case-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.case-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 30px;
}

.case-results {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 15px;
}

.case-results h4 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #333;
}

.case-results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.case-results li {
  padding: 10px 0;
  font-size: 1rem;
  color: #666;
  position: relative;
  padding-left: 25px;
  line-height: 1.5;
}

.case-results li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #007bff;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .solution-header {
    padding: 60px 20px;
  }
  
  .solution-title {
    font-size: 2rem;
  }
  
  .video-wrapper {
    height: 400px;
  }
  
  .solution-content {
    padding: 60px 20px;
  }
  
  .case-study {
    flex-direction: column;
    gap: 40px;
  }
  
  .case-image {
    width: 100%;
  }
  
  .case-content {
    width: 100%;
  }
  
  .product-list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .solution-title {
    font-size: 1.8rem;
  }
  
  .solution-description {
    font-size: 1rem;
  }
  
  .video-wrapper {
    height: 300px;
  }
  
  .block-title {
    font-size: 1.5rem;
  }
  
  .content-block {
    margin-bottom: 60px;
  }
  
  .product-list {
    grid-template-columns: 1fr;
  }
  
  .product-item {
    margin-bottom: 20px;
  }
  
  .case-title {
    font-size: 1.5rem;
  }
  
  .case-description {
    font-size: 1rem;
  }
}
</style>
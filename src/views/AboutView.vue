<template>
  <div class="about-view">
    <!-- 品牌故事头部 -->
    <section class="about-header">
      <div class="section-container">
        <h1 class="section-title">品牌故事</h1>
        <p class="section-subtitle">探索我们的品牌历程、设计理念和研发实力</p>
      </div>
    </section>
    
    <!-- 品牌历程时间轴 -->
    <section class="timeline-section">
      <div class="section-container">
        <h2 class="section-title">品牌历程</h2>
        <div class="timeline-wrapper" ref="timelineRef">
          <div class="timeline-line"></div>
          <div class="timeline-items">
            <div 
              v-for="(item, index) in timelineItems" 
              :key="index"
              class="timeline-item"
              :ref="el => timelineItemRefs[index] = el"
              :class="{ active: activeTimelineIndex === index }"
              @click="setActiveTimeline(index)"
            >
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3 class="timeline-year">{{ item.year }}</h3>
                <h4 class="timeline-title">{{ item.title }}</h4>
                <p class="timeline-description">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 时间轴详情内容 -->
        <div class="timeline-detail">
          <div 
            v-for="(item, index) in timelineItems" 
            :key="index"
            class="detail-content"
            :class="{ active: activeTimelineIndex === index }"
          >
            <div class="detail-media">
              <img 
                v-if="item.mediaType === 'image'" 
                :src="item.mediaUrl" 
                :alt="item.title" 
              />
              <video 
                v-else 
                :src="item.mediaUrl" 
                autoplay 
                muted 
                loop 
                playsinline
              ></video>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 品牌理念 -->
    <section class="philosophy-section">
      <div class="section-container">
        <h2 class="section-title">品牌理念</h2>
        <div class="philosophy-content">
          <div class="philosophy-text">
            <div class="philosophy-item">
              <h3 class="philosophy-title" ref="philosophyTitleRef">设计理念</h3>
              <p class="philosophy-description" ref="philosophyDescRef">
                我们坚信，优秀的设计应该是美学与功能的完美结合。每一款产品都经过精心设计，旨在为用户带来优雅、直观的使用体验。我们注重细节，追求简约而不简单的设计风格，让科技与生活自然融合。
              </p>
            </div>
            <div class="philosophy-item">
              <h3 class="philosophy-title">研发价值观</h3>
              <p class="philosophy-description">
                创新是我们的核心驱动力。我们不断探索前沿技术，致力于将最先进的科技成果转化为实用的产品。我们坚持以用户需求为导向，通过持续的研发投入，为用户创造更美好的生活体验。
              </p>
            </div>
          </div>
          <div class="philosophy-image">
            <img src="https://picsum.photos/id/61/500/500" alt="品牌理念" />
          </div>
        </div>
      </div>
    </section>
    
    <!-- 研发实力 -->
    <section class="research-section">
      <div class="section-container">
        <h2 class="section-title">研发实力</h2>
        <div class="research-content">
          <div class="research-item">
            <div class="research-image">
              <img src="https://picsum.photos/id/62/600/400" alt="研发中心" />
            </div>
            <h3 class="research-title">现代化研发中心</h3>
            <p class="research-description">
              我们拥有世界一流的研发中心，配备先进的研发设备和测试实验室。来自全球各地的顶尖工程师和设计师在这里合作创新，推动技术进步。
            </p>
          </div>
          <div class="research-item">
            <div class="research-image">
              <img src="https://picsum.photos/id/63/600/400" alt="核心技术" />
            </div>
            <h3 class="research-title">核心技术</h3>
            <p class="research-description">
              我们在芯片设计、声学技术、显示技术等领域拥有多项核心专利。这些技术优势使我们能够推出具有竞争力的产品，引领行业发展潮流。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutView',
  data() {
    return {
      // 品牌历程时间轴数据
      timelineItems: [
        {
          id: 1,
          year: '2015',
          title: '品牌成立',
          description: '公司正式成立，确立了以创新为核心的发展理念',
          mediaType: 'image',
          mediaUrl: 'https://picsum.photos/id/51/800/500'
        },
        {
          id: 2,
          year: '2017',
          title: '首款产品发布',
          description: '推出首款智能设备，获得市场广泛认可',
          mediaType: 'image',
          mediaUrl: 'https://picsum.photos/id/52/800/500'
        },
        {
          id: 3,
          year: '2019',
          title: '研发中心扩建',
          description: '建立现代化研发中心，加强技术研发实力',
          mediaType: 'image',
          mediaUrl: 'https://picsum.photos/id/53/800/500'
        },
        {
          id: 4,
          year: '2021',
          title: '全球化战略',
          description: '开始全球化布局，产品进入多个国家和地区',
          mediaType: 'image',
          mediaUrl: 'https://picsum.photos/id/54/800/500'
        },
        {
          id: 5,
          year: '2023',
          title: '技术突破',
          description: '在核心技术领域取得重大突破，获得多项专利',
          mediaType: 'image',
          mediaUrl: 'https://picsum.photos/id/55/800/500'
        },
        {
          id: 6,
          year: '2025',
          title: '持续创新',
          description: '不断推出创新产品，引领行业发展潮流',
          mediaType: 'image',
          mediaUrl: 'https://picsum.photos/id/56/800/500'
        }
      ],
      
      // 时间轴当前激活项
      activeTimelineIndex: 0,
      
      // 元素引用
      timelineRef: null,
      timelineItemRefs: [],
      philosophyTitleRef: null,
      philosophyDescRef: null,
      
      // 滚动监听
      scrollListener: null
    }
  },
  mounted() {
    // 初始化滚动监听
    this.scrollListener = window.addEventListener('scroll', this.handleScroll)
    
    // 初始化品牌理念动画
    this.initPhilosophyAnimation()
  },
  beforeUnmount() {
    // 清理滚动监听
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    // 处理滚动事件
    handleScroll() {
      this.checkTimelineVisibility()
      this.checkPhilosophyVisibility()
    },
    
    // 检查时间轴项目可见性
    checkTimelineVisibility() {
      const scrollPosition = window.scrollY + window.innerHeight
      
      this.timelineItemRefs.forEach((ref, index) => {
        if (ref) {
          const elementTop = ref.offsetTop
          const elementBottom = elementTop + ref.offsetHeight
          
          if (scrollPosition > elementTop + 100 && scrollPosition < elementBottom + 100) {
            this.setActiveTimeline(index)
          }
        }
      })
    },
    
    // 设置激活的时间轴项目
    setActiveTimeline(index) {
      this.activeTimelineIndex = index
    },
    
    // 检查品牌理念区域可见性
    checkPhilosophyVisibility() {
      const scrollPosition = window.scrollY + window.innerHeight
      
      if (this.philosophyTitleRef) {
        const elementTop = this.philosophyTitleRef.offsetTop
        if (scrollPosition > elementTop + 100) {
          this.philosophyTitleRef.classList.add('animated')
        }
      }
      
      if (this.philosophyDescRef) {
        const elementTop = this.philosophyDescRef.offsetTop
        if (scrollPosition > elementTop + 100) {
          this.philosophyDescRef.classList.add('animated')
        }
      }
    },
    
    // 初始化品牌理念动画
    initPhilosophyAnimation() {
      // 添加文字渐变浮现动画
      if (this.philosophyTitleRef) {
        this.philosophyTitleRef.style.opacity = '0'
        this.philosophyTitleRef.style.transform = 'translateY(20px)'
        this.philosophyTitleRef.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      }
      
      if (this.philosophyDescRef) {
        this.philosophyDescRef.style.opacity = '0'
        this.philosophyDescRef.style.transform = 'translateY(20px)'
        this.philosophyDescRef.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
      }
    }
  }
}
</script>

<style scoped>
/* 品牌故事页面基础样式 */
.about-view {
  background-color: white;
}

/* 品牌故事头部 */
.about-header {
  padding: 80px 0;
  background-color: #f8f9fa;
  text-align: center;
}

.about-header .section-title {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
}

.about-header .section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.5;
}

/* 品牌历程时间轴 */
.timeline-section {
  padding: 80px 0;
  background-color: white;
}

.timeline-wrapper {
  position: relative;
  margin-bottom: 60px;
}

.timeline-line {
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 50px;
  width: 3px;
  background: linear-gradient(to bottom, #007bff, #00d4ff);
  transform: translateX(-50%);
}

.timeline-items {
  position: relative;
  margin-left: 40px;
}

.timeline-item {
  margin-bottom: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding-left: 30px;
  position: relative;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item:hover {
  transform: translateX(10px);
}

.timeline-dot {
  position: absolute;
  left: -40px;
  top: 15px;
  width: 20px;
  height: 20px;
  background-color: white;
  border: 4px solid #007bff;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 10;
}

.timeline-item.active .timeline-dot {
  background-color: #007bff;
  transform: scale(1.3);
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.5);
}

.timeline-content {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.timeline-item.active .timeline-content {
  background-color: #007bff;
  color: white;
  transform: translateX(10px);
  box-shadow: 0 15px 35px rgba(0, 123, 255, 0.3);
}

.timeline-year {
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-weight: bold;
}

.timeline-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.timeline-description {
  font-size: 1rem;
  line-height: 1.6;
}

/* 时间轴详情内容 */
.timeline-detail {
  position: relative;
  height: 500px;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.detail-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.detail-content.active {
  opacity: 1;
}

.detail-media {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.detail-media img,
.detail-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 品牌理念 */
.philosophy-section {
  padding: 80px 0;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.philosophy-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.05), rgba(0, 212, 255, 0.05));
  z-index: 0;
}

.philosophy-content {
  display: flex;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.philosophy-text {
  flex: 1;
}

.philosophy-item {
  margin-bottom: 50px;
}

.philosophy-title {
  font-size: 2rem;
  margin-bottom: 25px;
  color: #333;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
}

.philosophy-title.animated {
  animation: fadeInUp 0.8s ease forwards;
}

.philosophy-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  opacity: 0;
  transform: translateY(20px);
}

.philosophy-description.animated {
  animation: fadeInUp 0.8s ease 0.2s forwards;
}

.philosophy-image {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.philosophy-image:hover {
  transform: scale(1.02);
}

.philosophy-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* 研发实力 */
.research-section {
  padding: 80px 0;
  background-color: white;
}

.research-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 50px;
  margin-top: 60px;
}

.research-item {
  background-color: #f8f9fa;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.research-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.research-image {
  height: 300px;
  overflow: hidden;
}

.research-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.research-item:hover .research-image img {
  transform: scale(1.05);
}

.research-title {
  font-size: 1.5rem;
  margin: 30px;
  color: #333;
}

.research-description {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #666;
  margin: 0 30px 30px;
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .about-header {
    padding: 60px 20px;
  }
  
  .about-header .section-title {
    font-size: 2.5rem;
  }
  
  .timeline-section {
    padding: 60px 20px;
  }
  
  .timeline-detail {
    height: 400px;
  }
  
  .philosophy-section {
    padding: 60px 20px;
  }
  
  .philosophy-content {
    flex-direction: column;
    gap: 40px;
  }
  
  .philosophy-text,
  .philosophy-image {
    width: 100%;
  }
  
  .research-section {
    padding: 60px 20px;
  }
  
  .research-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .research-item {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .about-header .section-title {
    font-size: 2rem;
  }
  
  .about-header .section-subtitle {
    font-size: 1.1rem;
  }
  
  .timeline-items {
    margin-left: 30px;
  }
  
  .timeline-line {
    left: 15px;
  }
  
  .timeline-dot {
    left: -30px;
  }
  
  .timeline-content {
    padding: 20px;
  }
  
  .timeline-year {
    font-size: 1.5rem;
  }
  
  .timeline-detail {
    height: 300px;
  }
  
  .philosophy-title {
    font-size: 1.8rem;
  }
  
  .research-image {
    height: 250px;
  }
}
</style>

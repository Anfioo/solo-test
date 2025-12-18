<template>
  <div class="home">
    <!-- Hero轮播区 -->
    <section class="hero-section">
      <div class="hero-carousel" ref="carouselRef">
        <div 
          v-for="(item, index) in carouselItems" 
          :key="index"
          class="hero-item"
          :class="{ active: currentIndex === index }"
          @click="goToItem(item.link)"
        >
          <img 
            v-if="item.type === 'image'" 
            :src="item.url" 
            :alt="item.title"
            class="hero-media"
          >
          <video 
            v-else 
            :src="item.url" 
            autoplay 
            muted 
            loop 
            class="hero-media"
          ></video>
          <div class="hero-content">
            <h1>{{ item.title }}</h1>
            <p>{{ item.subtitle }}</p>
            <button class="hero-btn">{{ item.buttonText }}</button>
          </div>
        </div>
      </div>
      <div class="carousel-controls">
        <button class="control-btn prev" @click="prevSlide">&lt;</button>
        <button class="control-btn next" @click="nextSlide">&gt;</button>
      </div>
      <div class="carousel-indicators">
        <span 
            v-for="(_, index) in carouselItems" 
            :key="index"
            class="indicator"
            :class="{ active: currentIndex === index }"
            @click="goToSlide(index)"
          ></span>
      </div>
    </section>
    
    <!-- 品牌亮点区 -->
    <section class="brand-highlights" ref="highlightsRef">
      <div class="section-container">
        <h2 class="section-title">品牌核心价值</h2>
        <div class="highlights-grid">
          <div 
            v-for="(highlight, index) in brandHighlights" 
            :key="index"
            class="highlight-item"
            :ref="el => highlightRefs[index] = el"
            :class="{ animated: isHighlightVisible[index] }"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="highlight-icon">
              <img :src="highlight.icon" :alt="highlight.title" />
            </div>
            <h3>{{ highlight.title }}</h3>
            <p>{{ highlight.description }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 产品推荐区 -->
    <section class="products-section">
      <div class="section-container">
        <h2 class="section-title">核心产品推荐</h2>
        <div class="products-grid">
          <div 
            v-for="product in recommendedProducts" 
            :key="product.id"
            class="product-card"
            @click="goToProductDetail(product.id)"
          >
            <div class="card-inner">
              <div class="card-front">
                <div class="product-image">
                  <img :src="product.image" :alt="product.name" />
                </div>
                <div class="product-info">
                  <h3>{{ product.name }}</h3>
                  <p class="product-tagline">{{ product.tagline }}</p>
                  <p class="product-price">{{ product.price }}</p>
                </div>
              </div>
              <div class="card-back">
                <h3>{{ product.name }}</h3>
                <ul class="product-features">
                  <li v-for="(feature, index) in product.features" :key="index">{{ feature }}</li>
                </ul>
                <button class="view-detail-btn">查看详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 最新活动/资讯区 -->
    <section class="news-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">最新资讯</h2>
          <button class="more-btn" @click="goToNewsList">查看更多 <span>&gt;</span></button>
        </div>
        <div class="news-grid">
          <div 
            v-for="news in latestNews" 
            :key="news.id"
            class="news-card"
          >
            <div class="news-image">
              <img :src="news.image" :alt="news.title" />
            </div>
            <div class="news-content">
              <div class="news-meta">
                <span class="news-date">{{ news.date }}</span>
                <span class="news-category">{{ news.category }}</span>
              </div>
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-excerpt">{{ news.excerpt }}</p>
              <button class="news-detail-btn" @click="goToNewsDetail(news.id)">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 用户评价区 -->
    <section class="testimonials-section">
      <div class="section-container">
        <h2 class="section-title">用户评价</h2>
        <div class="testimonials-carousel" ref="testimonialsRef" @mouseenter="pauseTestimonialAutoPlay" @mouseleave="startTestimonialAutoPlay">
          <div class="testimonials-wrapper" :style="{ transform: `translateX(-${testimonialCurrentIndex * 100}%)` }">
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="testimonial-item"
            >
              <div class="testimonial-card">
                <div class="testimonial-header">
                  <div class="user-info">
                    <img :src="testimonial.avatar" :alt="testimonial.name" class="user-avatar" />
                    <div class="user-details">
                      <h3 class="user-name">{{ testimonial.name }}</h3>
                      <div class="user-rating">
                        <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= testimonial.rating }"></span>
                      </div>
                    </div>
                  </div>
                  <div class="testimonial-scene">
                    <img :src="testimonial.sceneImage" :alt="testimonial.name + '的使用场景'" class="scene-image" />
                  </div>
                </div>
                <p class="testimonial-content">{{ testimonial.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="testimonial-controls">
          <button class="control-btn prev" @click="prevTestimonial">&lt;</button>
          <button class="control-btn next" @click="nextTestimonial">&gt;</button>
        </div>
        <div class="testimonial-indicators">
          <span 
            v-for="(_, index) in testimonials" 
            :key="index"
            class="indicator"
            :class="{ active: testimonialCurrentIndex === index }"
            @click="goToTestimonial(index)"
          ></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import type { ComponentPublicInstance } from 'vue'

export default {
  name: 'HomeView',
  data() {
    return {
      carouselItems: [
        {
          type: 'image',
          url: 'https://picsum.photos/id/1001/1920/1080',
          title: '创新科技，引领未来',
          subtitle: '探索我们的最新产品系列',
          buttonText: '了解更多',
          link: '/products'
        },
        {
          type: 'video',
          url: '/src/assets/videos/hero2.mp4',
          title: '设计美学，极致体验',
          subtitle: '每一个细节都精心雕琢',
          buttonText: '探索设计',
          link: '/about'
        },
        {
          type: 'image',
          url: 'https://picsum.photos/id/1003/1920/1080',
          title: '强大性能，无限可能',
          subtitle: '突破技术边界，释放潜能',
          buttonText: '查看性能',
          link: '/products/1'
        }
      ],
      currentIndex: 0,
      carouselInterval: null as number | null,
      // 品牌亮点数据
      brandHighlights: [
        {
          icon: 'https://picsum.photos/id/101/80/80',
          title: '技术创新',
          description: '不断突破技术边界，引领行业发展潮流，为用户带来前所未有的使用体验。'
        },
        {
          icon: 'https://picsum.photos/id/102/80/80',
          title: '设计理念',
          description: '融合美学与功能，打造简约而不简单的产品设计，彰显高端品牌气质。'
        },
        {
          icon: 'https://picsum.photos/id/103/80/80',
          title: '品质工艺',
          description: '精益求精的制造工艺，严格的质量控制，确保每一件产品都完美无瑕。'
        }
      ],
      // 产品推荐数据
      recommendedProducts: [
        {
          id: 1,
          name: '旗舰手机 Pro',
          tagline: '突破性性能，极致体验',
          price: '¥9,999',
          image: 'https://picsum.photos/id/11/300/300',
          features: [
            '最新处理器，性能提升50%',
            '超视网膜屏幕，色彩还原真实',
            '5000万像素主摄，夜拍更清晰',
            '48小时超长续航'
          ]
        },
        {
          id: 2,
          name: '智能平板 Air',
          tagline: '轻办公，随享生活',
          price: '¥5,999',
          image: 'https://picsum.photos/id/12/300/300',
          features: [
            '12.9英寸全面屏',
            '支持手写笔，精准输入',
            '前置1200万像素超广角',
            '轻薄设计，仅重471g'
          ]
        },
        {
          id: 3,
          name: '无线耳机 Max',
          tagline: '沉浸式音效，舒适佩戴',
          price: '¥2,999',
          image: 'https://picsum.photos/id/13/300/300',
          features: [
            '主动降噪，隔绝外界干扰',
            '高保真音质，还原音乐细节',
            '30小时超长续航',
            '自适应佩戴检测'
          ]
        },
        {
          id: 4,
          name: '智能手表 Ultra',
          tagline: '健康管理，运动伴侣',
          price: '¥3,999',
          image: 'https://picsum.photos/id/14/300/300',
          features: [
            '全方位健康监测',
            '支持100+运动模式',
            '50米防水深度',
            '14天超长续航'
          ]
        }
      ],
      // 最新资讯数据
      latestNews: [
        {
          id: 1,
          title: '新品发布会：开启智能生活新篇章',
          excerpt: '我们将于10月15日举行年度新品发布会，届时将推出多款革命性产品，重新定义智能生活体验。',
          date: '2025-10-01',
          category: '品牌活动',
          image: 'https://picsum.photos/id/21/400/250'
        },
        {
          id: 2,
          title: '荣获2025年度设计大奖',
          excerpt: '我们的旗舰手机凭借卓越的设计理念和创新技术，荣获国际设计大奖，成为行业标杆。',
          date: '2025-09-20',
          category: '品牌荣誉',
          image: 'https://picsum.photos/id/22/400/250'
        },
        {
          id: 3,
          title: '技术创新：引领5G时代新潮流',
          excerpt: '我们在5G技术领域取得重大突破，推出全新的通信解决方案，为用户带来更快、更稳定的连接体验。',
          date: '2025-09-10',
          category: '技术资讯',
          image: 'https://picsum.photos/id/23/400/250'
        }
      ],
      // 用户评价数据
      testimonials: [
        {
          id: 1,
          name: '张小明',
          avatar: 'https://picsum.photos/id/31/60/60',
          rating: 5,
          content: '这款旗舰手机的性能真的惊艳到我了，运行大型游戏毫无压力，拍照效果也非常出色，特别是夜景模式，拍出来的照片简直可以和专业相机媲美。',
          sceneImage: 'https://picsum.photos/id/32/120/120'
        },
        {
          id: 2,
          name: '李小红',
          avatar: 'https://picsum.photos/id/33/60/60',
          rating: 4,
          content: '智能平板的设计非常轻薄，携带很方便，手写笔的体验也很棒，用来记笔记和绘画都非常流畅，电池续航也很满意。',
          sceneImage: 'https://picsum.photos/id/34/120/120'
        },
        {
          id: 3,
          name: '王大伟',
          avatar: 'https://picsum.photos/id/35/60/60',
          rating: 5,
          content: '无线耳机的降噪效果真的太好了，在嘈杂的地铁上也能享受纯净的音乐，佩戴也很舒适，长时间佩戴也不会觉得耳朵疼。',
          sceneImage: 'https://picsum.photos/id/36/120/120'
        },
        {
          id: 4,
          name: '陈小花',
          avatar: 'https://picsum.photos/id/37/60/60',
          rating: 4,
          content: '智能手表的健康监测功能很实用，能够实时监测心率和睡眠质量，运动模式也很丰富，帮助我更好地管理健康。',
          sceneImage: 'https://picsum.photos/id/38/120/120'
        },
        {
          id: 5,
          name: '刘小强',
          avatar: 'https://picsum.photos/id/39/60/60',
          rating: 5,
          content: '整体产品体验非常好，品牌的设计理念和品质工艺都体现出高端水准，客服服务也很贴心，是一次满意的购物体验。',
          sceneImage: 'https://picsum.photos/id/40/120/120'
        }
      ],
      testimonialCurrentIndex: 0,
      testimonialInterval: null as number | null,
      highlightRefs: [] as (HTMLElement | null | ComponentPublicInstance)[],
      isHighlightVisible: [false, false, false],
      scrollListener: null as null
    }
  },
  mounted() {
    this.startAutoPlay()
    this.startTestimonialAutoPlay()
    window.addEventListener('scroll', this.handleScroll)
    this.checkHighlightVisibility()
  },
  beforeUnmount() {
    this.stopAutoPlay()
    this.pauseTestimonialAutoPlay()
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    startAutoPlay() {
      this.carouselInterval = window.setInterval(() => {
        this.nextSlide()
      }, 3000)
    },
    stopAutoPlay() {
      if (this.carouselInterval) {
        clearInterval(this.carouselInterval)
        this.carouselInterval = null
      }
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length
    },
    goToSlide(index: number) {
      this.currentIndex = index
    },
    goToItem(link: string) {
      this.$router.push(link)
    },
    handleScroll() {
      this.checkHighlightVisibility()
    },
    checkHighlightVisibility() {
      const scrollPosition = window.scrollY + window.innerHeight
      
      // 使用querySelectorAll获取元素引用，避免ref类型问题
      const elements = document.querySelectorAll('.highlight-item')
      elements.forEach((el, index) => {
        const element = el as HTMLElement
        const elementTop = element.offsetTop
        const elementBottom = elementTop + element.offsetHeight
        
        if (scrollPosition > elementTop + 100 && scrollPosition < elementBottom + 100) {
          // 直接修改数组元素，无需使用this.$set
          this.isHighlightVisible[index] = true
          element.classList.add('animated')
        }
      })
    },
    goToProductDetail(productId: number) {
      this.$router.push(`/product/${productId}`)
    },
    goToNewsList() {
      this.$router.push('/news')
    },
    goToNewsDetail(newsId: number) {
      this.$router.push(`/news/${newsId}`)
    },
    // 用户评价轮播控制方法
    startTestimonialAutoPlay() {
      this.testimonialInterval = window.setInterval(() => {
        this.nextTestimonial()
      }, 3000)
    },
    pauseTestimonialAutoPlay() {
      if (this.testimonialInterval) {
        clearInterval(this.testimonialInterval)
        this.testimonialInterval = null
      }
    },
    nextTestimonial() {
      this.testimonialCurrentIndex = (this.testimonialCurrentIndex + 1) % this.testimonials.length
    },
    prevTestimonial() {
      this.testimonialCurrentIndex = (this.testimonialCurrentIndex - 1 + this.testimonials.length) % this.testimonials.length
    },
    goToTestimonial(index: number) {
      this.testimonialCurrentIndex = index
    }
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.hero-carousel {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-item.active {
  opacity: 1;
  transform: translateX(0);
  z-index: 10;
}

.hero-item:not(.active) {
  transform: translateX(100%);
}

.hero-item.active + .hero-item {
  transform: translateX(100%);
}

.hero-media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-content {
  position: relative;
  z-index: 20;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 20px;
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: fadeInUp 0.8s ease;
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 30px;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.hero-btn {
  padding: 15px 40px;
  font-size: 1.2rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.hero-btn:hover {
  background-color: white;
  color: #333;
  transform: translateY(-3px);
}

.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 20px;
}

.control-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}

.carousel-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  display: flex;
  gap: 15px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: white;
  width: 40px;
  border-radius: 6px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    font-size: 1.2rem;
  }
  
  .hero-btn {
    padding: 12px 30px;
    font-size: 1rem;
  }
}

/* 品牌亮点区样式 */
.brand-highlights {
  padding: 100px 0;
  background-color: #f8f9fa;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  color: #333;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  border-radius: 2px;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  align-items: stretch;
}

.highlight-item {
  background-color: white;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.highlight-item.animated {
  animation: fadeInUp 0.8s ease forwards;
}

.highlight-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.highlight-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  background-color: #f0f4f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.highlight-item:hover .highlight-icon {
  background-color: #e3f2fd;
  transform: scale(1.1);
}

.highlight-icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.highlight-item h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.highlight-item p {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .brand-highlights {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  .highlights-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .highlight-item {
    padding: 30px 20px;
  }
}

/* 产品推荐区样式 */
.products-section {
  padding: 100px 0;
  background-color: white;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.product-card {
  perspective: 1000px;
  cursor: pointer;
  height: 450px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

.product-card:hover .card-inner {
  transform: rotateY(10deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-front {
  background-color: white;
  color: #333;
}

.card-back {
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: white;
  transform: rotateY(180deg);
  padding: 40px 20px;
}

.product-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.product-image img {
  max-width: 80%;
  max-height: 200px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  text-align: center;
}

.product-info h3 {
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

.product-features {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: left;
}

.product-features li {
  padding: 8px 0;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
}

.product-features li::before {
  content: '✓';
  margin-right: 10px;
  font-weight: bold;
  color: #4CAF50;
}

.view-detail-btn {
  padding: 12px 30px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  margin-top: auto;
}

.view-detail-btn:hover {
  background-color: white;
  color: #007bff;
  transform: translateY(-2px);
}

.card-back h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .products-section {
    padding: 60px 0;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .product-card {
    height: 400px;
  }
  
  .product-info h3 {
    font-size: 1.2rem;
  }
  
  .product-price {
    font-size: 1.3rem;
  }
  
  .card-back {
    padding: 30px 20px;
  }
}

/* 最新资讯区样式 */
.news-section {
  padding: 100px 0;
  background-color: #f8f9fa;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
}

.more-btn {
  padding: 10px 20px;
  background-color: transparent;
  border: 2px solid #007bff;
  color: #007bff;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
}

.more-btn:hover {
  background-color: #007bff;
  color: white;
  transform: translateY(-2px);
}

.more-btn span {
  transition: transform 0.3s ease;
}

.more-btn:hover span {
  transform: translateX(5px);
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.news-card {
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.news-image {
  height: 200px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .news-image img {
  transform: scale(1.1);
}

.news-content {
  padding: 30px;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #999;
}

.news-category {
  background-color: #e3f2fd;
  color: #007bff;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.news-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #333;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.news-card:hover .news-title {
  color: #007bff;
}

.news-excerpt {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-detail-btn {
  padding: 10px 25px;
  background-color: transparent;
  border: 2px solid #007bff;
  color: #007bff;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.news-detail-btn:hover {
  background-color: #007bff;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .news-section {
    padding: 60px 0;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .news-card {
    margin-bottom: 20px;
  }
  
  .news-content {
    padding: 20px;
  }
  
  .news-title {
    font-size: 1.2rem;
  }
}

/* 用户评价区样式 */
.testimonials-section {
  padding: 100px 0;
  background-color: white;
}

.testimonials-carousel {
  position: relative;
  overflow: hidden;
  margin: 60px 0;
  height: 300px;
}

.testimonials-wrapper {
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
}

.testimonial-item {
  flex: 0 0 100%;
  height: 100%;
  padding: 0 20px;
}

.testimonial-card {
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.testimonial-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
  gap: 30px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-name {
  font-size: 1.3rem;
  color: #333;
  margin: 0;
}

.user-rating {
  display: flex;
  gap: 5px;
}

.star {
  color: #e0e0e0;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.star.filled {
  color: #ffc107;
}

.testimonial-scene {
  flex-shrink: 0;
}

.scene-image {
  width: 100px;
  height: 100px;
  border-radius: 15px;
  object-fit: cover;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.testimonial-card:hover .scene-image {
  transform: scale(1.05);
}

.testimonial-content {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin: 0;
  flex: 1;
  text-align: left;
}

.testimonial-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 20px;
}

.testimonial-controls .control-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.testimonial-controls .control-btn:hover {
  background-color: #007bff;
  color: white;
  transform: scale(1.1);
}

.testimonial-indicators {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.testimonial-indicators .indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonial-indicators .indicator.active {
  background-color: #007bff;
  width: 40px;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .testimonials-section {
    padding: 60px 0;
  }
  
  .testimonials-carousel {
    height: auto;
    margin: 40px 0;
  }
  
  .testimonial-item {
    padding: 0 10px;
  }
  
  .testimonial-card {
    padding: 30px 20px;
  }
  
  .testimonial-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .testimonial-scene {
    align-self: flex-start;
  }
  
  .scene-image {
    width: 80px;
    height: 80px;
  }
  
  .testimonial-content {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .testimonial-controls {
    padding: 0 10px;
  }
  
  .testimonial-controls .control-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}
</style>

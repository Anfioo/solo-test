<template>
  <div class="product-detail">
    <!-- 产品多媒体展示区 -->
    <section class="product-media-section">
      <div class="section-container">
        <div class="media-wrapper">
          <!-- 产品图片轮播 -->
          <div class="image-carousel">
            <div class="main-image" @click="openImageViewer">
              <img :src="currentProduct.images[currentImageIndex]" :alt="currentProduct.name" />
              <div class="zoom-indicator">点击放大</div>
            </div>
            <div class="thumbnail-list">
              <div 
                v-for="(image, index) in currentProduct.images" 
                :key="index"
                class="thumbnail-item"
                :class="{ active: currentImageIndex === index }"
                @click="currentImageIndex = index"
              >
                <img :src="image" :alt="currentProduct.name + ' 图片' + (index + 1)" />
              </div>
            </div>
          </div>
          
          <!-- 产品视频 -->
          <div class="product-video">
            <div class="video-wrapper">
              <video 
                ref="videoRef"
                :src="currentProduct.video" 
                :poster="currentProduct.images[0]"
                playsinline
              ></video>
              <div class="video-controls" ref="videoControlsRef">
                <button class="play-btn" @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</button>
                <div class="progress-bar">
                  <div 
                    class="progress-fill"
                    :style="{ width: progressPercentage + '%' }"
                    @click="seekVideo"
                  ></div>
                </div>
                <span class="duration">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 3D产品模型 -->
        <div class="model-container">
          <h3>3D产品模型</h3>
          <div class="model-viewer" ref="modelViewerRef">
            <div class="model-placeholder">
              <p>3D模型加载中...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 产品信息展示区 -->
    <section class="product-info-section">
      <div class="section-container">
        <div class="info-wrapper">
          <!-- 产品基本信息 -->
          <div class="basic-info">
            <h1 class="product-name">{{ currentProduct.name }}</h1>
            <p class="product-tagline">{{ currentProduct.tagline }}</p>
            <p class="product-price">{{ currentProduct.price }}</p>
            <div class="product-rating">
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= currentProduct.rating }"></span>
              </div>
              <span class="rating-text">({{ currentProduct.reviews }} 条评价)</span>
            </div>
          </div>
          
          <!-- 产品核心卖点 -->
          <div class="key-features">
            <h2>核心卖点</h2>
            <div class="features-grid">
              <div 
                v-for="(feature, index) in currentProduct.keyFeatures" 
                :key="index"
                class="feature-item"
              >
                <div class="feature-icon">{{ feature.icon }}</div>
                <div class="feature-content">
                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 产品参数表 -->
          <div class="specifications">
            <h2 class="spec-title" @click="toggleSpecifications">
              产品参数
              <span class="toggle-icon">{{ isSpecificationsOpen ? '▼' : '▶' }}</span>
            </h2>
            <div class="spec-content" v-show="isSpecificationsOpen">
              <table class="spec-table">
                <tbody>
                  <tr 
                    v-for="(spec, index) in currentProduct.specifications" 
                    :key="index"
                    :class="{ odd: index % 2 === 0 }"
                  >
                    <td class="spec-label">{{ spec.label }}</td>
                    <td class="spec-value">{{ spec.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- 相关配件推荐 -->
          <div class="related-accessories">
            <h2>相关配件</h2>
            <div class="accessories-grid">
              <div 
                v-for="accessory in currentProduct.relatedAccessories" 
                :key="accessory.id"
                class="accessory-card"
                @click="goToProductDetail(accessory.id)"
              >
                <img :src="accessory.image" :alt="accessory.name" />
                <h3>{{ accessory.name }}</h3>
                <p class="accessory-price">{{ accessory.price }}</p>
              </div>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="action-buttons">
            <button class="action-btn primary" @click="showReservationModal">预约体验</button>
            <button class="action-btn secondary" @click="showStoreModal">查看门店</button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 图片查看器弹窗 -->
    <div class="image-viewer" v-if="isImageViewerOpen" @click="closeImageViewer">
      <div class="viewer-content" @click.stop>
        <button class="close-btn" @click="closeImageViewer">×</button>
        <div class="viewer-image" ref="viewerImageRef">
          <img :src="currentProduct.images[currentImageIndex]" :alt="currentProduct.name" />
        </div>
        <div class="viewer-controls">
          <button class="viewer-btn prev" @click="prevImageInViewer">&lt;</button>
          <button class="viewer-btn next" @click="nextImageInViewer">&gt;</button>
        </div>
      </div>
    </div>
    
    <!-- 预约体验弹窗 -->
    <div class="modal" v-if="isReservationModalOpen" @click="closeReservationModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeReservationModal">×</button>
        <h2>预约体验</h2>
        <p>感谢您对{{ currentProduct.name }}的关注！</p>
        <p>由于这是一个演示网站，预约功能暂未开放。</p>
        <p>请联系我们的客服人员了解更多信息。</p>
        <button class="modal-btn" @click="closeReservationModal">关闭</button>
      </div>
    </div>
    
    <!-- 查看门店弹窗 -->
    <div class="modal" v-if="isStoreModalOpen" @click="closeStoreModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeStoreModal">×</button>
        <h2>查看门店</h2>
        <p>感谢您对{{ currentProduct.name }}的关注！</p>
        <p>由于这是一个演示网站，门店查询功能暂未开放。</p>
        <p>请访问我们的官方网站或联系客服了解更多信息。</p>
        <button class="modal-btn" @click="closeStoreModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductDetailView',
  data() {
    return {
      // 当前产品ID
      productId: 1,
      
      // 产品数据
      currentProduct: {
        id: 1,
        name: '旗舰手机 Pro',
        tagline: '突破性性能，极致体验',
        price: '¥9,999',
        rating: 4.8,
        reviews: 1258,
        images: [
            'https://picsum.photos/id/101/800/800',
            'https://picsum.photos/id/102/800/800',
            'https://picsum.photos/id/103/800/800',
            'https://picsum.photos/id/104/800/800',
            'https://picsum.photos/id/105/800/800'
          ],
        video: '/src/assets/videos/product1.mp4',
        model: '/src/assets/models/product1.glb',
        keyFeatures: [
          {
            icon: '⚡',
            title: '最新处理器',
            description: '性能提升50%，轻松应对各种复杂任务'
          },
          {
            icon: '📱',
            title: '超视网膜屏幕',
            description: '色彩还原真实，刷新率高达120Hz'
          },
          {
            icon: '📷',
            title: '5000万像素主摄',
            description: '夜拍更清晰，细节更丰富'
          },
          {
            icon: '🔋',
            title: '48小时超长续航',
            description: '大电池容量，支持快速充电'
          }
        ],
        specifications: [
          { label: '处理器', value: '最新一代旗舰芯片' },
          { label: '屏幕尺寸', value: '6.7英寸' },
          { label: '分辨率', value: '3200 x 1440' },
          { label: '存储容量', value: '256GB / 512GB / 1TB' },
          { label: '电池容量', value: '5000mAh' },
          { label: '充电功率', value: '65W有线快充 + 50W无线快充' },
          { label: '摄像头', value: '5000万像素主摄 + 1200万像素超广角 + 1000万像素长焦' },
          { label: '系统', value: '最新操作系统' },
          { label: '重量', value: '188g' },
          { label: '颜色', value: '黑色、白色、蓝色、红色' }
        ],
        relatedAccessories: [
          {
            id: 3,
            name: '无线耳机 Max',
            price: '¥2,999',
            image: 'https://picsum.photos/id/111/300/300'
          },
          {
            id: 11,
            name: '无线充电器 Max',
            price: '¥499',
            image: 'https://picsum.photos/id/112/300/300'
          },
          {
            id: 12,
            name: '蓝牙键盘 Slim',
            price: '¥699',
            image: 'https://picsum.photos/id/113/300/300'
          }
        ]
      },
      
      // 图片轮播相关
      currentImageIndex: 0,
      
      // 视频播放相关
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      progressPercentage: 0,
      
      // 3D模型相关
      modelLoaded: false,
      
      // 参数表展开状态
      isSpecificationsOpen: false,
      
      // 弹窗状态
      isImageViewerOpen: false,
      isReservationModalOpen: false,
      isStoreModalOpen: false,
      
      // 视频元素引用
      videoRef: null,
      videoControlsRef: null,
      
      // 图片查看器引用
      viewerImageRef: null
    }
  },
  mounted() {
    // 获取产品ID
    const id = this.$route.params.id
    if (id) {
      this.productId = parseInt(id)
      this.loadProductData()
    }
    
    // 初始化视频事件监听
    this.initVideoEventListeners()
  },
  beforeUnmount() {
    // 清理视频事件监听
    this.cleanupVideoEventListeners()
  },
  methods: {
    // 加载产品数据
    loadProductData() {
      // 这里可以根据产品ID从静态数据中获取产品信息
      // 由于是演示，我们使用默认产品数据
      console.log('加载产品ID:', this.productId)
    },
    
    // 图片轮播控制
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.currentProduct.images.length
    },
    
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.currentProduct.images.length) % this.currentProduct.images.length
    },
    
    // 图片查看器
    openImageViewer() {
      this.isImageViewerOpen = true
      // 这里可以添加图片缩放功能
    },
    
    closeImageViewer() {
      this.isImageViewerOpen = false
    },
    
    nextImageInViewer() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.currentProduct.images.length
    },
    
    prevImageInViewer() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.currentProduct.images.length) % this.currentProduct.images.length
    },
    
    // 视频控制
    initVideoEventListeners() {
      if (this.videoRef) {
        this.videoRef.addEventListener('timeupdate', this.updateVideoProgress)
        this.videoRef.addEventListener('loadedmetadata', this.setVideoDuration)
        this.videoRef.addEventListener('ended', this.onVideoEnded)
      }
    },
    
    cleanupVideoEventListeners() {
      if (this.videoRef) {
        this.videoRef.removeEventListener('timeupdate', this.updateVideoProgress)
        this.videoRef.removeEventListener('loadedmetadata', this.setVideoDuration)
        this.videoRef.removeEventListener('ended', this.onVideoEnded)
      }
    },
    
    togglePlay() {
      if (this.videoRef) {
        if (this.isPlaying) {
          this.videoRef.pause()
        } else {
          this.videoRef.play()
        }
        this.isPlaying = !this.isPlaying
      }
    },
    
    updateVideoProgress() {
      if (this.videoRef) {
        this.currentTime = this.videoRef.currentTime
        this.progressPercentage = (this.currentTime / this.duration) * 100
      }
    },
    
    setVideoDuration() {
      if (this.videoRef) {
        this.duration = this.videoRef.duration
      }
    },
    
    onVideoEnded() {
      this.isPlaying = false
      this.currentTime = 0
      this.progressPercentage = 0
    },
    
    seekVideo(e) {
      if (this.videoRef) {
        const rect = e.currentTarget.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const percentage = clickX / rect.width
        this.videoRef.currentTime = percentage * this.duration
      }
    },
    
    formatTime(seconds) {
      if (isNaN(seconds)) return '0:00'
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    
    // 3D模型初始化
    init3DModel() {
      // 这里将使用Three.js初始化3D模型
      // 由于是演示，我们使用占位符
      setTimeout(() => {
        this.modelLoaded = true
      }, 1000)
    },
    
    // 参数表折叠控制
    toggleSpecifications() {
      this.isSpecificationsOpen = !this.isSpecificationsOpen
    },
    
    // 弹窗控制
    showReservationModal() {
      this.isReservationModalOpen = true
    },
    
    closeReservationModal() {
      this.isReservationModalOpen = false
    },
    
    showStoreModal() {
      this.isStoreModalOpen = true
    },
    
    closeStoreModal() {
      this.isStoreModalOpen = false
    },
    
    // 跳转到产品详情页
    goToProductDetail(productId) {
      this.$router.push(`/product/${productId}`)
    }
  }
}
</script>

<style scoped>
/* 产品详情页基础样式 */
.product-detail {
  background-color: white;
}

/* 产品多媒体展示区 */
.product-media-section {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.media-wrapper {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* 图片轮播样式 */
.image-carousel {
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.main-image {
  position: relative;
  cursor: pointer;
  margin-bottom: 30px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.02);
}

.main-image img {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  display: block;
}

.zoom-indicator {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.main-image:hover .zoom-indicator {
  opacity: 1;
}

.thumbnail-list {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnail-item {
  flex: 0 0 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s ease;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-item:hover {
  transform: scale(1.05);
}

.thumbnail-item.active {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

/* 产品视频样式 */
.product-video {
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: #000;
  border-radius: 15px;
  overflow: hidden;
}

.video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.play-btn {
  padding: 10px 25px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.play-btn:hover {
  background-color: white;
  color: #000;
  transform: translateY(-2px);
}

.progress-bar {
  flex: 1;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  cursor: pointer;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #007bff;
  border-radius: 3px;
  transition: width 0.1s ease;
}

.duration {
  color: white;
  font-size: 0.9rem;
  min-width: 80px;
  text-align: center;
}

/* 3D模型样式 */
.model-container {
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.model-container h3 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.5rem;
  color: #333;
}

.model-viewer {
  width: 100%;
  height: 500px;
  background-color: #f0f4f8;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.model-placeholder {
  text-align: center;
  color: #666;
}

/* 产品信息展示区 */
.product-info-section {
  padding: 80px 0;
  background-color: white;
}

.info-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

/* 基本信息样式 */
.basic-info {
  margin-bottom: 60px;
  text-align: center;
}

.product-name {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #333;
}

.product-tagline {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.product-price {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 25px;
}

.product-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.stars {
  display: flex;
  gap: 5px;
}

.star {
  color: #e0e0e0;
  font-size: 1.2rem;
}

.star.filled {
  color: #ffc107;
}

.rating-text {
  color: #666;
  font-size: 0.95rem;
}

/* 核心卖点样式 */
.key-features {
  margin-bottom: 60px;
}

.key-features h2 {
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-item {
  display: flex;
  gap: 20px;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  flex-shrink: 0;
  color: #007bff;
}

.feature-content h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #333;
}

.feature-content p {
  color: #666;
  line-height: 1.6;
}

/* 产品参数样式 */
.specifications {
  margin-bottom: 60px;
  background-color: #f8f9fa;
  border-radius: 15px;
  overflow: hidden;
}

.spec-title {
  padding: 25px 30px;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  color: #333;
  transition: all 0.3s ease;
  border-bottom: 1px solid #e0e0e0;
}

.spec-title:hover {
  background-color: #f0f4f8;
}

.toggle-icon {
  font-size: 1rem;
  color: #666;
  transition: transform 0.3s ease;
}

.spec-content {
  padding: 0;
  transition: all 0.3s ease;
}

.spec-table {
  width: 100%;
  border-collapse: collapse;
}

.spec-table tr {
  transition: background-color 0.3s ease;
}

.spec-table tr.odd {
  background-color: rgba(255, 255, 255, 0.5);
}

.spec-table tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

.spec-label {
  padding: 20px 30px;
  font-weight: 500;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  width: 30%;
  text-align: left;
}

.spec-value {
  padding: 20px 30px;
  color: #666;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

/* 相关配件样式 */
.related-accessories {
  margin-bottom: 60px;
}

.related-accessories h2 {
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
}

.accessories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.accessory-card {
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.accessory-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.accessory-card img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  padding: 20px;
  background-color: #f8f9fa;
}

.accessory-card h3 {
  padding: 20px 20px 10px;
  font-size: 1.2rem;
  color: #333;
  text-align: center;
}

.accessory-price {
  padding: 0 20px 20px;
  font-size: 1.3rem;
  font-weight: bold;
  color: #007bff;
  text-align: center;
}

/* 操作按钮样式 */
.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 60px;
}

.action-btn {
  padding: 18px 40px;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  min-width: 200px;
}

.action-btn.primary {
  background-color: #007bff;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.action-btn.primary:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.4);
}

.action-btn.secondary {
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.action-btn.secondary:hover {
  background-color: #007bff;
  color: white;
  transform: translateY(-3px);
}

/* 图片查看器样式 */
.image-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.viewer-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  border-radius: 15px;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2010;
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.viewer-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.viewer-image img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
}

.viewer-controls {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 2010;
}

.viewer-btn {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.viewer-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  position: relative;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.8rem;
}

.modal-content p {
  margin-bottom: 15px;
  color: #666;
  line-height: 1.6;
}

.modal-btn {
  margin-top: 20px;
  padding: 12px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .product-media-section {
    padding: 60px 0;
  }
  
  .image-carousel {
    padding: 30px 20px;
  }
  
  .product-video {
    padding: 30px 20px;
  }
  
  .model-container {
    padding: 30px 20px;
  }
  
  .product-info-section {
    padding: 60px 20px;
  }
  
  .product-name {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .accessories-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .action-btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .media-wrapper {
    gap: 40px;
  }
  
  .main-image {
    margin-bottom: 20px;
  }
  
  .thumbnail-item {
    flex: 0 0 80px;
    height: 80px;
  }
  
  .video-wrapper {
    height: 300px;
  }
  
  .video-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
    padding: 15px;
  }
  
  .play-btn {
    align-self: center;
  }
  
  .product-name {
    font-size: 1.8rem;
  }
  
  .product-price {
    font-size: 1.8rem;
  }
  
  .basic-info {
    margin-bottom: 40px;
  }
  
  .key-features,
  .specifications,
  .related-accessories {
    margin-bottom: 40px;
  }
  
  .key-features h2,
  .related-accessories h2 {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
  
  .spec-title {
    font-size: 1.3rem;
    padding: 20px;
  }
  
  .spec-label,
  .spec-value {
    padding: 15px 20px;
  }
}
</style>

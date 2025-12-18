<template>
  <div class="support-view">
    <!-- 售后服务头部 -->
    <section class="support-header">
      <div class="section-container">
        <h1 class="section-title">售后服务</h1>
        <p class="section-subtitle">为您提供全方位的售后服务支持</p>
      </div>
    </section>
    
    <!-- 服务说明 -->
    <section class="service-info-section">
      <div class="section-container">
        <h2 class="section-title">服务说明</h2>
        
        <!-- 退换货规则 -->
        <div class="service-block">
          <h3 class="block-title">退换货规则</h3>
          <div class="service-content">
            <div class="service-text">
              <h4>7天无理由退换货</h4>
              <p>自收到商品之日起7日内，在商品完好、附件齐全的情况下，可申请无理由退换货。</p>
              <h4>15天质量问题换货</h4>
              <p>自收到商品之日起15日内，如出现非人为质量问题，可申请换货。</p>
              <h4>保修政策</h4>
              <p>商品自购买之日起，享受1-2年的全国联保服务，具体保修期限请参考产品说明书。</p>
            </div>
            <div class="service-image">
              <img src="https://picsum.photos/id/91/500/500" alt="退换货规则" />
            </div>
          </div>
        </div>
        
        <!-- 服务流程 -->
        <div class="service-block">
          <h3 class="block-title">服务流程</h3>
          <div class="service-flow">
            <img src="https://picsum.photos/id/92/800/400" alt="服务流程" />
          </div>
        </div>
      </div>
    </section>
    
    <!-- 常见问题FAQ -->
    <section class="faq-section">
      <div class="section-container">
        <h2 class="section-title">常见问题</h2>
        
        <!-- FAQ分类 -->
        <div class="faq-categories">
          <button 
            v-for="category in faqCategories" 
            :key="category.id"
            class="category-btn"
            :class="{ active: activeFaqCategory === category.id }"
            @click="setActiveFaqCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
        
        <!-- FAQ列表 -->
        <div class="faq-list">
          <div 
            v-for="(faq, index) in filteredFaqs" 
            :key="index"
            class="faq-item"
            @click="toggleFaq(index)"
          >
            <div class="faq-question">
              <h3>{{ faq.question }}</h3>
              <span class="faq-toggle">{{ faq.open ? '▼' : '▶' }}</span>
            </div>
            <div class="faq-answer" v-show="faq.open">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 服务网点 -->
    <section class="service-locations-section">
      <div class="section-container">
        <h2 class="section-title">服务网点</h2>
        
        <!-- 省份筛选 -->
        <div class="province-filter">
          <select v-model="selectedProvince" @change="filterLocations">
            <option value="">全部省份</option>
            <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>
          </select>
        </div>
        
        <!-- 地图截图 -->
        <div class="map-container">
          <img src="https://picsum.photos/id/93/800/400" alt="服务网点地图" />
        </div>
        
        <!-- 网点列表 -->
        <div class="locations-grid">
          <div 
            v-for="(location, index) in filteredLocations" 
            :key="index"
            class="location-card"
          >
            <h3 class="location-city">{{ location.city }}</h3>
            <div class="location-info">
              <p class="location-address">{{ location.address }}</p>
              <p class="location-phone">{{ location.phone }}</p>
              <p class="location-hours">{{ location.hours }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SupportView',
  data() {
    return {
      // FAQ分类
      faqCategories: [
        { id: 1, name: '使用技巧' },
        { id: 2, name: '故障排查' },
        { id: 3, name: '保修政策' }
      ],
      
      // FAQ数据
      faqs: [
        {
          id: 1,
          category: 1,
          question: '如何连接无线耳机？',
          answer: '打开耳机充电盒，耳机将自动进入配对模式，然后在手机蓝牙设置中搜索并连接耳机名称即可。',
          open: false
        },
        {
          id: 2,
          category: 1,
          question: '如何延长电池使用寿命？',
          answer: '建议将设备电量保持在20%-80%之间，避免过度充电和过度放电，定期进行一次完整的充放电循环。',
          open: false
        },
        {
          id: 3,
          category: 2,
          question: '设备无法开机怎么办？',
          answer: '尝试长按电源键10秒以上，如仍无法开机，请连接充电器充电30分钟后再尝试开机。',
          open: false
        },
        {
          id: 4,
          category: 2,
          question: '屏幕出现划痕如何处理？',
          answer: '轻微划痕可使用专业的屏幕修复液进行修复，严重划痕建议到官方服务网点更换屏幕。',
          open: false
        },
        {
          id: 5,
          category: 3,
          question: '保修需要提供什么材料？',
          answer: '保修时需提供购机发票或电子发票、产品保修卡以及设备本身。',
          open: false
        },
        {
          id: 6,
          category: 3,
          question: '人为损坏是否可以保修？',
          answer: '人为损坏不在保修范围内，但可以到官方服务网点付费维修。',
          open: false
        }
      ],
      
      // 活跃的FAQ分类
      activeFaqCategory: 1,
      
      // 省份数据
      provinces: [
        '北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '重庆', '武汉', '西安'
      ],
      
      // 服务网点数据
      locations: [
        {
          city: '北京',
          province: '北京',
          address: '北京市朝阳区建国路88号',
          phone: '400-123-4567',
          hours: '周一至周日 9:00-18:00'
        },
        {
          city: '上海',
          province: '上海',
          address: '上海市浦东新区陆家嘴环路1000号',
          phone: '400-123-4568',
          hours: '周一至周日 9:00-18:00'
        },
        {
          city: '广州',
          province: '广州',
          address: '广州市天河区天河路385号',
          phone: '400-123-4569',
          hours: '周一至周日 9:00-18:00'
        },
        {
          city: '深圳',
          province: '深圳',
          address: '深圳市南山区科技园南区高新南一道1号',
          phone: '400-123-4570',
          hours: '周一至周日 9:00-18:00'
        },
        {
          city: '杭州',
          province: '杭州',
          address: '杭州市西湖区文三路90号',
          phone: '400-123-4571',
          hours: '周一至周日 9:00-18:00'
        }
      ],
      
      // 选中的省份
      selectedProvince: '',
      
      // 筛选后的网点
      filteredLocations: []
    }
  },
  computed: {
    // 筛选后的FAQ
    filteredFaqs() {
      return this.faqs.filter(faq => faq.category === this.activeFaqCategory)
    }
  },
  mounted() {
    // 初始化网点筛选
    this.filteredLocations = [...this.locations]
  },
  methods: {
    // 设置活跃的FAQ分类
    setActiveFaqCategory(categoryId) {
      this.activeFaqCategory = categoryId
      // 重置FAQ展开状态
      this.faqs.forEach(faq => faq.open = false)
    },
    
    // 切换FAQ展开状态
    toggleFaq(index) {
      const faq = this.filteredFaqs[index]
      if (faq) {
        faq.open = !faq.open
      }
    },
    
    // 筛选网点
    filterLocations() {
      if (this.selectedProvince) {
        this.filteredLocations = this.locations.filter(location => location.province === this.selectedProvince)
      } else {
        this.filteredLocations = [...this.locations]
      }
    }
  }
}
</script>

<style scoped>
/* 售后服务页面基础样式 */
.support-view {
  background-color: white;
}

/* 售后服务头部 */
.support-header {
  padding: 80px 0;
  background-color: #f8f9fa;
  text-align: center;
}

.support-header .section-title {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
}

.support-header .section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.5;
}

/* 服务说明 */
.service-info-section {
  padding: 80px 0;
  background-color: white;
}

.service-block {
  margin-bottom: 80px;
}

.service-block:last-child {
  margin-bottom: 0;
}

.block-title {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #333;
  position: relative;
  padding-bottom: 15px;
}

.block-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  border-radius: 2px;
}

.service-content {
  display: flex;
  gap: 60px;
  align-items: center;
}

.service-text {
  flex: 1;
}

.service-text h4 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #333;
}

.service-text p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.service-image {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.service-image img {
  width: 100%;
  height: auto;
  display: block;
}

.service-flow {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.service-flow img {
  width: 100%;
  height: auto;
  display: block;
}

/* 常见问题FAQ */
.faq-section {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.faq-categories {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 12px 30px;
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
}

.category-btn:hover {
  border-color: #007bff;
  color: #007bff;
  transform: translateY(-2px);
}

.category-btn.active {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.faq-list {
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.faq-item {
  padding: 25px 30px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-item:hover {
  background-color: #f8f9fa;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  font-size: 1.2rem;
  color: #333;
  margin: 0;
  font-weight: 500;
}

.faq-toggle {
  font-size: 0.9rem;
  color: #666;
  transition: transform 0.3s ease;
}

.faq-answer {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  animation: fadeIn 0.3s ease;
}

.faq-answer p {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 服务网点 */
.service-locations-section {
  padding: 80px 0;
  background-color: white;
}

.province-filter {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}

.province-filter select {
  padding: 12px 20px;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.province-filter select:hover {
  border-color: #007bff;
}

.map-container {
  margin-bottom: 60px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.map-container img {
  width: 100%;
  height: auto;
  display: block;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.location-card {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.location-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.location-city {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}

.location-info p {
  margin-bottom: 12px;
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}

.location-info p:last-child {
  margin-bottom: 0;
}

.location-address {
  position: relative;
  padding-left: 25px;
}

.location-address::before {
  content: '📍';
  position: absolute;
  left: 0;
  top: 2px;
}

.location-phone {
  position: relative;
  padding-left: 25px;
}

.location-phone::before {
  content: '📞';
  position: absolute;
  left: 0;
  top: 2px;
}

.location-hours {
  position: relative;
  padding-left: 25px;
}

.location-hours::before {
  content: '⏰';
  position: absolute;
  left: 0;
  top: 2px;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .support-header {
    padding: 60px 20px;
  }
  
  .support-header .section-title {
    font-size: 2.5rem;
  }
  
  .service-info-section {
    padding: 60px 20px;
  }
  
  .service-content {
    flex-direction: column;
    gap: 40px;
  }
  
  .service-text,
  .service-image {
    width: 100%;
  }
  
  .faq-section {
    padding: 60px 20px;
  }
  
  .service-locations-section {
    padding: 60px 20px;
  }
  
  .locations-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .support-header .section-title {
    font-size: 2rem;
  }
  
  .support-header .section-subtitle {
    font-size: 1.1rem;
  }
  
  .block-title {
    font-size: 1.5rem;
  }
  
  .service-block {
    margin-bottom: 60px;
  }
  
  .faq-categories {
    justify-content: center;
  }
  
  .category-btn {
    font-size: 1rem;
    padding: 10px 20px;
  }
  
  .faq-item {
    padding: 20px;
  }
  
  .faq-question h3 {
    font-size: 1.1rem;
  }
  
  .location-card {
    padding: 25px;
  }
  
  .location-city {
    font-size: 1.3rem;
  }
}
</style>
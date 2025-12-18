<template>
  <div class="products-view">
    <!-- 产品分类导航 -->
    <section class="product-categories">
      <div class="section-container">
        <div class="categories-nav">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="category-btn"
            :class="{ active: selectedCategory === category.id }"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>
    
    <!-- 产品列表筛选区 -->
    <section class="product-filters">
      <div class="section-container">
        <div class="filters-container">
          <!-- 价格区间筛选 -->
          <div class="filter-group">
            <h3 class="filter-title">价格区间</h3>
            <div class="filter-options">
              <button 
                v-for="range in priceRanges" 
                :key="range.id"
                class="filter-option"
                :class="{ active: selectedPriceRange === range.id }"
                @click="selectPriceRange(range.id)"
              >
                {{ range.name }}
              </button>
            </div>
          </div>
          
          <!-- 配置筛选 -->
          <div class="filter-group">
            <h3 class="filter-title">配置</h3>
            <div class="filter-options">
              <button 
                v-for="config in configurations" 
                :key="config.id"
                class="filter-option"
                :class="{ active: selectedConfig === config.id }"
                @click="selectConfig(config.id)"
              >
                {{ config.name }}
              </button>
            </div>
          </div>
          
          <!-- 颜色筛选 -->
          <div class="filter-group">
            <h3 class="filter-title">颜色</h3>
            <div class="filter-options">
              <button 
                v-for="color in colors" 
                :key="color.id"
                class="filter-option color-option"
                :class="{ active: selectedColor === color.id }"
                @click="selectColor(color.id)"
                :style="{ backgroundColor: color.value }"
              ></button>
            </div>
          </div>
          
          <!-- 排序选项 -->
          <div class="filter-group sort-group">
            <h3 class="filter-title">排序</h3>
            <div class="filter-options">
              <button 
                v-for="sort in sortOptions" 
                :key="sort.id"
                class="filter-option"
                :class="{ active: selectedSort === sort.id }"
                @click="selectSort(sort.id)"
              >
                {{ sort.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 产品列表区 -->
    <section class="product-list">
      <div class="section-container">
        <div class="products-grid">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="product-card"
            @click="goToProductDetail(product.id)"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
              <div class="quick-view">快速查看</div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-tagline">{{ product.tagline }}</p>
              <p class="product-price">{{ product.price }}</p>
            </div>
          </div>
        </div>
        
        <!-- 分页控件 -->
        <div class="pagination">
          <button 
            class="page-btn prev" 
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            &lt;
          </button>
          <div class="page-numbers">
            <button 
              v-for="page in totalPages" 
              :key="page"
              class="page-btn number"
              :class="{ active: currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
          <button 
            class="page-btn next" 
            :disabled="currentPage === totalPages"
            @click="nextPage"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductsView',
  data() {
    return {
      // 产品分类
      categories: [
        { id: 0, name: '全部' },
        { id: 1, name: '手机' },
        { id: 2, name: '平板' },
        { id: 3, name: '耳机' },
        { id: 4, name: '配件' }
      ],
      // 价格区间
      priceRanges: [
        { id: 0, name: '全部价格' },
        { id: 1, name: '高端 (¥5000+)' },
        { id: 2, name: '中端 (¥2000-¥5000)' },
        { id: 3, name: '入门 (<¥2000)' }
      ],
      // 配置选项
      configurations: [
        { id: 0, name: '全部配置' },
        { id: 1, name: '旗舰版' },
        { id: 2, name: '基础版' }
      ],
      // 颜色选项
      colors: [
        { id: 0, name: '全部颜色', value: 'transparent' },
        { id: 1, name: '黑色', value: '#000000' },
        { id: 2, name: '白色', value: '#ffffff' },
        { id: 3, name: '蓝色', value: '#007bff' },
        { id: 4, name: '红色', value: '#dc3545' },
        { id: 5, name: '绿色', value: '#28a745' }
      ],
      // 排序选项
      sortOptions: [
        { id: 1, name: '热度' },
        { id: 2, name: '发布时间' },
        { id: 3, name: '价格从高到低' },
        { id: 4, name: '价格从低到高' }
      ],
      
      // 选中的筛选条件
      selectedCategory: 0,
      selectedPriceRange: 0,
      selectedConfig: 0,
      selectedColor: 0,
      selectedSort: 1,
      
      // 分页信息
      currentPage: 1,
      pageSize: 8,
      
      // 产品数据
      products: [
        {
          id: 1,
          name: '旗舰手机 Pro',
          tagline: '突破性性能，极致体验',
          price: '¥9,999',
          category: 1,
          priceRange: 1,
          config: 1,
          color: 1,
          image: 'https://picsum.photos/id/121/300/300',
          hotness: 95
        },
        {
          id: 2,
          name: '智能平板 Air',
          tagline: '轻办公，随享生活',
          price: '¥5,999',
          category: 2,
          priceRange: 1,
          config: 1,
          color: 2,
          image: 'https://picsum.photos/id/122/300/300',
          hotness: 90
        },
        {
          id: 3,
          name: '无线耳机 Max',
          tagline: '沉浸式音效，舒适佩戴',
          price: '¥2,999',
          category: 3,
          priceRange: 2,
          config: 1,
          color: 3,
          image: 'https://picsum.photos/id/123/300/300',
          hotness: 88
        },
        {
          id: 4,
          name: '智能手表 Ultra',
          tagline: '健康管理，运动伴侣',
          price: '¥3,999',
          category: 4,
          priceRange: 2,
          config: 1,
          color: 4,
          image: 'https://picsum.photos/id/124/300/300',
          hotness: 85
        },
        {
          id: 5,
          name: '入门手机 SE',
          tagline: '均衡性能，实用之选',
          price: '¥1,999',
          category: 1,
          priceRange: 3,
          config: 2,
          color: 5,
          image: 'https://picsum.photos/id/125/300/300',
          hotness: 82
        },
        {
          id: 6,
          name: '智能音箱 Mini',
          tagline: '智能语音，便捷生活',
          price: '¥399',
          category: 4,
          priceRange: 3,
          config: 2,
          color: 1,
          image: 'https://picsum.photos/id/126/300/300',
          hotness: 80
        },
        {
          id: 7,
          name: '游戏手柄 Pro',
          tagline: '专业游戏体验',
          price: '¥799',
          category: 4,
          priceRange: 3,
          config: 1,
          color: 3,
          image: 'https://picsum.photos/id/127/300/300',
          hotness: 78
        },
        {
          id: 8,
          name: '运动耳机 Lite',
          tagline: '轻盈舒适，运动伴侣',
          price: '¥1,299',
          category: 3,
          priceRange: 3,
          config: 2,
          color: 2,
          image: 'https://picsum.photos/id/128/300/300',
          hotness: 75
        },
        {
          id: 9,
          name: '旗舰平板 Pro',
          tagline: '专业生产力工具',
          price: '¥8,999',
          category: 2,
          priceRange: 1,
          config: 1,
          color: 4,
          image: 'https://picsum.photos/id/129/300/300',
          hotness: 72
        },
        {
          id: 10,
          name: '智能眼镜 Air',
          tagline: '未来科技，智能生活',
          price: '¥4,999',
          category: 4,
          priceRange: 2,
          config: 1,
          color: 5,
          image: 'https://picsum.photos/id/130/300/300',
          hotness: 70
        },
        {
          id: 11,
          name: '无线充电器 Max',
          tagline: '快速充电，便捷高效',
          price: '¥499',
          category: 4,
          priceRange: 3,
          config: 2,
          color: 1,
          image: 'https://picsum.photos/id/131/300/300',
          hotness: 68
        },
        {
          id: 12,
          name: '蓝牙键盘 Slim',
          tagline: '轻薄便携，高效输入',
          price: '¥699',
          category: 4,
          priceRange: 3,
          config: 2,
          color: 2,
          image: 'https://picsum.photos/id/132/300/300',
          hotness: 65
        }
      ]
    }
  },
  computed: {
    // 筛选后的产品列表
    filteredProducts() {
      let result = [...this.products]
      
      // 按分类筛选
      if (this.selectedCategory !== 0) {
        result = result.filter(product => product.category === this.selectedCategory)
      }
      
      // 按价格区间筛选
      if (this.selectedPriceRange !== 0) {
        result = result.filter(product => product.priceRange === this.selectedPriceRange)
      }
      
      // 按配置筛选
      if (this.selectedConfig !== 0) {
        result = result.filter(product => product.config === this.selectedConfig)
      }
      
      // 按颜色筛选
      if (this.selectedColor !== 0) {
        result = result.filter(product => product.color === this.selectedColor)
      }
      
      // 按排序选项排序
      result.sort((a, b) => {
        switch (this.selectedSort) {
          case 1: // 热度
            return b.hotness - a.hotness
          case 2: // 发布时间
            return b.id - a.id
          case 3: // 价格从高到低
            return this.parsePrice(b.price) - this.parsePrice(a.price)
          case 4: // 价格从低到高
            return this.parsePrice(a.price) - this.parsePrice(b.price)
          default:
            return 0
        }
      })
      
      // 分页处理
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return result.slice(start, end)
    },
    // 总页数
    totalPages() {
      let result = [...this.products]
      
      // 应用筛选条件
      if (this.selectedCategory !== 0) {
        result = result.filter(product => product.category === this.selectedCategory)
      }
      if (this.selectedPriceRange !== 0) {
        result = result.filter(product => product.priceRange === this.selectedPriceRange)
      }
      if (this.selectedConfig !== 0) {
        result = result.filter(product => product.config === this.selectedConfig)
      }
      if (this.selectedColor !== 0) {
        result = result.filter(product => product.color === this.selectedColor)
      }
      
      return Math.ceil(result.length / this.pageSize)
    }
  },
  methods: {
    // 解析价格字符串为数字
    parsePrice(price) {
      return parseInt(price.replace(/[^0-9]/g, ''))
    },
    
    // 选择分类
    selectCategory(categoryId) {
      this.selectedCategory = categoryId
      this.currentPage = 1
    },
    
    // 选择价格区间
    selectPriceRange(rangeId) {
      this.selectedPriceRange = rangeId
      this.currentPage = 1
    },
    
    // 选择配置
    selectConfig(configId) {
      this.selectedConfig = configId
      this.currentPage = 1
    },
    
    // 选择颜色
    selectColor(colorId) {
      this.selectedColor = colorId
      this.currentPage = 1
    },
    
    // 选择排序
    selectSort(sortId) {
      this.selectedSort = sortId
      this.currentPage = 1
    },
    
    // 分页控制
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    
    goToPage(page) {
      this.currentPage = page
    },
    
    // 跳转到产品详情页
    goToProductDetail(productId) {
      this.$router.push(`/product/${productId}`)
    }
  }
}
</script>

<style scoped>
/* 产品分类导航样式 */
.product-categories {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  position: sticky;
  top: 80px;
  z-index: 900;
}

.categories-nav {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.category-btn {
  padding: 12px 30px;
  background-color: transparent;
  border: none;
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.category-btn:hover {
  color: #007bff;
}

.category-btn.active {
  color: #007bff;
}

.category-btn.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  border-radius: 2px;
}

/* 产品筛选区样式 */
.product-filters {
  background-color: #f8f9fa;
  padding: 40px 0;
}

.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
}

.filter-group {
  flex: 1;
  min-width: 150px;
}

.filter-title {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-option {
  padding: 10px 20px;
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  color: #666;
  text-align: left;
}

.filter-option:hover {
  border-color: #007bff;
  color: #007bff;
}

.filter-option.active {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

/* 颜色筛选选项 */
.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 0;
  border: 2px solid #e0e0e0;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: #007bff;
  transform: scale(1.2);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

/* 排序选项 */
.sort-group .filter-options {
  flex-direction: row;
  gap: 10px;
}

/* 产品列表区样式 */
.product-list {
  padding: 80px 0;
  background-color: white;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
}

.product-card {
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.quick-view {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 123, 255, 0.9);
  color: white;
  text-align: center;
  padding: 15px 0;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
}

.product-card:hover .quick-view {
  transform: translateY(0);
}

.product-info {
  padding: 30px;
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

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 60px;
}

.page-btn {
  padding: 12px 18px;
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #666;
}

.page-btn:hover:not(:disabled) {
  border-color: #007bff;
  color: #007bff;
  transform: translateY(-2px);
}

.page-btn.active {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 10px;
}

.page-btn.number {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .categories-nav {
    gap: 20px;
  }
  
  .category-btn {
    padding: 10px 20px;
    font-size: 1rem;
  }
  
  .filters-container {
    flex-direction: column;
    gap: 30px;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .sort-group .filter-options {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .product-categories {
    padding: 15px 0;
  }
  
  .categories-nav {
    overflow-x: auto;
    padding: 0 20px;
    gap: 15px;
  }
  
  .category-btn {
    white-space: nowrap;
    font-size: 0.9rem;
    padding: 8px 15px;
  }
  
  .product-filters {
    padding: 30px 0;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .pagination {
    gap: 10px;
  }
  
  .page-btn {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
  
  .page-btn.number {
    width: 40px;
    height: 40px;
  }
}
</style>

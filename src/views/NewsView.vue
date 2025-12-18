<template>
  <div class="news">
    <section class="news-header">
      <div class="section-container">
        <h1 class="section-title">最新资讯</h1>
        <p class="section-subtitle">了解品牌最新动态和行业资讯</p>
      </div>
    </section>
    
    <section class="news-list">
      <div class="section-container">
        <div class="news-grid">
          <div 
            v-for="news in newsList" 
            :key="news.id"
            class="news-card"
            @click="goToNewsDetail(news.id)"
          >
            <div class="news-image">
              <img :src="news.image" :alt="news.title" />
            </div>
            <div class="news-content">
              <div class="news-meta">
                <span class="news-date">{{ news.date }}</span>
              </div>
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-excerpt">{{ news.excerpt }}</p>
              <button class="read-more-btn">查看详情</button>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div class="pagination">
          <button class="page-btn prev" @click="prevPage" :disabled="currentPage === 1">上一页</button>
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
          <button class="page-btn next" @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NewsView',
  data() {
    return {
      newsList: [
        {
          id: 1,
          title: '品牌发布全新旗舰手机，引领行业创新',
          excerpt: '我们隆重推出全新一代旗舰手机，搭载最新处理器和创新相机系统，为用户带来极致体验。',
          date: '2025-12-15',
          image: 'https://picsum.photos/id/141/400/250'
        },
        {
          id: 2,
          title: '品牌荣获年度最佳设计奖',
          excerpt: '在刚刚结束的国际设计大赛中，我们的产品凭借卓越的设计理念和创新的工艺技术，荣获年度最佳设计奖。',
          date: '2025-12-10',
          image: 'https://picsum.photos/id/142/400/250'
        },
        {
          id: 3,
          title: '品牌举办全球开发者大会',
          excerpt: '我们将举办全球开发者大会，邀请行业专家和开发者共同探讨技术创新和未来发展方向。',
          date: '2025-12-05',
          image: 'https://picsum.photos/id/143/400/250'
        },
        {
          id: 4,
          title: '品牌推出全新生态系统',
          excerpt: '我们正式推出全新生态系统，整合硬件、软件和服务，为用户提供无缝连接的智能生活体验。',
          date: '2025-11-30',
          image: 'https://picsum.photos/id/144/400/250'
        }
      ],
      currentPage: 1,
      pageSize: 4
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.newsList.length / this.pageSize)
    }
  },
  methods: {
    goToNewsDetail(newsId: number) {
      this.$router.push(`/news/${newsId}`)
    },
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
    goToPage(page: number) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped>
.news-header {
  padding: 80px 0;
  background-color: #f8f9fa;
  text-align: center;
}

.news-header .section-title {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
}

.news-header .section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.5;
}

.news-list {
  padding: 80px 0;
  background-color: white;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
}

.news-card {
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
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
  transform: scale(1.05);
}

.news-content {
  padding: 30px;
}

.news-meta {
  margin-bottom: 15px;
}

.news-date {
  color: #999;
  font-size: 0.9rem;
}

.news-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
  line-height: 1.3;
}

.news-excerpt {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.read-more-btn {
  padding: 12px 25px;
  background-color: #007bff;
  color: white;
  border-radius: 50px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.read-more-btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
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
  padding: 12px 20px;
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #666;
}

.page-btn:hover {
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
  transform: none;
}

.page-btn:disabled:hover {
  border-color: #e0e0e0;
  color: #666;
}

.page-btn.number {
  width: 50px;
  height: 50px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .news-header {
    padding: 60px 20px;
  }
  
  .news-header .section-title {
    font-size: 2.5rem;
  }
  
  .news-list {
    padding: 60px 20px;
  }
  
  .news-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .news-header .section-title {
    font-size: 2rem;
  }
  
  .news-header .section-subtitle {
    font-size: 1.1rem;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .news-card {
    flex-direction: column;
  }
  
  .news-image {
    height: 180px;
  }
  
  .news-content {
    padding: 25px;
  }
  
  .news-title {
    font-size: 1.3rem;
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
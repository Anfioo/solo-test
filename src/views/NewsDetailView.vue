<template>
  <div class="news-detail">
    <section class="news-detail-header">
      <div class="section-container">
        <button class="back-btn" @click="goBack">← 返回列表</button>
        <h1 class="news-detail-title">{{ safeCurrentNews.title }}</h1>
        <div class="news-detail-meta">
          <span class="news-detail-date">{{ safeCurrentNews.date }}</span>
        </div>
      </div>
    </section>
    
    <section class="news-detail-content">
      <div class="section-container">
        <div class="news-detail-image">
          <img :src="safeCurrentNews.image" :alt="safeCurrentNews.title" />
        </div>
        
        <div class="news-detail-body">
          <p v-for="(paragraph, index) in safeCurrentNews.content" :key="index" class="news-detail-paragraph">
            {{ paragraph }}
          </p>
        </div>
        
        <div class="related-news">
          <h3 class="related-news-title">相关资讯</h3>
          <div class="related-news-grid">
            <div 
              v-for="news in relatedNews" 
              :key="news.id"
              class="related-news-card"
              @click="goToNewsDetail(news.id)"
            >
              <div class="related-news-image">
                <img :src="news.image" :alt="news.title" />
              </div>
              <div class="related-news-content">
                <h4 class="related-news-title">{{ news.title }}</h4>
                <span class="related-news-date">{{ news.date }}</span>
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
  name: 'NewsDetailView',
  data() {
    return {
      newsId: 0,
      newsList: [
        {
          id: 1,
          title: '品牌发布全新旗舰手机，引领行业创新',
          date: '2025-12-15',
          image: 'https://picsum.photos/id/151/800/500',
          content: [
            '我们隆重推出全新一代旗舰手机，搭载最新处理器和创新相机系统，为用户带来极致体验。这款手机采用了突破性的设计理念，融合了美学与科技的完美结合。',
            '全新旗舰手机配备了6.7英寸超视网膜显示屏，支持120Hz高刷新率，带来流畅的视觉体验。同时，搭载了最新一代处理器，性能提升50%，功耗降低20%，为用户提供更持久的续航能力。',
            '相机系统方面，我们采用了5000万像素主摄像头，配合超广角和长焦镜头，实现全场景拍摄能力。支持8K视频录制，让用户轻松捕捉精彩瞬间。',
            '此外，这款手机还支持5G网络，Wi-Fi 6E，以及最新的快充技术，30分钟即可充电至80%。全新的操作系统带来了更流畅的交互体验和更多实用功能。',
            '品牌负责人表示："这款旗舰手机代表了我们对创新的不懈追求，我们致力于为用户提供最好的产品体验。"'
          ]
        },
        {
          id: 2,
          title: '品牌荣获年度最佳设计奖',
          date: '2025-12-10',
          image: 'https://picsum.photos/id/152/800/500',
          content: [
            '在刚刚结束的国际设计大赛中，我们的产品凭借卓越的设计理念和创新的工艺技术，荣获年度最佳设计奖。这是对我们设计团队不懈努力的肯定和鼓励。',
            '国际设计大赛是全球最具影响力的设计奖项之一，每年吸引来自世界各地的优秀设计作品参赛。我们的产品在众多参赛作品中脱颖而出，赢得了评委的高度评价。',
            '评委表示："该产品的设计融合了美学与功能性，创造出独特的视觉体验和使用感受。其创新的设计理念和精湛的工艺技术，代表了行业的最高水准。"',
            '品牌设计总监表示："我们始终坚持以用户为中心的设计理念，不断探索创新的设计语言。这个奖项是对我们团队的认可，也是对我们未来设计工作的激励。"',
            '未来，我们将继续秉承创新设计理念，为用户带来更多优秀的产品。'
          ]
        },
        {
          id: 3,
          title: '品牌举办全球开发者大会',
          date: '2025-12-05',
          image: 'https://picsum.photos/id/153/800/500',
          content: [
            '我们成功举办了全球开发者大会，邀请了来自世界各地的开发者、行业专家和合作伙伴，共同探讨技术创新和未来发展方向。',
            '本次大会以"创新未来"为主题，围绕人工智能、物联网、5G等前沿技术展开深入讨论。会上，我们发布了全新的开发者平台和工具，为开发者提供更强大的支持。',
            '品牌技术副总裁表示："开发者是推动技术创新的重要力量，我们致力于为开发者创造良好的生态环境，共同推动行业发展。"',
            '大会期间，还举办了多场技术论坛和 workshops，涵盖了移动开发、智能家居、AR/VR等多个领域。参会者纷纷表示，这次大会收获颇丰，对未来的技术发展有了更清晰的认识。',
            '我们将继续加强与开发者社区的合作，共同推动技术创新，为用户带来更好的产品和服务。'
          ]
        },
        {
          id: 4,
          title: '品牌推出全新生态系统',
          date: '2025-11-30',
          image: 'https://picsum.photos/id/154/800/500',
          content: [
            '我们正式推出全新生态系统，整合硬件、软件和服务，为用户提供无缝连接的智能生活体验。',
            '全新生态系统涵盖了手机、平板、耳机、手表、智能家居等多个领域，通过统一的系统和服务，实现设备间的智能联动。用户可以通过一个账号，在不同设备上享受一致的体验。',
            '生态系统的核心是全新的操作系统，它带来了更强大的性能、更流畅的交互体验和更多实用功能。同时，我们还推出了开放平台，欢迎更多合作伙伴加入，共同丰富生态内容。',
            '品牌CEO表示："生态系统是未来科技发展的趋势，我们将持续投入，打造完整的生态体系，为用户带来更便捷、更智能的生活方式。"',
            '未来，我们将继续推出更多生态产品和服务，不断完善生态系统，为用户创造更大的价值。'
          ]
        }
      ]
    }
  },
  computed: {
    currentNews() {
      const id = this.$route.params.id as string;
      return this.newsList.find(news => news.id === parseInt(id)) || undefined;
    },
    safeCurrentNews() {
      return this.currentNews || this.newsList[0];
    },
    relatedNews() {
      if (!this.currentNews) return [];
      return this.newsList.filter(news => news.id !== this.currentNews.id).slice(0, 3);
    }
  },
  methods: {
    goBack() {
      this.$router.push('/news');
    },
    goToNewsDetail(newsId: number) {
      this.$router.push(`/news/${newsId}`);
    }
  }
}
</script>

<style scoped>
.news-detail-header {
  padding: 80px 0 40px;
  background-color: #f8f9fa;
}

.back-btn {
  padding: 10px 20px;
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
  display: inline-block;
}

.back-btn:hover {
  border-color: #007bff;
  color: #007bff;
  transform: translateY(-2px);
}

.news-detail-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
  line-height: 1.3;
}

.news-detail-meta {
  margin-bottom: 30px;
}

.news-detail-date {
  color: #999;
  font-size: 1rem;
}

.news-detail-content {
  padding: 60px 0;
  background-color: white;
}

.news-detail-image {
  margin-bottom: 50px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.news-detail-image img {
  width: 100%;
  height: auto;
}

.news-detail-body {
  margin-bottom: 60px;
}

.news-detail-paragraph {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 25px;
  line-height: 1.7;
}

.related-news {
  padding: 40px 0;
  border-top: 1px solid #e0e0e0;
}

.related-news-title {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #333;
}

.related-news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.related-news-card {
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.related-news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.related-news-image {
  height: 150px;
  overflow: hidden;
}

.related-news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-news-card:hover .related-news-image img {
  transform: scale(1.05);
}

.related-news-content {
  padding: 25px;
}

.related-news-content h4 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.3;
}

.related-news-date {
  font-size: 0.9rem;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .news-detail-header {
    padding: 60px 20px 30px;
  }
  
  .news-detail-title {
    font-size: 2rem;
  }
  
  .news-detail-content {
    padding: 40px 20px;
  }
  
  .related-news-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .news-detail-title {
    font-size: 1.8rem;
  }
  
  .news-detail-paragraph {
    font-size: 1rem;
    margin-bottom: 20px;
  }
  
  .related-news-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .related-news-card {
    flex-direction: row;
  }
  
  .related-news-image {
    width: 150px;
    height: 100px;
  }
  
  .related-news-content {
    padding: 15px;
  }
  
  .related-news-content h4 {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
}
</style>
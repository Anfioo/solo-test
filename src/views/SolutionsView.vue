<template>
  <div class="solutions-view">
    <!-- 解决方案列表区 -->
    <section class="solutions-section">
      <div class="section-container">
        <h1 class="section-title">解决方案</h1>
        <p class="section-subtitle">为不同场景提供专业解决方案，让科技融入生活的方方面面</p>
        
        <div class="solutions-grid">
          <div 
            v-for="solution in solutions" 
            :key="solution.id"
            class="solution-card"
            @click="goToSolutionDetail(solution.id)"
          >
            <div class="solution-image">
              <img :src="solution.image" :alt="solution.name" />
              <div class="solution-overlay">
                <div class="overlay-content">
                  <h3>{{ solution.name }}</h3>
                  <p>{{ solution.description }}</p>
                  <button class="view-btn">查看详情</button>
                </div>
              </div>
            </div>
            <div class="solution-info">
              <h3 class="solution-name">{{ solution.name }}</h3>
              <p class="solution-tagline">{{ solution.tagline }}</p>
              <ul class="solution-features">
                <li v-for="(feature, index) in solution.features" :key="index">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SolutionsView',
  data() {
    return {
      // 解决方案数据
      solutions: [
        {
          id: 1,
          name: '智能办公解决方案',
          tagline: '提升效率，简化工作流程',
          description: '为现代办公环境打造的智能解决方案，让工作更高效、更便捷',
          image: 'https://picsum.photos/id/71/400/250',
          features: [
            '智能平板 + 无线键盘，轻办公首选',
            '多设备协同，数据无缝同步',
            '智能音箱，语音控制办公设备',
            '高清视频会议，远程办公更高效'
          ]
        },
        {
          id: 2,
          name: '家庭娱乐解决方案',
          tagline: '沉浸式体验，享受家庭时光',
          description: '打造全方位的家庭娱乐体验，让每个角落都充满乐趣',
          image: 'https://picsum.photos/id/72/400/250',
          features: [
            '智能电视 + 无线耳机，私人影院体验',
            '智能音箱，语音控制娱乐设备',
            '游戏手柄，畅玩各类游戏',
            '多设备联动，打造智能家庭影院'
          ]
        },
        {
          id: 3,
          name: '运动健康解决方案',
          tagline: '科技助力，健康生活',
          description: '专业的运动健康解决方案，帮助你更好地管理健康，提升运动表现',
          image: 'https://picsum.photos/id/73/400/250',
          features: [
            '智能手表，实时监测健康数据',
            '无线耳机，运动时享受音乐',
            '运动APP，科学制定运动计划',
            '数据分析，优化运动效果'
          ]
        },
        {
          id: 4,
          name: '智能家居解决方案',
          tagline: '智能生活，触手可及',
          description: '打造安全、便捷、舒适的智能家居环境，让科技服务生活',
          image: 'https://picsum.photos/id/74/400/250',
          features: [
            '智能音箱，语音控制智能家居',
            '智能灯光，营造不同氛围',
            '智能门锁，安全便捷',
            '智能摄像头，守护家庭安全'
          ]
        }
      ]
    }
  },
  methods: {
    // 跳转到解决方案详情页
    goToSolutionDetail(solutionId) {
      this.$router.push(`/solution/${solutionId}`)
    }
  }
}
</script>

<style scoped>
/* 解决方案列表页样式 */
.solutions-section {
  padding: 80px 0;
  background-color: white;
}

.section-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.section-subtitle {
  font-size: 1.2rem;
  text-align: center;
  color: #666;
  margin-bottom: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
}

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.solution-card {
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.solution-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.solution-image {
  position: relative;
  height: 250px;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
}

.solution-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.solution-card:hover .solution-image img {
  transform: scale(1.05);
}

.solution-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  padding: 30px;
}

.solution-card:hover .solution-overlay {
  opacity: 1;
}

.overlay-content {
  color: white;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.solution-card:hover .overlay-content {
  transform: translateY(0);
}

.overlay-content h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.overlay-content p {
  margin-bottom: 20px;
  font-size: 0.95rem;
  line-height: 1.4;
}

.view-btn {
  padding: 10px 25px;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.view-btn:hover {
  background-color: white;
  color: #000;
  transform: translateY(-2px);
}

.solution-info {
  padding: 30px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.solution-name {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.solution-tagline {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.4;
}

.solution-features {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.solution-features li {
  padding: 8px 0;
  font-size: 0.95rem;
  color: #666;
  position: relative;
  padding-left: 25px;
  line-height: 1.4;
}

.solution-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #007bff;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .solutions-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .solutions-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
  
  .solutions-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .solution-image {
    height: 200px;
  }
  
  .solution-info {
    padding: 25px;
  }
  
  .solution-name {
    font-size: 1.3rem;
  }
}
</style>
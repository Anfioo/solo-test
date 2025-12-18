import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetailView.vue')
  },
  {
    path: '/solutions',
    name: 'Solutions',
    component: () => import('../views/SolutionsView.vue')
  },
  {
    path: '/solution/:id',
    name: 'SolutionDetail',
    component: () => import('../views/SolutionDetailView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('../views/SupportView.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/NewsView.vue')
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: () => import('../views/NewsDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

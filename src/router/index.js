import { createRouter, createWebHistory } from 'vue-router'
import StockViewView from '../views/StockView.vue'
import CategoryView from '@/views/CategoryView.vue'
import UserView from '@/views/UserView.vue'
import BookView from '@/views/BookView.vue'
import BorrowView from '../views/BorrowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Stocks',
      component: StockViewView,
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
    },
    {
      path: '/book',
      name: 'book',
      component: BookView,
    },
    {
      path: '/borrow',
      name: 'borrow',
      component: BorrowView,
    },

  ],
})

export default router

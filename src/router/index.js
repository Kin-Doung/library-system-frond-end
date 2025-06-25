import { createRouter, createWebHistory } from 'vue-router'
// category
import StockViewView from '../views/StockView.vue'
import CategoryView from '@/views/CategoryView.vue'
import UserView from '@/views/UserView.vue'
import BookView from '@/views/BookView.vue'

import BorrowView from '../views/BorrowView.vue'
import CategoryEdit from '../components/categories/CategoryEdit.vue'
import CategoryViewDetail from '../components/categories/CategoryViewDetail.vue'
import CreateCategory from '../components/categories/CreateCategory.vue'
// Book




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Stocks', component: StockViewView },
    { path: '/category', name: 'category', component: CategoryView },
    { path: '/category/create', name: 'category.create', component: CreateCategory },
    { path: '/category/:id/edit', name: 'category.edit', component: CategoryEdit },
    { path: '/category/:id/view', name: 'category.view', component: CategoryViewDetail },


    { path: '/user', name: 'user', component: UserView },


    { path: '/book', name: 'book', component: BookView },



    { path: '/borrow', name: 'borrow', component: BorrowView },
  ],
});

export default router
<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const isActive = (to) => route.path === to ? 'bg-blue-600 text-white' : 'text-gray-200 hover:bg-gray-700'
</script>

<template>
  <aside class="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0 flex flex-col shadow-lg">
    <div class="text-center text-xl font-bold py-4 border-b border-gray-700">
      📚 My App
    </div>

    <nav class="flex-1 px-4 py-6 space-y-2">
      <RouterLink
        to="/"
        class="block px-4 py-2 rounded transition duration-200"
        :class="isActive('/')"
      >
        📦 Stocks
      </RouterLink>
      <RouterLink
        to="/category"
        class="block px-4 py-2 rounded transition duration-200"
        :class="isActive('/category')"
      >
        📂 Category
      </RouterLink>
      <RouterLink
        to="/book"
        class="block px-4 py-2 rounded transition duration-200"
        :class="isActive('/book')"
      >
        📘 Book
      </RouterLink>
      <RouterLink
        to="/user"
        class="block px-4 py-2 rounded transition duration-200"
        :class="isActive('/user')"
      >
        👤 User
      </RouterLink>
      <RouterLink
        to="/borrow"
        class="block px-4 py-2 rounded transition duration-200"
        :class="isActive('/borrow')"
      >
        📥 Borrow
      </RouterLink>
    </nav>
  </aside>
</template>

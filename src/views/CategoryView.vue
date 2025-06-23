
<script setup>
import { onMounted, ref } from 'vue'
import api from '@/plugins/axios'

const categories = ref([])
onMounted(async () => {
  try {
    const response = await api.get('/categories')
    categories.value = response.data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
  }
})
</script>
<template>
  <h1 class="text-red-500">Hello</h1>
</template>

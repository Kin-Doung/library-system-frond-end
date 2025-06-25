<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">Category Details</h2>
    <div class="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div>
        <strong class="text-gray-700">ID:</strong>
        <span class="ml-2">{{ category.id }}</span>
      </div>
      <div>
        <strong class="text-gray-700">Title:</strong>
        <span class="ml-2">{{ category.title }}</span>
      </div>
      <div>
        <strong class="text-gray-700">Stock Name:</strong>
        <span class="ml-2">{{ category.stock?.name || 'N/A' }}</span>
      </div>
      <button
        @click="goBack"
        class="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Back to List
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/components/plugin/axios'

const route = useRoute()
const router = useRouter()
const category = ref({ id: route.params.id, title: '', stock: { name: '' } })

onMounted(async () => {
  await fetchCategory()
})

async function fetchCategory() {
  try {
    const { data } = await api.get(`/category/${route.params.id}`)
    category.value = data
  } catch (err) {
    console.error('Error fetching category details:', err)
  }
}

function goBack() {
  router.push({ name: 'category' }) // Redirect to category list
}
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
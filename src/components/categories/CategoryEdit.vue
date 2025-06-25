<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">Edit Category</h2>
    <form @submit.prevent="saveCategory" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          v-model="category.title"
          id="title"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Save Changes
      </button>
      <button
        type="button"
        @click="cancel"
        class="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        Cancel
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/components/plugin/axios'

const route = useRoute()
const router = useRouter()
const category = ref({
  id: route.params.id,
  title: '',
  stock: { name: '' }
})

onMounted(async () => {
  await fetchCategory()
})

async function fetchCategory() {
  try {
    const { data } = await api.get(`/category/${route.params.id}`)
    category.value = data
  } catch (err) {
    console.error('Error fetching category:', err)
  }
}

async function saveCategory() {
  try {
    await api.put(`/category/${route.params.id}`, category.value)
    router.push({ name: 'category' }) // Redirect to category list
  } catch (err) {
    console.error('Error saving category:', err)
  }
}

function cancel() {
  router.push({ name: 'category' }) // Redirect to category list
}
</script>

<style scoped>
/* Optional: Add custom styles if needed */
</style>
<template>
  <div class="p-6 max-w-2xl mx-auto">
    <p v-if="loading" class="text-center text-gray-500 p-4">Submitting...</p>
    <p v-if="error" class="text-center text-red-500 p-4 mb-4">
      Failed to create category: {{ error.message }}
    </p>
    <p v-if="success" class="text-center text-green-500 p-4 mb-4">
      Category created successfully!
    </p>
    <form @submit.prevent="submitForm" class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 class="text-lg font-semibold mb-4">Create New Category</h2>
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          v-model="form.title"
          type="text"
          id="title"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter category title"
          required
        />
      </div>
      <div class="mb-4">
        <label for="stock_id" class="block text-sm font-medium text-gray-700 mb-1">Stock Id</label>
        <input
          v-model="form.stock_id"
          type="text"
          id="stock_id"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter category title"
          required
        />
      </div>

      <div class="flex gap-4">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          :disabled="loading"
        >
          Create Category
        </button>
        <button
          type="button"
          @click="cancel"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/components/plugin/axios'

const router = useRouter()
const loading = ref(false)

const error = ref(null)
const success = ref(false)
const form = ref({
  title: '',
  stockName: ''
})

async function submitForm() {
  loading.value = true
  error.value = null
  success.value = false
  try {
    const payload = {
      title: form.value.title,
      stock: form.value.stockName ? { name: form.value.stockName } : null
    }
    await api.post('/category', payload)
    success.value = true
    form.value.title = ''
    form.value.stockName = ''
    console.log('Category created successfully')
    setTimeout(() => {
      router.push({ name: 'category' })
    }, 2000)
  } catch (err) {
    error.value = err
    console.error('Error creating category:', err)
  } finally {
    loading.value = false
  }
}

function cancel() {
  router.push({ name: 'category' })
}
</script>
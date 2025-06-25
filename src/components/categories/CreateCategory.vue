<template>
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
      <label for="stock_id" class="block text-sm font-medium text-gray-700 mb-1">Stock ID</label>
      <input
        v-model="form.stock_id"
        type="number"
        id="stock_id"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter stock ID"
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
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        title: '',
        stock_id: ''
      },
      loading: false
    }
  },
  methods: {
    async submitForm() {
      this.loading = true
      try {
        const response = await axios.post('http://localhost:8000/api/categories', this.form)
        alert('Category created successfully!')
        console.log(response.data)
        this.form.title = ''
        this.form.stock_id = ''
      } catch (error) {
        console.error(error.response?.data || error.message)
        alert('Failed to create category.')
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.form.title = ''
      this.form.stock_id = ''
    }
  }
}
</script>

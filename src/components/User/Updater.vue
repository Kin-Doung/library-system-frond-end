<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/components/plugin/axios'

const route = useRoute()
const router = useRouter()
const userId = route.params.id

const form = ref({
  name: '',
  email: '',
  password: ''
})
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await api.get(`/user/${userId}`)
    form.value = { ...data }
  } catch (err) {
    console.error('Failed to fetch user:', err)
  } finally {
    loading.value = false
  }
})

const submitUpdate = async () => {
  try {
    await api.put(`/user/${userId}`, form.value)
    alert('User updated successfully!')
    router.push('/') // Redirect back to user table
  } catch (err) {
    console.error('Error updating user:', err)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
    <h2 class="text-2xl font-bold mb-4">Update User</h2>

    <div v-if="loading" class="text-gray-500 text-center">Loading...</div>

    <form v-else @submit.prevent="submitUpdate">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Name</label>
        <input v-model="form.name" required class="w-full border px-3 py-2 rounded" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Email</label>
        <input v-model="form.email" required type="email" class="w-full border px-3 py-2 rounded" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">Password</label>
        <input v-model="form.password" required type="password" class="w-full border px-3 py-2 rounded" />
      </div>
      <div class="flex justify-end space-x-2">
        <button @click="router.back()" type="button" class="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
      </div>
    </form>
  </div>
</template>

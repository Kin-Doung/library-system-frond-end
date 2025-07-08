<script setup>
import { ref, onMounted } from 'vue'
import api from '@/components/plugin/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const users = ref([])
const loading = ref(true)
const newUser = ref({ name: '', email: '', password: '' })

onMounted(async () => {
  await fetchUsers()
})

const fetchUsers = async () => {
  loading.value = true
  try {
    const { data } = await api.get('/user')
    users.value = data
  } catch (err) {
    console.error('Error fetching users:', err)
    toast.error('Failed to load users.')
  } finally {
    loading.value = false
  }
}

const createUser = async () => {
  try {
    const { data } = await api.post('/user', newUser.value)
    users.value.push(data)
    newUser.value = { name: '', email: '', password: '' }
    toast.success('User created successfully!')
  } catch (err) {
    console.error('Error creating user:', err)
    toast.error('Failed to create user.')
  }
}

const deleteUser = async (id) => {
  try {
    await api.delete(`/user/${id}`)
    users.value = users.value.filter(user => user.id !== id)
    toast.success('User deleted successfully!')
  } catch (err) {
    console.error('Error deleting user:', err)
    toast.error('Failed to delete user.')
  }
}

const updateUser = async (user) => {
  const updatedName = prompt('Edit name', user.name)
  const updatedEmail = prompt('Edit email', user.email)

  if (updatedName && updatedEmail) {
    try {
      const { data } = await api.put(`/user/${user.id}`, {
        ...user,
        name: updatedName,
        email: updatedEmail,
      })
      users.value = users.value.map(u => u.id === user.id ? data : u)
      toast.success('User updated successfully!')
    } catch (err) {
      console.error('Error updating user:', err)
      toast.error('Failed to update user.')
    }
  }
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">User Table</h1>

    <!-- Create New User Form -->
    <div class="mb-6 bg-gray-100 p-4 rounded">
      <h2 class="text-lg font-semibold mb-2">Create New User</h2>
      <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <input v-model="newUser.name" type="text" placeholder="Name" class="border px-2 py-1 rounded w-full sm:w-auto" />
        <input v-model="newUser.email" type="email" placeholder="Email" class="border px-2 py-1 rounded w-full sm:w-auto" />
        <input v-model="newUser.password" type="password" placeholder="Password" class="border px-2 py-1 rounded w-full sm:w-auto" />
        <button @click="createUser" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">Create</button>
      </div>
    </div>

    <!-- Users Table -->
    <div class="overflow-x-auto bg-white shadow rounded-lg">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.password }}</td>
            <td class="px-4 py-2 flex space-x-2 justify-center">
              <button @click="() => updateUser(user)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">Update</button>
              <button @click="() => deleteUser(user.id)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loading" class="mt-4 text-center text-gray-500">Loading users...</div>
  </div>
</template>

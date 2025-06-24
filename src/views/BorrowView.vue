<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-center text-indigo-700">Borrowed Books</h1>

    <!-- Loading State -->
    <div v-if="loading" class="text-center text-gray-500 p-4">Loading...</div>

    <!-- Empty State -->
    <div v-else-if="borrow.length === 0" class="text-center text-gray-500 p-4">
      No borrowed books found.
    </div>

    <!-- Data Table -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-2 text-left border-b">ID</th>
            <th class="px-4 py-2 text-left border-b">User Name</th>
            <th class="px-4 py-2 text-left border-b">Book Name</th>
            <th class="px-4 py-2 text-left border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in borrow"
            :key="item.id"
            class="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <td class="px-4 py-2">{{ item.id }}</td>
            <td class="px-4 py-2">{{ item.user.name }}</td>
            <td class="px-4 py-2">{{ item.book.name }}</td>
            <td class="px-4 py-2 flex gap-2 justify-center">
              <button @click="showItem(item)" class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Show</button>
              <button @click="editItem(item)" class="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
              <button @click="deleteItem(item.id)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import api from "@/components/plugin/axios";

const borrow = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        const { data } = await api.get("/borrow");
        console.log("API response:", data);
        borrow.value = data;
    } catch (err) {
        console.error("Error fetching data:", err);
    } finally {
        loading.value = false;
    }
});
</script>
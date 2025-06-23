<template>
  <div v-if="loading" class="text-center text-gray-500 p-4">Loading...</div>

  <div
    v-else-if="categories.length === 0"
    class="text-center text-gray-500 p-4"
  >
    No data found.
  </div>

  <div v-else class="overflow-x-auto">
    <table
      class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <thead class="bg-gray-100 text-gray-700">
        <tr>
          <th class="px-4 py-2 text-left border-b">ID</th>
          <th class="px-4 py-2 text-left border-b">Title</th>
          <th class="px-4 py-2 text-left border-b">Stock Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in categories"
          :key="item.id"
          class="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
        >
          <td class="px-4 py-2">{{ item.id }}</td>
          <td class="px-4 py-2">{{ item.title }}</td>
          <td class="px-4 py-2">{{ item.stock.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/components/plugin/axios";

const categories = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await api.get("/category");
    console.log("API response:", data);
    categories.value = data;
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    loading.value = false;
  }
});
</script>
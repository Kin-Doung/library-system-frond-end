<script setup>
import { ref, onMounted } from "vue";
import api from "@/components/plugin/axios";

const categories = ref([]);
const loading = ref(true);

onMounted(async () => {
  await fetchCategories();
});

const fetchCategories = async () => {
  loading.value = true;
  try {
    const { data } = await api.get("/category");
    categories.value = data;
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    loading.value = false;
  }
};

const deleteCategory = async (id) => {
  try {
    await api.delete(`/category/${id}`);
    categories.value = categories.value.filter(cat => cat.id !== id);
  } catch (err) {
    console.error("Error deleting category:", err);
  }
};

const updateCategory = (category) => {
  alert(`Update category: ${category.title}`);
};
</script>

<template>
  <div v-if="loading" class="text-center text-gray-500 p-4">Loading...</div>

  <div v-else-if="categories.length === 0" class="text-center text-gray-500 p-4">
    No data found.
  </div>

  <div v-else class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <thead class="bg-gray-100 text-gray-700">
        <tr>
          <th class="px-4 py-2 text-left border-b">ID</th>
          <th class="px-4 py-2 text-left border-b">Title</th>
          <th class="px-4 py-2 text-left border-b">Stock Name</th>
          <th class="px-4 py-2 text-center border-b">Actions</th>
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
          <td class="px-4 py-2">{{ item.stock?.name || 'N/A' }}</td>
          <td class="px-4 py-2 text-center space-x-2">
            <button
              @click="updateCategory(item)"
              class="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
            >
              Update
            </button>
            <button
              @click="deleteCategory(item.id)"
              class="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

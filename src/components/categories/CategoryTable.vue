<!-- CategoryTable.vue -->
<template>
  <!-- 1) Loading / empty states -->
  <p v-if="loading" class="text-center text-gray-500 p-4">Loading…</p>
  <p
    v-else-if="categories.length === 0 && !error"
    class="text-center text-gray-500 p-4"
  >
    No data found.
  </p>
  <p v-else-if="error" class="text-center text-red-500 p-4">
    Failed to load data: {{ error.message }}
    <button
      @click="fetchCategories"
      class="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Retry
    </button>
  </p>

  <!-- 2) Table -->
  <div v-else class="overflow-x-auto">
    <div class="mb-4">
      <button
        @click="createCategory"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create New Category
      </button>
    </div>
    <table
      class="min-w-full bg-white rounded-lg border border-gray-200 shadow-sm"
    >
      <thead class="bg-gray-100 text-sm text-gray-700">
        <tr>
          <th class="px-4 py-2 text-left border-b">ID</th>
          <th class="px-4 py-2 text-left border-b">Title</th>
          <th class="px-4 py-2 text-left border-b">Stock Name</th>
          <th class="px-4 py-2 text-left border-b w-48">Action</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr
          v-for="(item, index) in categories"
          :key="index"
          class="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
        >
          <td class="px-4 py-2">{{ index + 1 }}</td>
          <td class="px-4 py-2">{{ item.title }}</td>
          <td class="px-4 py-2">{{ item.stock?.name || "-" }}</td>
          <td class="px-4 py-2 flex gap-2">
            <button
              class="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              @click="deleteCategory(item.id)"
            >
              Delete
            </button>
            <button
              class="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              @click="editCategory(item.id)"
            >
              Edit
            </button>
            <button
              class="px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600"
              @click="viewCategory(item.id)"
            >
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/components/plugin/axios";
import { useRouter } from "vue-router";

const categories = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();

onMounted(async () => {
  await fetchCategories();
});

async function fetchCategories() {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await api.get('/category');
    categories.value = data;
    console.log('Fetched categories:', categories.value);
  } catch (err) {
    error.value = err;
    console.error('Error fetching data:', err);
  } finally {
    loading.value = false;
  }
}

async function deleteCategory(id) {
  if (!confirm("Are you sure you want to delete this category?")) return;
  try {
    await api.delete(`/category/${id}`);
    categories.value = categories.value.filter((cat) => cat.id !== id);
    console.log("Deleted category with ID:", id);
  } catch (err) {
    error.value = err;
    console.error("Delete failed:", err);
  }
}

function editCategory(id) {
  console.log("Edit clicked for ID:", id);
  try {
    router.push({ name: "category.edit", params: { id } });
  } catch (err) {
    console.error("Navigation to edit failed:", err);
    error.value = {
      message: "Failed to navigate to edit page. Check router configuration.",
    };
  }
}

function viewCategory(id) {
  console.log("View clicked for ID:", id);
  try {
    router.push({ name: "category.view", params: { id } });
  } catch (err) {
    console.error("Navigation to view failed:", err);
    error.value = {
      message: "Failed to navigate to view page. Check router configuration.",
    };
  }
}

function createCategory() {
  console.log("Create category clicked");
  try {
    router.push({ name: "category.create" });
  } catch (err) {
    console.error("Navigation to create failed:", err);
    error.value = {
      message: "Failed to navigate to create page. Check router configuration.",
    };
  }
}
</script>
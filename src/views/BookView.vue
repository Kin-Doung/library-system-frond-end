<template>
  <div>
    <div v-if="loading" class="text-center text-gray-500 py-10">
      Loading...
    </div>

    <div v-else-if="books.length === 0" class="text-center text-gray-500 py-10">
      No books found.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="stock in books"
        :key="stock.id"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        <div class="text-sm text-gray-400 mb-1">Stock ID</div>
        <div class="text-xl font-semibold mb-3">{{ stock.id }}</div>

        <div class="text-sm text-gray-400 mb-1">Name</div>
        <div class="text-lg font-medium text-indigo-600 mb-4">{{ stock.name }}</div>

        <div class="flex space-x-2">
          <button
            @click="updateStock(stock)"
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
          >
            Update
          </button>
          <button
            @click="deleteStock(stock.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/components/plugin/axios';

const books = ref([]);
const loading = ref(true);

onMounted(async () => {
  await fetchbooks()
});

const fetchbooks = async () => {
  loading.value = true;
  try {
    const { data } = await api.get('/books'); // Replace with your API endpoint
    books.value = data;
  } catch (err) {
    console.error('Error fetching books:', err);
  } finally {
    loading.value = false;
  }
};

const deleteStock = async (id) => {
  try {
    await api.delete(`/books/${id}`);
    books.value = books.value.filter(stock => stock.id !== id);
  } catch (err) {
    console.error('Error deleting stock:', err);
  }
};

const updateStock = (stock) => {
  // You can replace this alert with a modal or form
  alert(`Update stock: ${stock.name}`);
};
</script>


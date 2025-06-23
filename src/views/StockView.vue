<template>
  <div>
    <div v-if="loading" class="text-center text-gray-500 py-10">
      Loading...
    </div>

    <div v-else-if="stocks.length === 0" class="text-center text-gray-500 py-10">
      No stocks found.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="stock in stocks"
        :key="stock.id"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div class="text-sm text-gray-400 mb-1">Stock ID</div>
        <div class="text-xl font-semibold mb-3">{{ stock.id }}</div>

        <div class="text-sm text-gray-400 mb-1">Name</div>
        <div class="text-lg font-medium text-indigo-600">{{ stock.name }}</div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import api from '@/components/plugin/axios';

const stocks = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data } = await api.get('/stocks'); // Adjust endpoint as needed
    stocks.value = data;
  } catch (err) {
    console.error('Error fetching stocks:', err);
  } finally {
    loading.value = false;
  }
});
</script>
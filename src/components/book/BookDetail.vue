<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Book Details</h2>
    <p v-if="loading" class="text-center text-gray-500">Loading book…</p>
    <p v-if="error" class="text-center text-red-500">{{ error }}</p>
    <div v-if="book" class="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h3 class="text-xl font-semibold mb-2">{{ book.name }}</h3>
      <p><strong>ID:</strong> {{ book.id }}</p>
      <p><strong>Category:</strong> {{ book.category?.title || "N/A" }}</p>
      <button
        @click="$router.push('/book')"
        class="mt-4 px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600"
      >
        Back to Book List
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/components/plugin/axios';

const route = useRoute();
const book = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchBook = async () => {
  try {
    loading.value = true;
    const response = await api.get(`/books/${route.params.id}`);
    book.value = response.data.data || response.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load book.';
    console.error('Error loading book:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBook);

</script>
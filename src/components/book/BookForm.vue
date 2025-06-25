<template>
  <form @submit.prevent="handleSubmit">
    <!-- Name input -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <input
        v-model="form.name"
        type="text"
        class="mt-1 block w-full border border-gray-300 rounded-md p-2"
        :class="{ 'border-red-500': errors.name }"
        required
      />
      <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
    </div>

    <!-- Category select -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Category</label>
      <select
        v-model="form.categoryId"
        class="mt-1 block w-full border border-gray-300 rounded-md p-2"
        :class="{ 'border-red-500': errors.categoryId }"
        required
      >
        <option value="" disabled>Select a category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.title }}
        </option>
      </select>
      <p v-if="errors.categoryId" class="text-red-500 text-sm mt-1">{{ errors.categoryId }}</p>
    </div>

    <!-- API Error -->
    <p v-if="errors.api" class="text-red-500 text-sm mb-4">{{ errors.api }}</p>

    <!-- Buttons -->
    <div class="flex justify-end gap-2">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-sm text-white bg-indigo-500 rounded hover:bg-indigo-600"
      >
        {{ isEditing ? 'Update' : 'Create' }}
      </button>
    </div>
  </form>

  <!-- ✅ Submitted Data Card -->
  <div v-if="submittedData" class="mt-6 p-4 border rounded-lg shadow bg-white">
    <h2 class="text-lg font-semibold mb-2 text-indigo-600">Submitted Data</h2>
    <p><strong>Name:</strong> {{ submittedData.name }}</p>
    <p>
      <strong>Category:</strong>
      {{ categories.find(cat => cat.id === submittedData.categoryId)?.title || 'Unknown' }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import api from '@/components/plugin/axios';

const props = defineProps({
  book: { type: Object, default: () => ({ id: null, name: '', categoryId: '' }) },
  isEditing: { type: Boolean, default: false },
});

const emit = defineEmits(['submit', 'cancel']);

const form = ref({ ...props.book });
const errors = ref({});
const categories = ref([]);
const submittedData = ref(null); // ✅ new variable for displaying result

const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    categories.value = response.data;
  } catch (err) {
    errors.value.api = 'Failed to load categories.';
  }
};

const validateForm = () => {
  errors.value = {};
  let isValid = true;
  if (!form.value.name.trim()) {
    errors.value.name = 'Book name is required.';
    isValid = false;
  }
  if (!form.value.categoryId) {
    errors.value.categoryId = 'Please select a category.';
    isValid = false;
  }
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  try {
    submittedData.value = { ...form.value }; // ✅ store submitted data
    emit('submit', form.value); // still emit for parent component
  } catch (err) {
    errors.value.api = err.response?.data?.message || 'Operation failed.';
  }
};

watch(() => props.book, (newBook) => {
  form.value = { ...newBook };
});

fetchCategories();
</script>

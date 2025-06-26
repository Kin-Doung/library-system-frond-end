<template>
  <table class="table-auto w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-200">
        <th class="border border-gray-300 px-4 py-2">ID</th>
        <th class="border border-gray-300 px-4 py-2">User Name</th>
        <th class="border border-gray-300 px-4 py-2">Book Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(book, index) in books" :key="index">
        <td class="border border-gray-300 px-4 py-2">{{ book.id }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ book.username }}</td>
        <td class="border border-gray-300 px-4 py-2">{{ book.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/components/plugin/axios";

const books = ref([]);

// Fetch data from API
const fetchBooks = async () => {
  try {
    const response = await api.get("/borrow"); // Change to your API endpoint
    books.value = response.data;
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }
};

onMounted(fetchBooks);
</script>

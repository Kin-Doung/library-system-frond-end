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
import { ref, onMounted } from "vue";
import api from "@/components/plugin/axios";
import { useRouter } from "vue-router";

const books = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();
const showForm = ref(false);
const isEditing = ref(false);
const form = ref({
  id: null,
  name: "",
  category: "",
});

// Fetch all books from the API
const fetchBooks = async () => {
  try {
    loading.value = true;
    const response = await api.get("/books");
    console.log("Books response:", response.data); // Debug log
    books.value = response.data.data || response.data;
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load books.";
    console.error("Error loading books:", err);
  } finally {
    loading.value = false;
  }
};

// Open form for creating a new book
const openCreateForm = () => {
  isEditing.value = false;
  form.value = { id: null, name: "", category: "" };
  error.value = null;
  showForm.value = true;
};

// Open form for editing an existing book
const handleEdit = (book) => {
  isEditing.value = true;
  form.value = {
    id: book.id,
    name: book.name,
    category: book.category?.title || "",
  };
  error.value = null;
  showForm.value = true;
};

// Close the form and reset state
const closeForm = () => {
  showForm.value = false;
  form.value = { id: null, name: "", category: "" };
  error.value = null;
};

// Handle form submission for create/update
const handleSubmit = async () => {
  if (!form.value.name.trim()) {
    error.value = "Book name is required.";
    return;
  }
  try {
    const payload = {
      name: form.value.name,
      category: form.value.category ? { title: form.value.category } : null,
    };
    if (isEditing.value) {
      if (!form.value.id) {
        error.value = "Invalid book ID.";
        return;
      }
      await api.put(`/books/${form.value.id}`, payload);
      alert("Book updated successfully!");
    } else {
      await api.post("/books", payload);
      alert("Book created successfully!");
    }
    await fetchBooks();
    closeForm();
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to save book.";
    console.error("Error saving book:", err);
  }
};

// Handle book deletion
const handleDelete = async (id) => {
  if (confirm("Are you sure you want to delete this book?")) {
    try {
      await api.delete(`/books/${id}`);
      alert("Book deleted successfully!");
      await fetchBooks();
    } catch (err) {
      error.value = err.response?.status === 404 ? "Book not found." : "Failed to delete book.";
      console.error("Error deleting book:", err);
    }
  }
};

// Handle view action (temporary workaround since /books/:id route is missing)
const handleView = (book) => {
  alert(`Viewing book: ${book.name} (ID: ${book.id})`); // Fallback until route is added
  // Alternatively, fetch and display book details in a modal (see below)
};

// Fetch books on component mount
onMounted(fetchBooks);
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Book List</h2>

    <!-- Add Book Button -->
    <div class="mb-4">
      <button
        @click="openCreateForm"
        class="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-600"
      >
        Add New Book
      </button>
    </div>

    <!-- Loading and Error States -->
    <p v-if="loading" class="text-center text-gray-500">Loading books…</p>
    <p v-if="error && !showForm" class="text-center text-red-500">{{ error }}</p>

    <!-- Book Table -->
    <div
      v-if="!loading && books.length"
      class="overflow-x-auto rounded-lg shadow border border-gray-200"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th class="py-3 px-4">ID</th>
            <th class="py-3 px-4">Name</th>
            <th class="py-3 px-4">Category</th>
            <th class="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr
            v-for="(book, index) in books"
            :key="book.id"
            class="hover:bg-gray-50"
          >
            <td class="py-3 px-4 text-gray-700">{{ index + 1 }}</td>
            <td class="py-3 px-4 text-gray-800">{{ book.name }}</td>
            <td class="py-3 px-4 text-gray-600">
              {{ book.category?.title || "N/A" }}
            </td>
            <td class="py-3 px-4 text-gray-600 flex gap-2">
              <button
                @click="handleView(book)"
                class="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                View
              </button>
              <button
                @click="handleEdit(book)"
                class="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                @click="handleDelete(book.id)"
                class="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No Books Found -->
    <p
      v-if="!loading && books.length === 0"
      class="text-center text-gray-500"
    >
      No books found.
    </p>

    <!-- Book Form Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4">
          {{ isEditing ? "Edit Book" : "Add Book" }}
        </h3>
        <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="form.name"
              type="text"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeForm"
              class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm text-white bg-indigo-500 rounded hover:bg-indigo-600"
            >
              {{ isEditing ? "Update" : "Create" }}
            </button>
          </div>
        </form>
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

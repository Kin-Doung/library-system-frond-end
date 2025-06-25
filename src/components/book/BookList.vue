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
    <p v-if="error" class="text-center text-red-500">Error: {{ error }}</p>

    <!-- Book Table -->
    <div
      v-if="!loading && books.length"
      class="overflow-x-auto rounded-lg shadow border border-gray-200"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead
          class="bg-gray-100 text-sm font-semibold text-gray-700 text-left"
        >
          <tr>
            <th class="px-3 py-2">ID</th>
            <th class="px-3 py-2">Title</th>
            <th class="px-3 py-2">Category</th>
            <th class="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="book in books" :key="book.id" class="hover:bg-gray-50">
            <td class="px-3 py-2 text-gray-700">{{ book.id }}</td>
            <td class="px-3 py-2 text-gray-800">{{ book.title }}</td>
            <!-- <td class="px-3 py-3 text-gray-600">
              {{ book.category?.title || "N/A" }}
            </td>-->
            <td class="px-3 py-2 text-gray-600 flex gap-2">
              <button
                @click="handleView(book)"
                class="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                View
              </button>
              <button
                @click="handleEdit(book.id)"
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
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <input
                v-model="form.title"
                type="text"
                class="form-control"
                :class="{ 'border-red-500': formErrors.title }"
                required
              />
              <p v-if="formErrors.title" class="text-red-500 text-sm mt-1">
                {{ formErrors.title }}
              </p>
            </div>
            <!-- <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700"
              >Category</label
            >
            <select
              v-model="form.categoryId"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2"
              :class="{ 'border-red-500': formErrors.categoryId }"
              required
            >
              <option value="" disabled>Select a category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.title }}
              </option>
            </select>
            <p v-if="formErrors.categoryId" class="text-red-500 text-sm mt-1">
              {{ formErrors.categoryId }}
            </p>
          </div> -->
            <p v-if="formErrors.api" class="text-red-500 text-sm mb-4">
              {{ formErrors.api }}
            </p>
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

      <!-- View Book Modal -->
      <div
        v-if="showViewModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-white p-6 rounded-lg w-full max-w-md">
          <h3 class="text-xl font-semibold mb-4">Book Details</h3>
          <p><strong>Title:</strong> {{ selectedBook.title }}</p>
          <!-- <p><strong>Category:</strong> {{ selectedBook.category?.title || "N/A" }}</p> -->
          <div class="flex justify-end mt-4">
            <button
              @click="showViewModal = false"
              class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/components/plugin/axios";


const books = ref([]);
const categories = ref([]);
const loading = ref(true);
const error = ref(null);
const form = ref({ id: null, title: "", categoryId: "" });
const formErrors = ref({});
const showForm = ref(false);
const isEditing = ref(false);
const showViewModal = ref(false);
const selectedBook = ref({});

const fetchBooks = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await api.get("/books");
    books.value = response.data;
  } catch (err) {
    error.value = err.message || "Failed to load books.";
    console.error("Error loading books:", err);
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    categories.value = response.data;
  } catch (err) {
    console.error("Error loading categories:", err);
  }
};

const validateForm = () => {
  formErrors.value = {};
  let isValid = true;

  if (!form.value.title.trim()) {
    formErrors.value.title = "Book title is required.";
    isValid = false;
  }
  // if (!form.value.categoryId) {
  //   formErrors.value.categoryId = "Please select a category.";
  //   isValid = false;
  // }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    formErrors.value.api = null;
    const payload = {
      title: form.value.title,
      categoryId: form.value.categoryId,
    };

    if (isEditing.value) {
      await api.put(`/books/${form.value.id}`, payload);
    } else {
      await api.post("/books", payload);
    }
    closeForm();
    fetchBooks();
  } catch (err) {
    formErrors.value.api = err.response?.data?.message || "Operation failed.";
    console.error("Error submitting form:", err);
  }
};

const handleView = (book) => {
  selectedBook.value = book;
  showViewModal.value = true;
};

const handleEdit = (book) => {
  form.value = {
    id: book.id,
    title: book.title,
    categoryId: book.category?.id || "",
  };
  isEditing.value = true;
  showForm.value = true;
};

const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this book?")) return;

  try {
    await api.delete(`/books/${id}`);
    fetchBooks();
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to delete book.";
    console.error("Error deleting book:", err);
  }
};

const openCreateForm = () => {
  form.value = { id: null, title: "", categoryId: "" };
  formErrors.value = {};
  isEditing.value = false;
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
  form.value = { id: null, title: "", categoryId: "" };
  formErrors.value = {};
};

onMounted(() => {
  fetchBooks();
  fetchCategories();
});
</script>

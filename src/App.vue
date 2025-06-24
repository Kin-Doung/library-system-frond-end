<template>
  <div class="flex h-screen">
    <aside class="w-56 bg-gray-800 text-gray-300 p-6 flex flex-col">
      <nav class="space-y-3">
        <router-link
          to="/"
          class="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white transition"
          active-class="bg-teal-500 text-white font-bold"
        >
          Stocks
        </router-link>
        <router-link
          to="/category"
          class="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white transition"
          active-class="bg-teal-500 text-white font-bold"
        >
          Categories
        </router-link>
        <router-link
          to="/user"
          class="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white transition"
          active-class="bg-teal-500 text-white font-bold"
        >
          Users
        </router-link>
        <router-link
          to="/book"
          class="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white transition"
          active-class="bg-teal-500 text-white font-bold"
        >
          Books
        </router-link>
        <router-link
          to="/borrow"
          class="block px-4 py-2 rounded hover:bg-gray-700 hover:text-white transition"
          active-class="bg-teal-500 text-white font-bold"
        >
          Borrow
        </router-link>
      </nav>
    </aside>

    <main class="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <router-view />
    </main>
  </div>
</template>

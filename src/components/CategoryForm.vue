<template>
  <form @submit.prevent="submit" class="space-y-4 max-w-md">
    <div>
      <label class="block text-sm mb-1">Title</label>
      <input v-model="model.title" required
             class="w-full rounded border px-3 py-2"/>
    </div>

    <div>
      <label class="block text-sm mb-1">Stock Name</label>
      <input v-model="model.stock_name"
             class="w-full rounded border px-3 py-2"/>
    </div>

    <div class="flex gap-2">
      <button :disabled="loading"
              class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
        {{ loading ? 'Saving…' : (isEdit ? 'Update' : 'Create') }}
      </button>
      <router-link :to="{ name: 'category.index' }"
                   class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
        Cancel
      </router-link>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/components/plugin/axios'

const props = defineProps({
  initial:   { type: Object, default: () => ({ title: '', stock_name: '' }) },
  isEdit:    { type: Boolean, default: false },
  submitUrl: { type: String,  required: true },
  method:    { type: String,  default: 'post' } // 'post' | 'put'
})

const emit    = defineEmits(['saved'])
const router  = useRouter()
const model   = ref({ ...props.initial })
const loading = ref(false)

/*  keep model in sync when initial prop changes (edit page fetch later)  */
watch(() => props.initial, v => { model.value = { ...v } })

async function submit () {
  loading.value = true
  try {
    await api[props.method](props.submitUrl, model.value)
    emit('saved')
    router.push({ name: 'category.index' })
  } catch (e) {
    alert('Save failed')
    console.error(e)
  } finally { loading.value = false }
}
</script>

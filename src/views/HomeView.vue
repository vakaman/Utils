<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-6">
    <div class="w-full max-w-xl text-center">
      <h1 class="text-4xl font-bold text-blue-700 mb-2 flex items-center justify-center gap-2">
        🛠️ Dev Utils
      </h1>
      <p class="text-gray-600 mb-6">A collection of helpful tools for developers</p>

      <input
        v-model="search"
        type="text"
        placeholder="Search tools..."
        class="w-full mb-6 px-6 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div class="space-y-4" v-if="filteredTools.length">
        <div
          v-for="tool in filteredTools"
          :key="tool.path"
          class="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
        >
          <RouterLink :to="tool.path" class="text-xl font-semibold text-blue-600 hover:underline">
            {{ tool.name }}
          </RouterLink>
          <p class="text-sm text-gray-500 mt-1">{{ tool.description }}</p>
        </div>
      </div>

      <div v-else class="text-gray-500 text-sm mt-4">
        No tools found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import defaultTools from '@/data/tools'

const props = defineProps<{
  tools?: {
    name: string
    path: string
    description: string
  }[]
}>()

const search = ref('')

const filteredTools = computed(() => {
  const list = props.tools ?? defaultTools
  return list.filter(tool =>
    tool.name.toLowerCase().includes(search.value.toLowerCase()) ||
    tool.description.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

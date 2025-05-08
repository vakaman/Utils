<template>
    <BaseLayout>
        <h1 class="text-2xl font-bold mb-4">📝 Slug Generator</h1>

      <textarea
        v-model="input"
        placeholder="Type text to slugify..."
        class="w-full p-3 border rounded mb-4"
        rows="4"
      ></textarea>
  
      <div class="flex gap-2 mb-4">
        <button @click="generate" class="btn-green">Generate</button>
        <button @click="copyOutput" class="btn-blue" :disabled="!output">Copy</button>
      </div>
  
      <div v-if="output" class="bg-gray-100 p-3 rounded">
        <pre class="whitespace-pre-wrap break-words">{{ output }}</pre>
      </div>
  
      <Feedback v-if="feedback" :message="feedback" />
    </BaseLayout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import BaseLayout from '@/components/BaseLayout.vue'
  import Feedback from '@/components/Feedback.vue'
  
  const input = ref('')
  const output = ref('')
  const feedback = ref('')
  
  function showFeedback(message: string, duration = 2000) {
    feedback.value = message
    setTimeout(() => {
      feedback.value = ''
    }, duration)
  }
  
  function generate() {
    const slug = input.value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove caracteres especiais
      .replace(/[\s_-]+/g, '-') // substitui espaços e underscores por hífen
      .replace(/^-+|-+$/g, '') // remove hífens das extremidades
    output.value = slug
    showFeedback('Slug generated!')
  }
  
  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output.value)
      showFeedback('Copied!')
    } catch {
      showFeedback('Copy failed!', 3000)
    }
  }
  </script>
  
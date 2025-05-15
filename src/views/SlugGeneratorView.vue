<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">📝 Slug Generator</h1>
    <p class="mb-4 text-sm text-gray-700"> The <strong>Slug Generator</strong> transforms text into a URL-friendly
      format called a "slug". Slugs are typically used in web addresses to identify a page using readable keywords
      instead of complex IDs or special characters. </p>
    <p class="mb-4 text-sm text-gray-700"> A slug usually consists of lowercase letters, numbers, and hyphens, and
      removes spaces or special characters to ensure compatibility with URLs. For example, the sentence
      <code>Hello World!</code> becomes <code>hello-world</code>. </p>
    <p class="mb-6 text-sm text-blue-700"> 🔗 Learn more: <br /> • <a
        href="https://en.wikipedia.org/wiki/Semantic_URL#Slug" target="_blank" class="underline text-blue-800">Wikipedia
        – Semantic URL Slug</a>
      <br /> • <a href="https://www.semrush.com/blog/url-slug/" target="_blank" class="underline text-blue-800">SEMRush
        – What is a URL Slug?</a>
    </p>
    <textarea v-model="input" placeholder="Type text to slugify..." class="w-full p-3 border rounded mb-4"
      rows="4"></textarea>
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
<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">🧹 JSON Formatter</h1>

    <textarea
      v-model="input"
      class="w-full min-h-[150px] p-3 border border-gray-300 rounded-md font-mono text-sm resize-y mb-4"
      placeholder="Paste your JSON here..."
      @input="formatJson"
    ></textarea>

    <div class="flex gap-2 mb-4">
      <button class="btn-green" @click="formatJson">Format</button>
      <button class="btn-blue" @click="copyOutput" :disabled="!output">Copy</button>
    </div>

    <pre v-if="output" class="bg-gray-100 p-4 rounded-md font-mono whitespace-pre-wrap break-words">
      {{ output }}
    </pre>

    <p v-if="error" class="text-red-600 mt-2 font-semibold">❌ {{ error }}</p>

    <Feedback :message="feedback" :color="feedbackColor" />
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import Feedback from '@/components/Feedback.vue'

const input = ref('')
const output = ref('')
const error = ref('')
const feedback = ref('')
const feedbackColor = ref('')

const showFeedback = (msg, color = 'blue') => {
  feedback.value = msg
  feedbackColor.value = color
  setTimeout(() => {
    feedback.value = ''
  }, 2000)
}

const formatJson = () => {
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, 2)
    error.value = ''
    showFeedback('✅ Formatted!', 'green')
  } catch {
    output.value = ''
    error.value = 'Invalid JSON!'
  }
}

const copyOutput = async () => {
  try {
    await navigator.clipboard.writeText(output.value)
    showFeedback('✅ Copied!', 'blue')
  } catch {
    error.value = 'Copy failed!'
  }
}
</script>

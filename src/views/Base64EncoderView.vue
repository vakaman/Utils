<template>
    <BaseLayout>
      <h1 class="text-2xl font-bold mb-4">Base64 Encoder / Decoder</h1>
  
      <Feedback :message="feedback" :color="feedbackColor" />
  
      <textarea
        v-model="input"
        placeholder="Enter text to encode or decode..."
        class="w-full p-3 border rounded mb-4"
        rows="4"
      ></textarea>
  
      <div class="flex gap-2 mb-4">
        <button @click="encode" class="btn-green">Encode</button>
        <button @click="decode" class="btn-blue">Decode</button>
        <button @click="copyOutput" class="btn-gray">Copy</button>
      </div>
  
      <div v-if="output" class="bg-gray-100 p-3 rounded">
        <pre class="whitespace-pre-wrap break-words">{{ output }}</pre>
      </div>
    </BaseLayout>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import BaseLayout from '@/components/BaseLayout.vue'
  import Feedback from '@/components/Feedback.vue'
  
  const input = ref('')
  const output = ref('')
  const feedback = ref('')
  const feedbackColor = ref('blue')
  
  function showFeedback(message, color = 'blue', duration = 2000) {
    feedback.value = message
    feedbackColor.value = color
    setTimeout(() => {
      feedback.value = ''
    }, duration)
  }
  
  function encode() {
    try {
      output.value = btoa(unescape(encodeURIComponent(input.value)))
      showFeedback('✅ Encoded successfully!', 'green')
    } catch {
      output.value = ''
      showFeedback('❌ Failed to encode!', 'red', 3000)
    }
  }
  
  function decode() {
    try {
      output.value = decodeURIComponent(escape(atob(input.value)))
      showFeedback('✅ Decoded successfully!', 'green')
    } catch {
      output.value = ''
      showFeedback('❌ Invalid Base64!', 'red')
    }
  }
  
  async function copyOutput() {
    if (!output.value) {
      showFeedback('⚠️ Nothing to copy.', 'yellow')
      return
    }
  
    try {
      await navigator.clipboard.writeText(output.value)
      showFeedback('✅ Copied!', 'blue')
    } catch {
      showFeedback('❌ Copy failed!', 'red', 3000)
    }
  }
  </script>
  
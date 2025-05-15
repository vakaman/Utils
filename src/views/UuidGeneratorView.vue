<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-2">UUID Generator</h1>

    <p class="mb-4 text-sm text-gray-700">
      A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify information. Below are three versions:
    </p>

    <ul class="mb-6 text-sm text-gray-700 list-disc pl-5">
      <li><strong>UUID v1</strong>: Based on timestamp and MAC address.</li>
      <li><strong>UUID v4</strong>: Randomly generated.</li>
      <li>
        <strong>UUID v5</strong>: Generated using a namespace and a user-provided name (like a domain or string). Useful when UUIDs need to be consistent for the same input.
      </li>
    </ul>

    <Feedback :message="feedback" :color="feedbackColor" />

    <div class="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-4">
      <button @click="generateV1" class="btn-blue">Generate UUID v1</button>
      <button @click="generateV4" class="btn-green">Generate UUID v4</button>
      <button @click="generateV5" class="btn-purple">Generate UUID v5 (DNS)</button>
      <button @click="clear" class="btn-gray">Clear</button>
      <button @click="copyOutput" class="btn-yellow">Copy</button>
    </div>

    <div class="mb-4">
      <input
        v-model="v5Input"
        type="text"
        placeholder="Enter a name for UUID v5 (e.g. example.com)"
        class="w-full p-2 border rounded text-sm"
      />
    </div>

    <div v-if="output" class="bg-gray-100 p-3 rounded">
      <pre class="whitespace-pre-wrap break-words">{{ output }}</pre>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import { v1 as uuidv1, v4 as uuidv4, v5 as uuidv5 } from 'uuid'
import BaseLayout from '@/components/BaseLayout.vue'
import Feedback from '@/components/Feedback.vue'

const output = ref('')
const feedback = ref('')
const feedbackColor = ref('blue')
const v5Input = ref('')

const DNS_NAMESPACE = uuidv5.DNS

function showFeedback(message, color = 'blue', duration = 2000) {
  feedback.value = message
  feedbackColor.value = color
  setTimeout(() => {
    feedback.value = ''
  }, duration)
}

function generateV1() {
  output.value = uuidv1()
  showFeedback('✅ UUID v1 generated!', 'green')
}

function generateV4() {
  output.value = uuidv4()
  showFeedback('✅ UUID v4 generated!', 'green')
}

function generateV5() {
  if (!v5Input.value.trim()) {
    showFeedback('⚠️ Please enter a name for UUID v5.', 'yellow')
    return
  }

  try {
    output.value = uuidv5(v5Input.value.trim(), DNS_NAMESPACE)
    showFeedback(`✅ UUID v5 generated!`, 'green')
  } catch {
    showFeedback('❌ Failed to generate UUID v5.', 'red')
  }
}

async function copyOutput() {
  if (!output.value) {
    showFeedback('⚠️ Nothing to copy.', 'yellow')
    return
  }

  try {
    await navigator.clipboard.writeText(output.value)
    showFeedback('✅ Copied to clipboard!', 'blue')
  } catch {
    showFeedback('❌ Failed to copy!', 'red')
  }
}

function clear() {
  output.value = ''
  v5Input.value = ''
  showFeedback('🧹 Cleared!', 'blue')
}
</script>

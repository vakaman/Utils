<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">⏱️ Timestamp Converter & Identifier</h1>

    <p class="mb-4 text-sm text-gray-700">
      This tool detects and converts various date/time formats, including ISO strings, time-only, and Unix timestamps (seconds and milliseconds).
      You can also input a timestamp to convert it into a readable date.
    </p>

    <textarea
      v-model="input"
      placeholder="Enter a date, time, ISO string or timestamp..."
      class="w-full p-3 border rounded mb-4 font-mono text-sm"
      rows="3"
    ></textarea>

    <div class="flex gap-2 mb-4">
      <button class="btn-green" @click="detectFormat">Detect Format</button>
      <button class="btn-blue" @click="convertToReadable">From Timestamp</button>
      <button class="btn-purple" @click="convertToTimestamp">To Timestamp</button>
      <button class="btn-gray" @click="copyOutput">Copy</button>
    </div>

    <div v-if="output" class="bg-gray-100 p-4 rounded font-mono whitespace-pre-wrap break-words">
      {{ output }}
    </div>

    <Feedback :message="feedback" :color="feedbackColor" />
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

const showFeedback = (message, color = 'blue', duration = 2000) => {
  feedback.value = message
  feedbackColor.value = color
  setTimeout(() => {
    feedback.value = ''
  }, duration)
}

const detectFormat = () => {
  const value = input.value.trim()
  if (/^\d{13}$/.test(value)) {
    output.value = 'Format: Unix Timestamp (milliseconds)'
  } else if (/^\d{10}$/.test(value)) {
    output.value = 'Format: Unix Timestamp (seconds)'
  } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value)) {
    output.value = 'Format: ISO 8601'
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    output.value = 'Format: Date (YYYY-MM-DD)'
  } else if (/^\d{2}:\d{2}/.test(value)) {
    output.value = 'Format: Time (HH:mm)'
  } else {
    output.value = '❌ Unknown format'
  }
  showFeedback('Format detected!', 'green')
}

const convertToReadable = () => {
  const raw = input.value.trim()
  const num = Number(raw)
  const ts = raw.length === 13 ? num : raw.length === 10 ? num * 1000 : NaN
  const date = new Date(ts)
  if (!isNaN(date.getTime())) {
    output.value = `UTC: ${date.toUTCString()}\nISO: ${date.toISOString()}\nLocal: ${date.toLocaleString()}`
    showFeedback('✅ Converted from timestamp!', 'green')
  } else {
    output.value = ''
    showFeedback('❌ Invalid timestamp', 'red')
  }
}

const convertToTimestamp = () => {
  const raw = input.value.trim()
  const date = new Date(raw)
  if (!isNaN(date.getTime())) {
    output.value = `Unix (s): ${Math.floor(date.getTime() / 1000)}\nUnix (ms): ${date.getTime()}`
    showFeedback('✅ Converted to timestamp!', 'green')
  } else {
    output.value = ''
    showFeedback('❌ Invalid date input', 'red')
  }
}

const copyOutput = async () => {
  if (!output.value) return
  try {
    await navigator.clipboard.writeText(output.value)
    showFeedback('✅ Copied!', 'blue')
  } catch {
    showFeedback('❌ Copy failed!', 'red')
  }
}
</script>

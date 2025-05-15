<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">🖼️ Base64 Image Converter</h1>

    <p class="mb-6 text-sm text-gray-700">
      This tool allows you to convert images to Base64 strings and decode Base64 back to images for
      download or preview. It’s useful for embedding images directly in HTML, CSS, or JSON payloads.
    </p>

    <div class="mb-4">
      <h2 class="text-lg font-semibold">📚 References:</h2>
      <ul class="list-disc list-inside ml-4">
        <li>
          <a class="text-blue-600 underline" href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL" target="_blank">
            MDN: FileReader.readAsDataURL()
          </a>
        </li>
        <li>
          <a class="text-blue-600 underline" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs" target="_blank">
            MDN: Data URIs
          </a>
        </li>
      </ul>
    </div>

    <h2 class="text-lg font-semibold mb-2">📤 Convert Image to Base64</h2>
    <div class="mb-6">
      <label class="relative inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold">
        Select Image
        <input type="file" @change="convertToBase64" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" />
      </label>
    </div>

    <div v-if="imageBase64" class="mb-6">
      <textarea
        class="w-full p-3 border rounded font-mono text-sm resize-y mb-2"
        rows="6"
        readonly
      >{{ imageBase64 }}</textarea>
      <button class="btn-blue" @click="copyBase64">Copy Base64</button>
    </div>

    <h2 class="text-lg font-semibold mb-2">📥 Convert Base64 to Image</h2>
    <textarea
      v-model="inputBase64"
      placeholder="Paste your Base64 image string here..."
      class="w-full p-3 border rounded font-mono text-sm resize-y mb-4"
      rows="6"
    ></textarea>

    <div class="flex gap-2 mb-6">
      <button class="btn-green" @click="renderImage">Render Image</button>
      <button class="btn-gray" @click="downloadImage" :disabled="!renderedImage">Download Image</button>
    </div>

    <div v-if="renderedImage" class="mb-6">
      <img :src="renderedImage" alt="Decoded Image" class="max-w-full border rounded" />
    </div>

    <Feedback :message="feedback" :color="feedbackColor" />
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import Feedback from '@/components/Feedback.vue'

const imageBase64 = ref('')
const inputBase64 = ref('')
const renderedImage = ref('')
const feedback = ref('')
const feedbackColor = ref('blue')

const showFeedback = (msg, color = 'blue', duration = 2500) => {
  feedback.value = msg
  feedbackColor.value = color
  setTimeout(() => (feedback.value = ''), duration)
}

function convertToBase64(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    imageBase64.value = reader.result
    showFeedback('✅ Image converted to Base64!', 'green')
  }
  reader.onerror = () => {
    showFeedback('❌ Failed to read file!', 'red')
  }
  reader.readAsDataURL(file)
}

function renderImage() {
  if (!inputBase64.value.startsWith('data:image')) {
    showFeedback('❌ Invalid Base64 image format!', 'red')
    return
  }
  renderedImage.value = inputBase64.value
  showFeedback('✅ Image rendered!', 'green')
}

function downloadImage() {
  const link = document.createElement('a')
  link.href = renderedImage.value
  link.download = 'image.png'
  link.click()
  showFeedback('✅ Download started!', 'blue')
}

async function copyBase64() {
  try {
    await navigator.clipboard.writeText(imageBase64.value)
    showFeedback('✅ Copied to clipboard!', 'blue')
  } catch {
    showFeedback('❌ Failed to copy!', 'red')
  }
}
</script>

<style scoped>
input[type='file']::file-selector-button {
  display: none;
}
</style>

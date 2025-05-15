<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">🌐 DNS Lookup & Resolver</h1>

    <p class="mb-4 text-gray-700">
      Perform DNS lookups to retrieve various record types such as <code>A</code>, <code>AAAA</code>, <code>MX</code>, <code>NS</code>, <code>TXT</code>, and <code>CNAME</code>. Useful for domain verification, mail setup, CDN analysis, and debugging DNS issues.
    </p>

    <div class="mb-4">
      <label class="block font-medium mb-1">Domain Name</label>
      <input
        v-model="domain"
        placeholder="e.g. example.com"
        class="w-full p-3 border rounded font-mono"
      />
    </div>

    <div class="mb-4">
      <label class="block font-medium mb-1">Record Types</label>
      <div class="flex flex-wrap gap-2">
        <label v-for="type in allTypes" :key="type" class="flex items-center gap-1">
          <input type="checkbox" v-model="selectedTypes" :value="type" />
          {{ type }}
        </label>
      </div>
    </div>

    <div class="mb-6">
      <button class="btn-blue" @click="lookupDns">Lookup</button>
    </div>

    <div v-if="loading" class="text-sm text-gray-600">Resolving DNS records...</div>

    <div v-if="results.length" class="space-y-6">
      <div v-for="entry in results" :key="entry.type" class="bg-gray-100 p-4 rounded">
        <h2 class="font-semibold mb-2">🔍 {{ entry.type }} Records</h2>
        <pre class="whitespace-pre-wrap break-words font-mono text-sm">{{ entry.data }}</pre>
      </div>
    </div>

    <Feedback :message="feedback" :color="feedbackColor" />
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import Feedback from '@/components/Feedback.vue'
import { useFetch } from '@vueuse/core'

const domain = ref('')
const selectedTypes = ref(['A', 'MX', 'TXT'])
const allTypes = ['A', 'AAAA', 'MX', 'CNAME', 'NS', 'TXT']
const results = ref([])
const loading = ref(false)
const feedback = ref('')
const feedbackColor = ref('blue')

const showFeedback = (msg, color = 'blue', duration = 3000) => {
  feedback.value = msg
  feedbackColor.value = color
  setTimeout(() => (feedback.value = ''), duration)
}

async function lookupDns() {
  if (!domain.value) {
    showFeedback('Please enter a domain.', 'red')
    return
  }
  if (selectedTypes.value.length === 0) {
    showFeedback('Select at least one record type.', 'red')
    return
  }
  results.value = []
  loading.value = true

  try {
    for (const type of selectedTypes.value) {
      const { data } = await useFetch(`https://dns.google/resolve?name=${domain.value}&type=${type}`).json()
      if (data.value && data.value.Answer) {
        results.value.push({ type, data: data.value.Answer.map(r => JSON.stringify(r, null, 2)).join('\n') })
      } else {
        results.value.push({ type, data: 'No records found.' })
      }
    }
    showFeedback('✅ DNS lookup complete!', 'green')
  } catch (err) {
    showFeedback('❌ DNS resolution failed.', 'red')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
pre {
  background-color: #f3f4f6;
  padding: 10px;
  border-radius: 6px;
  overflow-x: auto;
}
</style>
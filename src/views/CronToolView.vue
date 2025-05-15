<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">⏲️ Cron Expression Builder & Explainer</h1>

    <p class="mb-6 text-sm text-gray-700">
      This tool allows you to visually build and interpret <code>cron</code> expressions.
      Cron expressions define schedules for recurring tasks and are widely used in Linux servers, CI pipelines, and cloud platforms.
      <br><br>
      ➕ Use the <strong>Builder</strong> section to create cron expressions with human-friendly controls.<br>
      🔍 Use the <strong>Explainer</strong> to understand what an existing cron string does.
      <br><br>
      📚 <strong>References:</strong>
      <ul class="list-disc list-inside ml-4">
        <li><a class="text-blue-600 underline" href="https://crontab.guru/" target="_blank">crontab.guru</a> – Interactive cron editor</li>
        <li><a class="text-blue-600 underline" href="https://en.wikipedia.org/wiki/Cron" target="_blank">Wikipedia: Cron</a> – Background on how cron works</li>
        <li><a class="text-blue-600 underline" href="https://man7.org/linux/man-pages/man5/crontab.5.html" target="_blank">crontab(5)</a> – Manual for cron syntax</li>
      </ul>
    </p>

    <h2 class="text-xl font-semibold mb-2">🛠️ Builder</h2>

    <div class="mb-4">
      <label class="block font-medium mb-1">Command to execute</label>
      <input
        v-model="command"
        class="w-full p-3 border rounded font-mono"
        placeholder="/usr/bin/php /app/artisan schedule:run"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block font-medium mb-1">Minute</label>
        <input v-model="fields.minute" class="w-full p-2 border rounded" placeholder="* or */15 or 0,15,30" />
      </div>
      <div>
        <label class="block font-medium mb-1">Hour</label>
        <input v-model="fields.hour" class="w-full p-2 border rounded" placeholder="* or 0-23 or 8,12,18" />
      </div>
      <div>
        <label class="block font-medium mb-1">Day of month</label>
        <input v-model="fields.day" class="w-full p-2 border rounded" placeholder="* or 1,15 or 1-30" />
      </div>
      <div>
        <label class="block font-medium mb-1">Month</label>
        <input v-model="fields.month" class="w-full p-2 border rounded" placeholder="* or 1-12" />
      </div>
      <div>
        <label class="block font-medium mb-1">Day of week</label>
        <input v-model="fields.weekday" class="w-full p-2 border rounded" placeholder="* or 0-6 (0=Sun)" />
      </div>
    </div>

    <div class="flex gap-2 mb-6">
      <button class="btn-green" @click="generateCron">Generate Cron</button>
      <button class="btn-gray" @click="copyCron" :disabled="!cron">Copy</button>
    </div>

    <div v-if="cron" class="mb-6">
      <p class="font-mono text-sm bg-gray-100 p-2 rounded">Cron: {{ cron }}</p>
    </div>

    <h2 class="text-xl font-semibold mb-2">🧠 Explainer</h2>

    <div class="mb-4">
      <label class="block font-medium mb-1">Cron Expression to interpret</label>
      <input
        v-model="inputCron"
        class="w-full p-3 border rounded font-mono"
        placeholder="*/15 8-18 * * 1-5"
      />
    </div>

    <div class="mb-4">
      <label class="block font-medium mb-1">Command (optional)</label>
      <input
        v-model="inputCommand"
        class="w-full p-3 border rounded font-mono"
        placeholder="Command associated with this cron expression"
      />
    </div>

    <div class="flex gap-2 mb-6">
      <button class="btn-purple" @click="interpretCron">Interpret Cron</button>
    </div>

    <div v-if="interpretation" class="bg-blue-50 p-4 rounded text-sm">
      <h3 class="font-semibold mb-2">Explanation:</h3>
      <p>{{ interpretation }}</p>
    </div>

    <Feedback :message="feedback" :color="feedbackColor" />
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import Feedback from '@/components/Feedback.vue'

const command = ref('')
const fields = ref({
  minute: '*',
  hour: '*',
  day: '*',
  month: '*',
  weekday: '*'
})

const cron = ref('')
const inputCron = ref('')
const inputCommand = ref('')
const interpretation = ref('')
const feedback = ref('')
const feedbackColor = ref('blue')

const showFeedback = (msg, color = 'blue', duration = 2500) => {
  feedback.value = msg
  feedbackColor.value = color
  setTimeout(() => (feedback.value = ''), duration)
}

const generateCron = () => {
  cron.value = `${fields.value.minute} ${fields.value.hour} ${fields.value.day} ${fields.value.month} ${fields.value.weekday}`
  showFeedback('✅ Cron generated!', 'green')
}

const interpretCron = () => {
  const value = inputCron.value.trim()
  const [min, hr, day, month, wk] = value.split(' ')

  if ([min, hr, day, month, wk].some(f => f === undefined)) {
    interpretation.value = '❌ Invalid cron expression: must have 5 space-separated fields.'
    return
  }

  const desc = [
    min === '*' ? 'every minute' : `minute(s): ${min}`,
    hr === '*' ? 'every hour' : `hour(s): ${hr}`,
    day === '*' ? 'every day' : `on day(s): ${day}`,
    month === '*' ? 'every month' : `month(s): ${month}`,
    wk === '*' ? 'any day of week' : `weekday(s): ${wk}`
  ]

  interpretation.value = `Command: ${inputCommand.value || '[No command provided]'}\n→ ${desc.join(', ')}`
  showFeedback('✅ Interpretation ready!', 'green')
}

const copyCron = async () => {
  try {
    await navigator.clipboard.writeText(`${cron.value} ${command.value}`)
    showFeedback('✅ Copied!', 'blue')
  } catch {
    showFeedback('❌ Copy failed!', 'red')
  }
}
</script>

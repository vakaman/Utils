<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-4">🧪 Regex Tester & Explainer</h1>

    <p class="mb-4 text-sm text-gray-700">
      Test a regular expression against a sample text and understand what each part of the regex means.
      Useful for debugging and learning how regex works.
    </p>

    <div class="mb-4">
      <label class="block mb-1 font-medium">Regular Expression (e.g. <code>^\d{3}-\d{2}-\d{4}$</code>)</label>
      <input v-model="regexInput" class="w-full p-3 border rounded font-mono" placeholder="Enter regex pattern...">
    </div>

    <div class="mb-4">
      <label class="block mb-1 font-medium">Flags (optional)</label>
      <input v-model="regexFlags" class="w-full p-3 border rounded font-mono" placeholder="g, i, m, etc">
      <p class="text-xs text-gray-600 mt-1">
        <strong>Flags:</strong>
        <code>g</code> (global),
        <code>i</code> (ignore case),
        <code>m</code> (multiline),
        <code>s</code> (dotAll),
        <code>u</code> (unicode),
        <code>y</code> (sticky)
      </p>
    </div>

    <div class="mb-4">
      <label class="block mb-1 font-medium">Test Text</label>
      <textarea v-model="testText" rows="4" class="w-full p-3 border rounded font-mono" placeholder="Enter text to test against the regex..."></textarea>
    </div>

    <div class="flex gap-2 mb-6">
      <button @click="runRegex" class="btn-green">Test Regex</button>
      <button @click="explainRegex" class="btn-purple">Explain Regex</button>
      <button @click="copyExplanation" class="btn-gray" :disabled="!explanation">Copy Explanation</button>
    </div>

    <div v-if="highlightedOutput" class="bg-gray-100 p-4 rounded font-mono whitespace-pre-wrap break-words mb-6">
      <div v-html="highlightedOutput" />
    </div>

    <div v-if="explanation" class="bg-blue-50 p-4 rounded text-sm">
      <h2 class="font-semibold mb-2">🧠 Explanation:</h2>
      <pre class="whitespace-pre-wrap">{{ explanation }}</pre>
    </div>

    <Feedback :message="feedback" :color="feedbackColor" />
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import Feedback from '@/components/Feedback.vue'

const regexInput = ref('')
const regexFlags = ref('')
const testText = ref('')
const highlightedOutput = ref('')
const explanation = ref('')
const feedback = ref('')
const feedbackColor = ref('blue')

const showFeedback = (msg, color = 'blue', duration = 2500) => {
  feedback.value = msg
  feedbackColor.value = color
  setTimeout(() => (feedback.value = ''), duration)
}

const runRegex = () => {
  try {
    const pattern = new RegExp(regexInput.value, regexFlags.value)
    const replaced = testText.value.replace(pattern, match => `<mark class='bg-yellow-200'>${match}</mark>`)
    highlightedOutput.value = replaced
    showFeedback('✅ Regex executed!', 'green')
  } catch {
    showFeedback('❌ Invalid regex pattern.', 'red')
    highlightedOutput.value = ''
  }
}

const explainRegex = () => {
  const pattern = regexInput.value
  explanation.value = ''

  try {
    const rules = [
      { token: /\^/, desc: '↳ ^ → Start of the string' },
      { token: /\$/, desc: '↳ $ → End of the string' },
      { token: /\[a-z\]/, desc: '[a-z] → Any lowercase letter' },
      { token: /\[A-Z\]/, desc: '[A-Z] → Any uppercase letter' },
      { token: /\\d/, desc: '\\d → Any digit (0–9)' },
      { token: /\\D/, desc: '\\D → Any non-digit character' },
      { token: /\\w/, desc: '\\w → Any word character (a-z, A-Z, 0–9, _)' },
      { token: /\\s/, desc: '\\s → Whitespace (space, tab, etc.)' },
      { token: /\./, desc: '. → Any character except newline' },
      { token: /\*/, desc: '* → Zero or more repetitions' },
      { token: /\+/, desc: '+ → One or more repetitions' },
      { token: /\?/, desc: '? → Zero or one repetition' },
      { token: /\{\d+(,\d*)?\}/, desc: '{n} / {n,m} → Quantifiers' },
      { token: /\(/, desc: '(...) → Capturing group' },
      { token: /\|/, desc: '| → Alternation (OR)' },
      { token: /\\b/, desc: '\\b → Word boundary' }
    ]

    const matchedParts = rules.filter(r => r.token.test(pattern)).map(r => `↳ ${r.desc}`)

    if (matchedParts.length) {
      explanation.value = `Regex: /${pattern}/${regexFlags.value}\n` + matchedParts.join('\n')
    } else {
      explanation.value = `Regex: /${pattern}/${regexFlags.value}\n↳ No explanations matched.`
    }

    showFeedback('✅ Explanation generated!', 'green')
  } catch {
    showFeedback('❌ Could not explain regex.', 'red')
  }
}

const copyExplanation = async () => {
  try {
    await navigator.clipboard.writeText(explanation.value)
    showFeedback('✅ Copied!', 'blue')
  } catch {
    showFeedback('❌ Copy failed!', 'red')
  }
}
</script>

<style scoped>
mark {
  padding: 0 2px;
  border-radius: 3px;
}
</style>

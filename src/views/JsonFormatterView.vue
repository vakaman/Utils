<template>
  <BaseLayout>
    <h1 class="text-2xl font-bold mb-6">🧰 JSON Formatter & Schema Validator</h1>
    <!-- 🧹 JSON Formatter -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold mb-2">🧹 JSON Formatter</h2>
      <p class="mb-2 text-sm text-gray-700"> Paste your raw JSON to format it into a readable, indented structure. This
        tool does not validate against any schema. </p>
      <textarea v-model="formatterInput"
        class="w-full min-h-[150px] p-3 border border-gray-300 rounded-md font-mono text-sm resize-y mb-4"
        placeholder="Paste your JSON here..." @input="formatJson"></textarea>
      <div class="flex gap-2 mb-4">
        <button class="btn-green" @click="formatJson">Format</button>
        <button class="btn-blue" @click="copyFormattedJson" :disabled="!formattedJson">Copy</button>
      </div>
      <pre v-if="formattedJson" class="bg-gray-100 p-4 rounded-md font-mono whitespace-pre-wrap break-words"
        v-text="formattedJson"></pre>
      <p v-if="formatterError" class="text-red-600 mt-2 font-semibold">❌ {{ formatterError }}</p>
    </section>
    <hr>
    <section>
      <h2 class="text-xl font-semibold mb-2 mt-3">📏 JSON Schema Validator</h2>
      <p class="mb-2 text-sm text-gray-700"> The <strong>JSON Schema Validator</strong> lets you check whether a JSON
        document matches the structure and rules defined by a JSON Schema. It's useful to validate API responses,
        configuration files, or user inputs before processing. </p>
      <p class="mb-2 text-sm text-gray-700"> A <strong>JSON Schema</strong> is a declarative language that allows you to
        define the expected structure of a JSON object, including required fields, data types, formats, nested objects,
        arrays, and much more. </p>
      <p class="mb-2 text-sm text-gray-700"> For example, you can require that the field <code>email</code> must be a
        string and follow a valid email format, or that an <code>age</code> field must be a number greater than zero.
      </p>
      <p class="mb-6 text-sm text-blue-700"> 🔗 Learn more about JSON Schema: <br /> • <a
          href="https://json-schema.org/learn" target="_blank" class="underline text-blue-800">json-schema.org/learn</a>
        <br /> • <a href="https://ajv.js.org/guide/getting-started.html" target="_blank"
          class="underline text-blue-800">AJV – Getting Started</a>
        <br /> • <a href="https://json-schema.org/understanding-json-schema/" target="_blank"
          class="underline text-blue-800">Understanding JSON Schema (O'Reilly Book)</a>
      </p>
      <label class="font-semibold text-sm text-gray-700">📥 JSON to Validate</label>
      <textarea v-model="validatorInput"
        class="w-full min-h-[120px] p-3 border border-gray-300 rounded-md font-mono text-sm resize-y mb-4"
        placeholder="Paste the JSON you want to validate..."></textarea>
      <label class="font-semibold text-sm text-gray-700">📐 JSON Schema</label>
      <textarea v-model="validatorSchema"
        class="w-full min-h-[120px] p-3 border border-gray-300 rounded-md font-mono text-sm resize-y mb-4"
        placeholder="Paste the JSON Schema here..."></textarea>
      <button class="btn-purple" @click="validateJson" :disabled="!validatorInput || !validatorSchema"> Validate Against
        Schema </button>
      <ul v-if="validationErrors.length" class="text-red-700 text-sm mt-4 list-disc pl-5">
        <li v-for="(err, idx) in validationErrors" :key="idx">
          <code>{{ err.instancePath }}</code> - {{ err.message }}
        </li>
      </ul>
      <p v-else-if="validationSuccess" class="text-green-700 mt-4 font-semibold"> ✅ JSON is valid against the schema!
      </p>
    </section>
    <Feedback :message="feedback" :color="feedbackColor" />
  </BaseLayout>
</template>
<script setup>
import { ref } from 'vue'
import Ajv from 'ajv'
import BaseLayout from '@/components/BaseLayout.vue'
import Feedback from '@/components/Feedback.vue'
import addFormats from 'ajv-formats'

/** Formatter states */
const formatterInput = ref('')
const formattedJson = ref('')
const formatterError = ref('')

/** Validator states */
const validatorInput = ref('')
const validatorSchema = ref('')
const validationErrors = ref([])
const validationSuccess = ref(false)

/** Feedback */
const feedback = ref('')
const feedbackColor = ref('')

const showFeedback = (msg, color = 'blue', duration = 2000) => {
  feedback.value = msg
  feedbackColor.value = color
  setTimeout(() => {
    feedback.value = ''
  }, duration)
}

// Formatter
const formatJson = () => {
  try {
    const parsed = JSON.parse(formatterInput.value)
    formattedJson.value = JSON.stringify(parsed, null, 2)
    formatterError.value = ''
    showFeedback('✅ Formatted!', 'green')
  } catch {
    formattedJson.value = ''
    formatterError.value = 'Invalid JSON!'
  }
}

const copyFormattedJson = async () => {
  try {
    await navigator.clipboard.writeText(formattedJson.value)
    showFeedback('✅ Copied!', 'blue')
  } catch {
    formatterError.value = 'Copy failed!'
  }
}

// Validator
const validateJson = () => {
  validationSuccess.value = false
  validationErrors.value = []

  try {
    const ajv = new Ajv()
    addFormats(ajv)

    let schema, data

    try {
      schema = JSON.parse(validatorSchema.value)
    } catch (e) {
      throw new Error('Invalid JSON Schema.')
    }

    try {
      data = JSON.parse(validatorInput.value)
    } catch (e) {
      throw new Error('Invalid JSON to validate.')
    }

    const validate = ajv.compile(schema)
    const valid = validate(data)

    if (valid) {
      validationSuccess.value = true
      validationErrors.value = []
      showFeedback('✅ JSON is valid!', 'green')
    } else {
      validationErrors.value = validate.errors || []
      showFeedback('❌ JSON does not match schema.', 'red')
    }
  } catch (err) {
    validationErrors.value = [{ instancePath: '', message: err.message }]
    showFeedback('❌ Validation failed.', 'red')
  }
}

</script>

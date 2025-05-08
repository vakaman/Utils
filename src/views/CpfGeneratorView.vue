<template>
    <BaseLayout title="CPF Generator">
      <h1 class="text-2xl font-bold mb-4">🆔 CPF Generator</h1>
  
      <div class="flex flex-col gap-6">
        <!-- Geração -->
        <div class="space-y-2">
          <div class="flex gap-2">
            <button @click="generateCpf" class="btn-green">Generate</button>
            <button @click="copyCpf" class="btn-blue" :disabled="!cpf">Copy</button>
          </div>
          <div v-if="cpf" class="bg-gray-100 p-4 rounded text-center">
            <p class="text-lg font-mono tracking-widest">{{ cpf }}</p>
          </div>
        </div>

        <hr>
  
        <h1 class="text-2xl font-bold mb-4">✅ CPF Validator</h1>

        <div class="space-y-2">
          <input
            v-model="inputCpf"
            class="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter CPF to validate (only numbers)"
          />
          <button @click="validateCpf" class="btn-gray">Validate</button>
          <div v-if="validationResult !== null" class="text-center mt-2">
            <span :class="validationResult ? 'text-green-600' : 'text-red-600'">
              {{ validationResult ? '✅ Valid CPF' : '❌ Invalid CPF' }}
            </span>
          </div>
        </div>
  
        <!-- Feedback -->
        <Feedback :message="feedback" :color="feedbackColor" />
      </div>
    </BaseLayout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import BaseLayout from '@/components/BaseLayout.vue'
  import Feedback from '@/components/Feedback.vue'
  
  const cpf = ref('')
  const inputCpf = ref('')
  const feedback = ref('')
  const feedbackColor = ref<'green' | 'blue'>('green')
  const validationResult = ref<boolean | null>(null)
  
  function generateCpf(): void {
    const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
  
    const calcDigit = (base: number[]) => {
      const sum = base.reduce((acc, val, i) => acc + val * (base.length + 1 - i), 0)
      const rest = sum % 11
      return rest < 2 ? 0 : 11 - rest
    }
  
    const d1 = calcDigit(n)
    const d2 = calcDigit([...n, d1])
  
    const full = [...n, d1, d2].join('')
    cpf.value = full.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  
    feedback.value = 'CPF generated!'
    feedbackColor.value = 'green'
  }
  
  async function copyCpf() {
    if (!cpf.value) return
    await navigator.clipboard.writeText(cpf.value)
    feedback.value = 'Copied!'
    feedbackColor.value = 'blue'
  }
  
  function validateCpf(): void {
    const digits = inputCpf.value.replace(/\D/g, '')
    if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) {
      validationResult.value = false
      return
    }
  
    const toInt = digits.split('').map(Number)
    const calcDigit = (base: number[], factor: number) => {
      const sum = base.reduce((acc, digit) => acc + digit * factor--, 0)
      const rest = sum % 11
      return rest < 2 ? 0 : 11 - rest
    }
  
    const d1 = calcDigit(toInt.slice(0, 9), 10)
    const d2 = calcDigit(toInt.slice(0, 10), 11)
  
    validationResult.value = d1 === toInt[9] && d2 === toInt[10]
  }
  </script>
  
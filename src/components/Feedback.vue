<template>
    <div
      v-if="message"
      class="floating-feedback"
      :style="{ backgroundColor: colorMap[color] || '#3b82f6' }"
    >
      {{ message }}
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    message: String,
    color: {
      type: String,
      default: 'blue',
    },
  })
  
  const colorMap = {
    green: '#22c55e',
    blue: '#3b82f6',
    red: '#ef4444',
    yellow: '#eab308',
  }
  </script>
  
  <style scoped>
  .floating-feedback {
    position: fixed;
    top: 20px;
    right: 20px;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    font-weight: bold;
    z-index: 9999;
    transition: opacity 0.3s ease-in-out;
  }
  </style>
  
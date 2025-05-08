<template>
    <div class="container">
      <router-link to="/" class="back-button">← Back</router-link>
      <div class="p-6 max-w-2xl mx-auto">
        <slot />
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 2rem auto;
    font-family: 'Segoe UI', sans-serif;
    position: relative;
  }
  
  .back-button {
    display: inline-block;
    margin-bottom: 1rem;
    color: #3b82f6;
    text-decoration: none;
    font-weight: bold;
  }
  </style>
  
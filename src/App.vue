<template>
  <div>
    <div class="bmc-wrapper">
      <a
        href="https://www.buymeacoffee.com/maicol.dev"
        target="_blank"
        rel="noopener noreferrer"
        class="bmc-link"
      >
        <span class="bmc-text">Buy me a coffee</span>
        <svg
          class="bmc-heart"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
              4.42 3 7.5 3c1.74 0 3.41 0.81 
              4.5 2.09C13.09 3.81 14.76 3 
              16.5 3 19.58 3 22 5.42 
              22 8.5c0 3.78-3.4 6.86-8.55 
              11.54L12 21.35z"
          />
        </svg>
      </a>
    </div>

    <router-view />

    <RouterLink to="/privacy" class="text-sm text-gray-500 hover:underline">
      Privacy Policy
    </RouterLink>
  </div>
</template>

<style scoped>
.bmc-wrapper {
  position: fixed;
  top: 20px;
  left: 0;
  z-index: 9999;
}

.bmc-link {
  display: flex;
  align-items: center;
  background-color: #40DCA5;
  color: white;
  border-radius: 0 999px 999px 0;
  padding: 8px 16px;
  text-decoration: none;
  transform: translateX(-121px);
  transition: transform 0.3s ease-in-out;
}

.bmc-wrapper:hover .bmc-link {
  transform: translateX(0);
}

.bmc-text {
  margin-right: 8px;
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
}

.bmc-heart {
  flex-shrink: 0;
}
</style>

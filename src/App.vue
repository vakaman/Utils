<template>
  <div>
    <!-- <header class="w-full bg-white shadow p-0 flex justify-center">
      <div ref="adWrapper" class="ad-wrapper">
        <ins
          class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-9288386921396586"
          data-ad-slot="5366139602"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </header> -->

    <router-view />

    <RouterLink to="/privacy" class="text-sm text-gray-500 hover:underline">Privacy Policy</RouterLink>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const adWrapper = ref(null)

onMounted(() => {
  const id = 'adsense-script'
  if (!document.getElementById(id)) {
    const s = document.createElement('script')
    s.id = id
    s.async = true
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9288386921396586'
    s.crossOrigin = 'anonymous'
    document.head.appendChild(s)
  }

  setTimeout(() => {
    try {
      if (adWrapper.value) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (e) {
      console.error('Adsense error:', e)
    }
  }, 1000)
})
</script>

<style scoped>
.ad-wrapper {
  width: 100%;
  max-width: 728px;
  max-height: 150px;
}
</style>

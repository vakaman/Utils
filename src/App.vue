<template>
  <div>
    <header class="w-full bg-white shadow p-2 flex justify-center">
      <div class="ad-wrapper">
        <ins
          class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-9288386921396586"
          data-ad-slot="5366139602"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const scriptId = 'adsense-script'
  if (!document.getElementById(scriptId)) {
    const s = document.createElement('script')
    s.id = scriptId
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9288386921396586'
    s.async = true
    s.crossOrigin = 'anonymous'
    document.head.appendChild(s)
  }

  setTimeout(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('Adsense error:', e)
    }
  }, 500)
})
</script>

<style scoped>
.ad-wrapper {
  width: 100%;
  max-width: 728px;
  height: auto;
}
</style>

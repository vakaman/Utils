<template>
  <div>
    <header class="w-full bg-white shadow p-2 flex justify-center">
      <div class="ad-wrapper">
        <ins
          class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-9288386921396586"
          data-ad-slot="1234567890"
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
  const adScriptId = 'adsense-script'
  if (!document.getElementById(adScriptId)) {
    const s = document.createElement('script')
    s.async = true
    s.id = adScriptId
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9288386921396586'
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
  max-width: 728px; /* tamanho típico de banner */
  height: 90px;
}
</style>

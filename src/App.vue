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

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<style scoped>
.ad-wrapper {
  width: 100%;
  max-width: 728px;
  height: auto;
}
</style>

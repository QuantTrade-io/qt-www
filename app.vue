<template>
  <div
    class="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

// For more information about the usage for json-ld:
// https://moz.com/blog/json-ld-for-beginners#:~:text=What%20does%20JSON%2DLD%20do,more%20organized%2C%20better%20web%20overall.
// Important links for settings up json-ld:
// https://schema.org/docs/full.html
useJsonld({
  "@context": "https://schema.org",
  // Organization: https://schema.org/Organization
  "@type": "Organization",
  brand: "QuantTrade.io",
  description:
    "Quantitative and Algorithmic financial service for individual usage that helps with trading and investing.",
  email: "info@quanttrade.io",
  employee: "Joris Jansen",
  founder: "Joris Jansen",
  legalName: "QuantTrade",
  logo: config.public.webUrl + "qt-logo-light.jpg",
  slogan: "Providing Alpha to the Public",
});
</script>

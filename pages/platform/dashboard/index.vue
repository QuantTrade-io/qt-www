<template>
  <p>DASHBOARD</p>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "platform",
  middleware: [
    "check-logged-in-user-tokens",
    "check-logged-in-user-account-status",
  ],
});
</script>
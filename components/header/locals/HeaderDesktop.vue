<template>
  <div class="relative z-40 relative flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <HeaderDesktopLogo />
      <HeaderDesktopLinks :links="links" />
    </div>
    <HeaderDesktopActions />
  </div>
</template>

<script setup lang="ts">
import HeaderDesktopActions from "./HeaderDesktopActions.vue";
import HeaderDesktopLinks from "./HeaderDesktopLinks.vue";
import HeaderDesktopLogo from "./HeaderDesktopLogo.vue";

import { PropsHeaderLink } from "~/components/types/PropsHeaderLink";

interface Props {
  links: PropsHeaderLink[];
}

defineProps<Props>();
</script>

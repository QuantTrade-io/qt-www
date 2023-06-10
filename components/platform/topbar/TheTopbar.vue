<template>
  <div class="xl:pl-72 bg-slate-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400">
    <Observer>
    <div class="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 border-b-2" :class="tradingModeService.tradingLive ? 'border-green-500' : 'border-orange-500'">
      <!-- aligned to the left -->
      <TopbarLeft @toggle-sidebar="$emit('toggleSidebar')" />

      <!-- aligned to the right -->
      <TopbarRight />
    </div>
  </Observer>
  </div>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";
import { tradingModeService } from "~/services/trading-mode/TradingModeService"

import TopbarLeft from "./locals/TopbarLeft.vue"
import TopbarRight from "./locals/TopbarRight.vue"

interface Props {
    sidebarOpen: boolean;
}

defineProps<Props>();

defineEmits<{
  (e: "toggleSidebar"): void;
}>();

const localePath = useLocalePath();
</script>
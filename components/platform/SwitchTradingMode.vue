<template>
      <!-- Switch Group -->
      <div class="flex">
        <p class="mr-4 text-slate-700 dark:text-slate-300 text-sm">Paper</p>
        <SwitchGroup>
          <div class="flex items-center">
            <Observer>
            <Switch
              :v-model="tradingModeService.tradingLive"
              @update:modelValue="tradingModeService.toggleTradingMode"
              :class="tradingModeService.tradingLive ? 'bg-green-500' : 'bg-orange-500'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span
                :class="tradingModeService.tradingLive ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </Switch>
          </Observer>
          </div>
        </SwitchGroup>
        <p class="ml-4 text-slate-700 dark:text-slate-300 text-sm">Live</p>
      </div>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";
import { Switch, SwitchGroup } from '@headlessui/vue'
import { tradingModeService } from "~/services/trading-mode/TradingModeService"

</script>
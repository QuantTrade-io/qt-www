<template>
  <Observer>
    <Disclosure
      v-for="device in devices"
      :key="device.id"
      v-slot="{ open }"
      as="div"
      class="grid grid-cols-1 gap-x-6 gap-y-0 sm:max-w-xl sm:grid-cols-6 mb-4"
    >
      <DisclosureButton class="col-span-full">
        <BaseButton
          class="relative flex flex-col items-center sm:flex-row sm:items-center"
          :button-theme="themeButtonService.getThemeButtonById(7)"
        >
          <img
            :src="device.image"
            class="w-20 h-20 mb-2 sm:mr-2 sm:mb-0 p-2"
            alt="QT-logo"
          />
          <div class="sm:absolute sm:inset-0 flex items-center justify-center">
            <p class="text-center">{{ device.info }}</p>
          </div>
          <ChevronUpIcon
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 ml-2 absolute right-0 mr-2 mt-2"
          />
        </BaseButton>
      </DisclosureButton>
      <Observer>
        <DisclosurePanel
          v-for="session in device.sessions"
          :key="session.id"
          class="px-4 pt-4 pb-2 bg-white dark:bg-slate-800 text-sm rounded-lg mt-1 col-span-full flex flex-col p-4 border border-gray-300 dark:border-gray-700"
          :class="[
            session.current
              ? 'border-2 border-green-500 dark:border-2 dark:border-green-500'
              : '',
          ]"
        >
          <SessionItem :session="session" :device-id="device.id" />
        </DisclosurePanel>
      </Observer>
    </Disclosure>
  </Observer>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/24/outline";
import SessionItem from "./locals/SessionItem.vue";
import { themeButtonService } from "~/services/theme/ThemeButtonService";
import { Device } from "~/models/security/Device";

interface Props {
  devices: Device[];
}

defineProps<Props>();
</script>

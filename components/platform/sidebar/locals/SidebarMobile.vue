<template>
  <!-- Dynamic sidebar for Mobile -->
  <TransitionRoot as="template" :show="sidebarOpen" class="">
    <Dialog
      as="div"
      class="relative z-50 xl:hidden"
      @close="$emit('toggleSidebar')"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-200 dark:bg-gray-900/80" />
      </TransitionChild>
      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div
                class="absolute left-full top-0 flex w-16 justify-center pt-5"
              >
                <button
                  type="button"
                  class="-m-2.5 p-2.5"
                  @click="$emit('toggleSidebar')"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon
                    class="h-6 w-6 text-slate-700 dark:text-slate-300"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </TransitionChild>
            <!-- Sidebar component -->
            <div
              class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10"
            >
              <!-- Logo -->
              <div class="flex h-16 shrink-0 items-center">
                <BaseLogo class="w-auto h-10" />
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <!-- Navigation items -->
                    <ul role="list" class="-mx-2 space-y-1">
                      <li
                        v-for="item in links"
                        :key="item.text"
                        @click="$emit('toggleSidebar')"
                      >
                        <NuxtLink
                          :to="localePath(item.to)"
                          active-class="bg-gray-800 text-white"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <component
                            :is="item.icon"
                            class="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {{ item.text }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="text-xs font-semibold leading-6 text-gray-400">
                      {{ $t("platform.sidebar.favourites") }}
                    </div>
                    <ul role="list" class="-mx-2 mt-2 space-y-1">
                      <!-- Favourite items -->
                      <li v-for="favourite in favourites" :key="favourite.text">
                        <a
                          :href="favourite.to"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <span
                            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
                            >{{ favourite.initial }}</span
                          >
                          <span class="truncate">{{ favourite.text }}</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="sm:hidden">
                    <div
                      class="text-xs font-semibold leading-6 text-slate-700 dark:text-slate-300"
                    >
                    {{ $t("platform.sidebar.settings") }}
                    </div>
                    <ul role="list" class="mt-4 space-y-1 flex items-center">
                      <!-- TradingMode Toggle -->
                      <li>
                        <SwitchTradingMode />
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { PropsSidebarFavourite } from "~/components/types/SidebarFavourite";
import { PropsSidebarLink } from "~/components/types/SidebarLink";
import BaseLogo from "@/components/base/BaseLogo.vue";
import SwitchTradingMode from "~/components/platform/SwitchTradingMode.vue";

interface Props {
  links: PropsSidebarLink[];
  favourites: PropsSidebarFavourite[];
  sidebarOpen: boolean;
}

defineProps<Props>();

defineEmits<{
  (e: "toggleSidebar"): void;
}>();

const localePath = useLocalePath();
</script>

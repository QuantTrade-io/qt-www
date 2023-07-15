<template>
    <!-- Static sidebar for desktop -->
    <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col bg-slate-100 dark:bg-gray-900 border-r border-slate-200">
      <!-- Logo -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 ring-1 ring-white/5">
        <div class="flex h-16 shrink-0 items-center mt-4">
            <BaseLogoTextWhite class="hidden dark:block w-auto h-6 md:h-10" />
            <BaseLogoTextBlue class="block dark:hidden w-auto h-6 md:h-10" />
        </div>
        <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <!-- Navigation items -->
                <li>
                    <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in links" :key="item.text">
                            <NuxtLink :to="localePath(item.to)" active-class="bg-gray-400 text-slate-700 dark:bg-gray-800 dark:text-slate-200" class="text-slate-500 hover:text-slate-700 hover:bg-gray-400 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                                {{ item.text }}
                            </NuxtLink>
                        </li>
                    </ul>
                </li>
                <!-- Favourite items -->
                <li>
                    <div class="text-xs font-semibold leading-6 text-gray-400">Favourites</div>
                    <ul role="list" class="-mx-2 mt-2 space-y-1">
                        <li v-for="favourite in favourites" :key="favourite.text">
                            <NuxtLink :to="localePath(favourite.to)" class="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">{{ favourite.initial }}</span>
                                <span class="truncate">{{ favourite.text }}</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
      </div>
    </div>
</template>

<script setup lang="ts">
import { PropsSidebarFavourite } from '~/components/types/SidebarFavourite';
import { PropsSidebarLink } from '~/components/types/SidebarLink';

interface Props {
    links: PropsSidebarLink[];
    favourites: PropsSidebarFavourite[];
}

defineProps<Props>();

const localePath = useLocalePath();
</script>
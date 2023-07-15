<template>
          <div class="flex justify-end flex-1">
        <!-- notifications -->
        <button type="button" class="-m-2.5 p-2.5 text-slate-700 dark:text-slate-400 hover:text-gray-500 dark:hover:text-slate-200">
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-gray-200 mx-4" aria-hidden="true" />

        <!-- Profile Dropdown -->
        <Menu as="div" class="relative">
          <MenuButton class="-m-1.5 flex items-center p-1.5 hover:text-gray-500 dark:hover:text-slate-200">
            <span class="sr-only">Open user menu</span>
            <img class="h-8 w-8 rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <span class="hidden lg:flex lg:items-center">
              <span class="ml-4 text-sm font-semibold leading-6" aria-hidden="true">Tom Cook</span>
              <ChevronDownIcon class="ml-2 h-5 w-5" aria-hidden="true" />
            </span>
          </MenuButton>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 p-2 origin-top-right rounded-md bg-white dark:bg-slate-700 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem v-slot="{ close }">
                <div @click="close">
                  <NuxtLink :to="localePath('/platform/account/settings')" active-class="bg-pink-100 text-pink-900" @click.native="close" class="block w-full flex rounded-md items-center space-x-2 text-left px-3 py-1 text-sm leading-6 hover:bg-slate-300 hover:dark:bg-slate-500">
                    <Cog6ToothIcon class="h-5 w-5 align-middle" aria-hidden="true" />
                    <span>Settings</span>
                  </NuxtLink>
                </div>
              </MenuItem>
              <MenuItem>
                <button @click="userLogout" class="block w-full flex items-center space-x-2 text-left px-3 py-1 text-sm leading-6 hover:bg-slate-300 hover:dark:bg-slate-500 rounded-md mt-2">
                  <ArrowRightOnRectangleIcon class="h-5 w-5" />
                  <span>
                    Sign out
                  </span>
                </button>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
</template>

<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import {
  BellIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

import { userService } from "~/services/user/UserService";

async function userLogout() {
  await userService.logout();
  // Refresh page in order to make sure that all the tokens are removed
  window.location.reload()
  navigateTo({
      path: localePath("/auth/login"),
    });
}

const localePath = useLocalePath();
</script>
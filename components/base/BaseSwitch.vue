<template>
  <div class="w-full">
    <Listbox :v-model="itemList">
      <div class="relative mt-1">
        <div as="template" class="block text-sm font-medium leading-6">
          <ListboxLabel v-if="label" as="div">{{ label }}</ListboxLabel>
        </div>
        <ListboxButton class="relative w-full cursor-pointer">
          <BaseButton
            class="flex"
            :button-theme="themeButtonService.getThemeButtonById(themeButtonId)"
          >
            <component
              :is="itemCurrent.icon"
              v-if="itemCurrent.icon"
              class="h-5 w-5"
            />
            <span v-else class="block truncate align-middle mt-0.5">
              {{ itemCurrent.name }}
            </span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex pr-2 items-center"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 align-middle"
                aria-hidden="true"
              />
            </span>
          </BaseButton>
        </ListboxButton>
        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute w-full min-w-[140px] z-10 mt-1 max-h-60 w-fulloverflow-auto rounded-md bg-white dark:bg-slate-700 py-1 drop-shadow-2xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="item in itemList"
              :key="item.name"
              :value="item"
              class="p-2"
              @click="$emit('itemClicked', item)"
            >
              <li
                :class="[
                  item.name === itemCurrent.name
                    ? 'bg-pink-100 text-pink-900 rounded-md'
                    : 'text-slate-700 dark:text-slate-300',
                  'cursor-pointer relative select-none pr-4 py-2 pl-10 min-w-20 hover:bg-slate-300 hover:dark:bg-slate-500 rounded-md',
                ]"
              >
                <span
                  :class="[
                    item.name === itemCurrent.name
                      ? 'font-medium'
                      : 'font-normal',
                    'block truncate flex justify-left',
                  ]"
                >
                  <component
                    :is="item.icon"
                    v-if="item.icon"
                    class="h-5 w-5 mr-2"
                  />
                  {{ item.name }}
                </span>
                <span
                  v-if="item.name === itemCurrent.name"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { IBaseSwitchItem } from "~/models/base/IBaseSwitchItem";
import { themeButtonService } from "~/services/theme/ThemeButtonService";

interface Props {
  label?: string;
  themeButtonId: number;
  itemCurrent: IBaseSwitchItem;
  itemList: IBaseSwitchItem[];
}

defineProps<Props>();

defineEmits<{
  (e: "itemClicked", option: IBaseSwitchItem): void;
}>();
</script>

<template>
  <NuxtLink
    v-for="link in links"
    :key="link.text"
    :value="link.text"
    :to="localePath(link.to)"
    class="pl-4 my-1 py-1 cursor-pointer relative select-none hover:bg-slate-300 hover:dark:bg-slate-500 rounded-md"
    @click="$emit('close')"
  >
    <button>{{ $t(link.text) }}</button>
  </NuxtLink>
</template>

<script setup lang="ts">
import { PropsHeaderLink } from "../../types/PropsHeaderLink";

const localePath = useLocalePath();

interface Props {
  links: PropsHeaderLink[];
}

defineProps<Props>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

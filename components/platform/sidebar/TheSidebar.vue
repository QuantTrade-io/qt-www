<template>
  <div>
    <SidebarDesktop :links="links" :favourites="favourites" />
    <SidebarMobile
      :links="links"
      :favourites="favourites"
      :sidebar-open="sidebarOpen"
      @toggle-sidebar="$emit('toggleSidebar')"
    />
  </div>
</template>

<script setup lang="ts">
import {
  FolderIcon,
  GlobeAltIcon,
  PencilSquareIcon,
  HomeIcon,
} from "@heroicons/vue/24/outline";
import SidebarDesktop from "./locals/SidebarDesktop.vue";
import SidebarMobile from "./locals/SidebarMobile.vue";

const links = [
  { text: "Dashboard", to: "/platform/dashboard", icon: HomeIcon },
  { text: "Trade", to: "/platform/strategies", icon: FolderIcon },
  { text: "Design", to: "/platform/design", icon: PencilSquareIcon },
  { text: "Brokers", to: "/platform/brokers", icon: GlobeAltIcon },
];
const favourites = [
  { text: "OPG", to: "#", initial: "S" },
  { text: "Pair Trade $KO-$PEP", to: "#", initial: "S" },
  { text: "Crypto auto Rebalance", to: "#", initial: "C" },
];

interface Props {
  sidebarOpen: boolean;
}

defineProps<Props>();

defineEmits<{
  (e: "toggleSidebar"): void;
}>();
</script>

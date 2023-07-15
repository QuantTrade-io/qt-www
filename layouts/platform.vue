<template>
  <div>
    <div class="sticky top-0 z-10">
      <TheSidebar :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar"/>
      <TheTopbar :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar"/>
    </div>
    <div class="xl:pl-72">
      <slot class=""></slot>
    </div>
    <ModalMessage />
    <ToastMessage />
  </div>
</template>

<script setup lang="ts">
import TheSidebar from "@/components/platform/sidebar/TheSidebar.vue"
import TheTopbar from "@/components/platform/topbar/TheTopbar.vue"
// This import is here to make sure the proper theme is set
// when reloading one of the Auth pages
import { themeColorService } from "~/services/theme/ThemeColorService";
import ToastMessage from "~/components/response/ToastMessage.vue";
import ModalMessage from "~/components/response/ModalMessage.vue";
themeColorService.getTheme();

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

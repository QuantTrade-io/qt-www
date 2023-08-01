<template>
  <main>
    <!-- Settings forms -->
    <div class="divide-y divide-slate-300 dark:divide-white/5">
      <Preferences />
      <PersonalInformationForm />
      <ChangePasswordForm />
      <RequestChangeEmail />
      <BillingPortalSession />
      <DevicesOverview />
      <DeleteAccount />
    </div>
  </main>
</template>

<script setup lang="ts">
import BillingPortalSession from "./components/BillingPortalSession.vue";
import DeleteAccount from "./components/DeleteAccount.vue";
import Preferences from "./components/Preferences.vue";
import RequestChangeEmail from "./components/RequestChangeEmail.vue";
import DevicesOverview from "./components/DevicesOverview.vue";
import ChangePasswordForm from "~/components/forms/ChangePasswordForm.vue";
import PersonalInformationForm from "~/components/forms/PersonalInformationForm.vue";

definePageMeta({
  layout: "platform",
  middleware: [
    "check-logged-in-user-tokens",
    "check-logged-in-user-account-status",
  ],
});
</script>

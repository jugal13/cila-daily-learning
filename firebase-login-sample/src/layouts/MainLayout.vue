<template>
  <q-layout view="lHh Lpr lFf">

    <div class="flex justify-center">
      <the-header />
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import TheHeader from "src/components/TheHeader.vue";

export default {
  name: "MainLayout",
  components: { TheHeader },
};
</script>

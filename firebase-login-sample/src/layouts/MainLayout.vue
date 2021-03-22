<template>
  <q-layout view="lHh Lpr lFf">

    <the-header />

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

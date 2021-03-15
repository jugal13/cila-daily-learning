<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  },
  computed: {
    title() {
      const currentPath = this.$route.path;
      console.log(currentPath);
      if (currentPath === "/") {
        return "SmackChat";
      }
      if (currentPath === "/auth") {
        return "Login";
      }
      return currentPath[1].toUpperCase() + currentPath.slice(2);
    },
  },
};
</script>

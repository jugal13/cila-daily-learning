<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.path.includes('/chat')"
          v-go-back.single
          icon="arrow_back"
          flat
          dense
          label="back"
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login"
        />

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

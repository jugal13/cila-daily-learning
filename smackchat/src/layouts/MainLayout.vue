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
          v-if="!userDetails.userId"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login"
        />
        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
        >Logout<br>{{userDetails.name}}</q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "MainLayout",
  data() {
    return {};
  },

  computed: {
    ...mapState("store", ["userDetails"]),
    title() {
      const currentPath = this.$route.path;
      if (currentPath === "/") {
        return "SmackChat";
      }
      if (currentPath === "/auth") {
        return "Login";
      }
      if (currentPath.includes("/chat")) {
        return "Chat";
      }
      return currentPath[1].toUpperCase() + currentPath.slice(2);
    },
  },

  methods: {
    ...mapActions("store", ["logoutUser"]),
  },
};
</script>

<style lang="scss" scoped>
.q-toolbar {
  .q-btn {
    line-height: 1.2;
  }
}
</style>
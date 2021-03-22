<template>
  <div class="flex justify-around q-py-sm q-mb-sm nav">
    <ul class="flex no-padding no-margin items-center list-style">
      <li class="q-px-sm">
        <q-btn
          flat
          :size="size"
          color="white"
          to="login"
        >Login</q-btn>
      </li>
      <li class="q-px-sm">
        <q-btn
          flat
          :size="size"
          color="white"
          to="/register"
        >Register</q-btn>
      </li>
      <li class="q-px-sm">
        <q-btn
          flat
          :size="size"
          color="white"
          to="/secret"
        >Secret</q-btn>
      </li>
    </ul>
    <div>
      <q-btn
        flat
        color="white"
        :size="size"
        v-if="loggedIn"
        @click="signOut"
      >
        Logout
      </q-btn>
      <q-btn
        v-else
        color="white"
        flat
        to="/login"
        :size="size"
      >
        Not Logged In
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "top-header",
  computed: {
    ...mapState("user", ["user"]),
    loggedIn() {
      return Object.keys(this.user).length;
    },
    size() {
      return this.$q.screen.gt.sm ? "md" : "sm";
    },
  },
  methods: {
    ...mapActions("user", ["signOut"]),
  },
};
</script>

<style lang="scss" scoped>
div {
  color: inherit;
}

.list-style {
  list-style-type: none;
}

.nav {
  background-color: $primary;
}
</style>
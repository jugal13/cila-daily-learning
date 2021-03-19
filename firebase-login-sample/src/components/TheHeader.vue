<template>
  <div>
    Logged in
    <div v-if="loggedIn">Yes</div>
    <div v-else>No</div>
    <button
      v-if="loggedIn"
      class="but"
      @click="signOut"
    >Sign out</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "top-header",
  computed: {
    ...mapState("store", ["user"]),
    loggedIn() {
      return Object.keys(this.user).length;
    },
  },
  methods: {
    ...mapActions("store", ["signOut"]),
  },
};
</script>

<style lang="scss" scoped>
div {
  color: inherit;
}
</style>
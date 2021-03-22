<template>
  <q-page class="flex column items-center">
    <div class="col q-pa-lg limit-width">
      <q-form
        @submit="login"
        class="q-gutter-md"
      >
        <q-input
          outlined
          v-model="email"
          label="Email"
        />
        <q-input
          outlined
          type="password"
          v-model="password"
          label="Password"
        />

        <div class="row">
          <q-space></q-space>
          <q-btn
            type="submit"
            color="primary"
            label="Login"
          />
        </div>

      </q-form>

      <q-banner
        class="text-white bg-red"
        v-if="error"
      >
        {{ error }}
      </q-banner>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "test@test.com",
      password: "test123",
      error: "",
    };
  },
  methods: {
    ...mapActions("user", ["signInWithEmailAndPassword"]),
    async login() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        await this.signInWithEmailAndPassword(data);
        this.$router.replace("/secret");
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.limit-width {
  min-width: 320px;
  width: 100%;
  max-width: 500px;
}
</style>

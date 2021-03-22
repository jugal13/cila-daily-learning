<template>
  <q-page class="flex column">
    <div class="col q-pa-lg">
      <q-form
        @submit="register"
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
            label="Register"
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
    ...mapActions("user", ["createUserWithEmailAndPassword"]),
    async register() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        await this.createUserWithEmailAndPassword(data);
        this.$router.replace("/secret");
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
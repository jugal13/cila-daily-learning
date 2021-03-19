<template>
  <q-page class="flex">
    <div
      class="error"
      v-if="error"
    >{{error}}</div>
    <form @submit.prevent="register">
      Register
      <div class="email">
        <input
          type="email"
          v-model="email"
          placeholder="email"
        />
      </div>
      <div class="password">
        <input
          type="password"
          v-model="password"
          placeholder="password"
        />
      </div>
      <button type="submit">Register</button>
    </form>
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
    ...mapActions("store", ["createUserWithEmailAndPassword"]),
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
.error {
  color: red;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}

button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>
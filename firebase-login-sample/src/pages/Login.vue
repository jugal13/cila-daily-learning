<template>
  <q-page class="flex">
    <h3>Login</h3>
    <form @submit.prevent="login">
      <div class="login">
        <input
          type="text"
          placeholder="login"
          v-model="email"
        />
      </div>
      <div class="password">
        <input
          type="password"
          placeholder="password"
          v-model="password"
        />
      </div>
      <button>Login</button>
    </form>
    <div
      class="error"
      v-if="error"
    >{{error}}</div>
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
    ...mapActions("store", ["signInWithEmailAndPassword"]),
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
div {
  color: inherit;
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

.error {
  color: red;
}
</style>
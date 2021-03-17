<template>
  <q-form @submit="submitForm">
    <q-input
      outlined
      v-if="tab === 'register'"
      class="q-mb-md"
      v-model="formData.name"
      label="Name"
    />
    <q-input
      outlined
      class="q-mb-md"
      v-model="formData.email"
      label="Email"
    />
    <q-input
      outlined
      class="q-mb-md"
      type="password"
      v-model="formData.password"
      label="Password"
    />
    <div class="row">
      <q-space></q-space>
      <q-btn
        type="submit"
        color="primary"
        :label="tab"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "danny@test.com",
        password: "danny123",
      },
    };
  },
  methods: {
    ...mapActions("store", ["registerUser", "loginUser"]),
    submitForm() {
      if (this.tab === "login") {
        this.loginUser(this.formData);
      } else {
        this.registerUser(this.formData);
      }
    },
  },
};
</script>
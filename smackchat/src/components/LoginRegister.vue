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
export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      if (tab === "login") {
        console.log("Login");
      } else {
        console.log("Regsiter");
      }
    },
  },
};
</script>
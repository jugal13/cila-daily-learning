<template>
  <q-page class="flex q-pa-md">
    <q-list
      class="full-width"
      separator
    >
      <q-item
        v-for="user in users"
        :key="user.id"
        clickable
        v-ripple
        to="/chat"
      >
        <q-item-section avatar>
          <q-avatar
            color="primary"
            text-color="white"
          >
            {{ user.name[0] }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey-4' ">
            {{ user.online ? 'Online' : 'Offline'}}
          </q-badge>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Danny",
          online: true,
        },
        {
          id: 2,
          name: "Jim",
          online: false,
        },
        {
          id: 3,
          name: "Lucy",
          online: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
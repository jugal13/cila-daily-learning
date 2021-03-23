<template>
  <q-page class="flex column items-center">
    <div class="col q-pa-lg limit-width">
      <div v-if="items">
        <ul>
          <li
            v-for="item in items"
            :key="item.id"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div v-else>
        Nothing to do
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  mounted() {
    this.getTodos();
  },
  computed: {
    ...mapState("todo", ["items"]),
  },
  methods: {
    ...mapActions("todo", ["getTodos"]),
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

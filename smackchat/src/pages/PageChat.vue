<template>
  <q-page class="flex column">
    <q-banner
      class="bg-grey-4 text-center"
      v-if="!otherUserDetails.online
  "
    >
      {{ otherUserDetails.name }} is offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from === 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from==='me'"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form
          @submit.prevent="sendMessage"
          class="full-width"
        >
          <q-input
            bg-color="white"
            outlined
            dense
            rounded
            v-model="newMessage"
            label="Message"
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                color="white"
                icon="send"
              />
            </template>
          </q-input>
        </q-form>

      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinOtherUserDetails from "src/mixins/otherUserDetails";

export default {
  mixins: [mixinOtherUserDetails],
  data() {
    return {
      newMessage: "",
    };
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserId);
  },
  computed: {
    ...mapState("store", ["messages", "userDetails"]),
  },
  methods: {
    ...mapActions("store", [
      "firebaseGetMessages",
      "firebaseStopGettingMessages",
      "firebaseSendMessage",
    ]),
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: "me",
        },
        otherUserId: this.$route.params.otherUserId,
      });
      this.newMessage = "";
    },
  },
  destroyed() {
    this.firebaseStopGettingMessages();
  },
};
</script>

<style lang="scss" scoped>
</style>
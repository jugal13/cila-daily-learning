<template>
  <q-page
    class="flex column page-chat"
    ref="pageChat"
  >
    <q-banner
      class="bg-grey-4 text-center fixed-top"
      v-if="!otherUserDetails.online"
    >
      {{ otherUserDetails.name }} is offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        :class="{ 'invisible': !showMessages }"
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from === 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from==='me'"
        :bg-color="message.from==='me' ? 'white': 'light-green-2'"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form
          @submit.prevent="sendMessage"
          class="full-width"
        >
          <q-input
            ref="newMessage"
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
      showMessages: false,
    };
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserId);
  },
  computed: {
    ...mapState("store", ["messages", "userDetails"]),
  },
  watch: {
    messages: function (value) {
      if (Object.keys(value).length) {
        this.scrollToBottom();
        setTimeout(() => (this.showMessages = true), 200);
      }
    },
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
      this.clearMessage();
    },
    scrollToBottom() {
      const pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight);
      }, 20);
    },
    clearMessage() {
      this.newMessage = "";
      this.$refs.newMessage.focus();
    },
  },
  destroyed() {
    this.firebaseStopGettingMessages();
  },
};
</script>

<style lang="scss" scoped>
.q-message {
  z-index: 1;
}

.q-banner {
  top: 50px;
  z-index: 2;
  opacity: 0.8;
}

.page-chat {
  background-color: #e2dfd5;

  &::after {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    opacity: 0.1;
    bottom: 0;
    background-image: radial-gradient(
        circle at 100% 150%,
        silver 24%,
        white 24%,
        white 28%,
        silver 28%,
        silver 36%,
        white 36%,
        white 40%,
        transparent 40%,
        transparent
      ),
      radial-gradient(
        circle at 0 150%,
        silver 24%,
        white 24%,
        white 28%,
        silver 28%,
        silver 36%,
        white 36%,
        white 40%,
        transparent 40%,
        transparent
      ),
      radial-gradient(
        circle at 50% 100%,
        white 10%,
        silver 10%,
        silver 23%,
        white 23%,
        white 30%,
        silver 30%,
        silver 43%,
        white 43%,
        white 50%,
        silver 50%,
        silver 63%,
        white 63%,
        white 71%,
        transparent 71%,
        transparent
      ),
      radial-gradient(
        circle at 100% 50%,
        white 5%,
        silver 5%,
        silver 15%,
        white 15%,
        white 20%,
        silver 20%,
        silver 29%,
        white 29%,
        white 34%,
        silver 34%,
        silver 44%,
        white 44%,
        white 49%,
        transparent 49%,
        transparent
      ),
      radial-gradient(
        circle at 0 50%,
        white 5%,
        silver 5%,
        silver 15%,
        white 15%,
        white 20%,
        silver 20%,
        silver 29%,
        white 29%,
        white 34%,
        silver 34%,
        silver 44%,
        white 44%,
        white 49%,
        transparent 49%,
        transparent
      );
    background-size: 100px 50px;
  }
}
</style>
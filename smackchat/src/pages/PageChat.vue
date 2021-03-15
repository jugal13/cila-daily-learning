<template>
  <q-page class="flex column">
    <q-banner class="bg-grey-4 text-center">
      User is offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
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
export default {
  data() {
    return {
      messages: [
        {
          text: "Hey Jim, how are you?",
          from: "me",
        },
        {
          text: "Good thanks, Danny! How are you?",
          from: "them",
        },
        {
          text: "Pretty Good",
          from: "me",
        },
      ],
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: "me",
      });
      this.newMessage = "";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
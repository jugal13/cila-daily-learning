import { firebaseAuth, firebaseDb } from "boot/firebase";
import Vue from "vue";

let messagesRef;

const state = {
  userDetails: {},
  users: {},
  messages: {}
};

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload;
  },

  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails);
  },

  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails);
  },

  addMessage(state, payload) {
    Vue.set(state.messages, payload.messageId, payload.messageDetails);
  },
  clearMessages(state) {
    state.messages = {};
  }
};

const actions = {
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(authCredential => {
        firebaseDb.ref("users/" + authCredential.user.uid).set({
          name: payload.name,
          email: payload.email,
          online: true
        });
      })
      .catch(error => {
        console.error(error.message);
      });
  },

  loginUser({}, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(authCredential => {
        console.log("logged in");
      })
      .catch(error => console.error(error));
  },

  logoutUser() {
    firebaseAuth.signOut();
  },

  handleAuthStateChanged({ state, commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        const userId = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + user.uid).once("value", snapshot => {
          const userDetails = snapshot.val();
          commit("setUserDetails", { ...userDetails, userId: userId });
        });
        dispatch("firebaseUpdateUser", {
          userId: userId,
          updates: {
            online: true
          }
        });
        dispatch("firebaseGetUsers");
        this.$router.push("/").catch(e => {});
      } else {
        console.log("logged out: OFFLINE");
        if (state.userDetails.userId) {
          dispatch("firebaseUpdateUser", {
            userId: state.userDetails.userId,
            updates: {
              online: false
            }
          });
        }
        commit("setUserDetails", {});
        this.$router.replace("/auth").catch(e => {});
      }
    });
  },

  firebaseUpdateUser({}, payload) {
    firebaseDb.ref("users/" + payload.userId).update(payload.updates);
  },

  firebaseGetUsers({ commit }) {
    firebaseDb.ref("users/").on("child_added", snapshot => {
      const userDetails = snapshot.val();
      const userId = snapshot.key;
      commit("addUser", { userId, userDetails });
    });
    firebaseDb.ref("users/").on("child_changed", snapshot => {
      const userDetails = snapshot.val();
      const userId = snapshot.key;
      commit("updateUser", { userId, userDetails });
    });
  },

  firebaseGetMessages({ commit }, otherUserId) {
    const userId = state.userDetails.userId;
    messagesRef = firebaseDb.ref(`chats/${userId}/${otherUserId}`);
    messagesRef.on("child_added", snapshot => {
      const messageDetails = snapshot.val();
      const messageId = snapshot.key;
      commit("addMessage", {
        messageId,
        messageDetails
      });
    });
  },

  firebaseStopGettingMessages({ commit }) {
    if (messagesRef) {
      messagesRef.off("child_added");
    }
    commit("clearMessages");
  },

  firebaseSendMessage({ state }, payload) {
    firebaseDb
      .ref(`chats/${state.userDetails.userId}/${payload.otherUserId}`)
      .push(payload.message);
    firebaseDb
      .ref(`chats/${payload.otherUserId}/${state.userDetails.userId}`)
      .push({
        text: payload.message.text,
        from: "them"
      });
  }
};

const getters = {
  users: state => {
    const filteredUsers = {};

    Object.keys(state.users).forEach(user => {
      if (user !== state.userDetails.userId) {
        filteredUsers[user] = state.users[user];
      }
    });

    return filteredUsers;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

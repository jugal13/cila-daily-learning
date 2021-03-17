import { firebaseAuth, firebaseDb } from "boot/firebase";
import Vue from "vue";

const state = {
  userDetails: {},
  users: {}
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
        dispatch("firebaseUpdateUser", {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        });
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

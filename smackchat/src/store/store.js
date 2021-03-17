import { firebaseAuth, firebaseDb } from "boot/firebase";

const state = {
  userDetails: {}
};

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload;
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

  handleAuthStateChanged({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        firebaseDb.ref("users/" + user.uid).once("value", snapshot => {
          const userDetails = snapshot.val();
          commit("setUserDetails", { ...userDetails, userId: user.uid });
        });
      } else {
        commit("setUserDetails", {});
      }
    });
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

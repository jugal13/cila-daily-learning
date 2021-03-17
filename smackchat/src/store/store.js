import { firebaseAuth, firebaseDb } from "boot/firebase";

const state = {};

const mutations = {};

const actions = {
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(authCredential => {
        console.log(authCredential);
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
        console.log(authCredential);
        firebaseDb
          .ref("users/" + authCredential.user.uid)
          .set({ online: true });
      })
      .catch(error => console.error(error));
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

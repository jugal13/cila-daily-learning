import { firebaseAuth } from "src/boot/firebase";
import Vue from "vue";

const state = {
  user: {}
};

const actions = {
  async signInWithEmailAndPassword({ commit }, payload) {
    try {
      const auth = await firebaseAuth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      );
      commit("updateUser", {
        uid: auth.user.uid
      });
      return auth.user !== null;
    } catch (error) {
      throw error;
    }
  },

  async createUserWithEmailAndPassword({ commit }, payload) {
    try {
      const auth = await firebaseAuth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      );
      commit("updateUser", {
        uid: auth.user.uid
      });
      return auth.user !== null;
    } catch (error) {
      throw error;
    }
  },

  async signOut({ commit }) {
    try {
      await firebaseAuth.signOut();
      commit("updateUser", {});
      this.$router.replace("/login").catch(e => {});
    } catch (error) {
      throw error;
    }
  }
};

const mutations = {
  updateUser(state, data) {
    state.user = { ...data };
  }
};

const getters = {};

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
};

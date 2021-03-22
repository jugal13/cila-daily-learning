import { firebaseAuth } from "src/boot/firebase";

async function signInWithEmailAndPassword({ commit }, payload) {
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
}

async function createUserWithEmailAndPassword({ commit }, payload) {
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
}

async function signOut({ commit }) {
  try {
    await firebaseAuth.signOut();
    commit("updateUser", {});
    this.$router.replace("/login").catch(e => {});
  } catch (error) {
    throw error;
  }
}

export { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };

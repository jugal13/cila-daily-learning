// import something here

import { firebaseAuth } from "src/boot/firebase";

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, Vue ... } */ { store }) => {
  // something to do
  await new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        store.commit("user/updateUser", {
          uid: user.uid
        });
      }
      resolve();
    });
  });
};

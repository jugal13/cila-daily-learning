// import something here

import { firebaseAuth } from "src/boot/firebase";

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async (/* { app, router, Vue ... } */ { Store }) => {
  // something to do
  await new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged(user => {
      resolve();
    });
  });
};

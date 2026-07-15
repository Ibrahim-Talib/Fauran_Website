/* =============================================================================
   firebase-config.example.js  —  TEMPLATE (safe to commit)
   -----------------------------------------------------------------------------
   waitlist.js resolves its Firebase config in this order:
     1. GET /__/firebase/init.json   (auto-provided when hosted on Firebase
        Hosting — nothing to commit, this is the preferred path)
     2. window.FIREBASE_CONFIG       (this file, for local dev or non-Firebase hosts)

   To use option 2 locally:
     1. copy this file to  firebase-config.js   (git-ignored)
     2. fill in the real values from the Firebase console (reuse the EXISTING project)
     3. add  <script src="firebase-config.js"></script>  in <head> of index.html
        BEFORE the waitlist.js module tag.

   Note: Firebase web config keys are not secrets (security is enforced by
   firestore.rules + App Check), but per project policy they are not committed
   here in plaintext.
   ========================================================================== */

window.FIREBASE_CONFIG = {
  apiKey: "[PLACEHOLDER]",
  authDomain: "[PLACEHOLDER].firebaseapp.com",
  projectId: "[PLACEHOLDER]",
  storageBucket: "[PLACEHOLDER].appspot.com",
  messagingSenderId: "[PLACEHOLDER]",
  appId: "[PLACEHOLDER]"
};

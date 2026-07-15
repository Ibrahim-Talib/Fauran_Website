/* =============================================================================
   waitlist.js  —  THE SINGLE PERSISTENCE SWAP POINT
   -----------------------------------------------------------------------------
   This is the ONLY file in the project that touches the backend. When the
   project migrates from Firebase to Supabase, replace the body of
   `submitWaitlist()` (and `loadBackend()`), and nothing else in the site changes.

   Backend today: Firebase Firestore *lite* submodule, loaded lazily via ESM from
   Google's CDN on first submit (keeps Firebase off the critical path / first paint).

   Writes go to the dedicated `waitlist_signups` collection ONLY. It never reads,
   updates, or references any existing app collection. The document shape below is
   kept byte-for-byte in sync with `firestore.rules` (create-only, validated).

   Config is injected at runtime, never committed:
     1. Firebase Hosting reserved URL  /__/firebase/init.json   (preferred)
     2. window.FIREBASE_CONFIG  (set by an untracked firebase-config.js)
   ========================================================================== */

// Pinned SDK version. Bump deliberately; keep both URLs on the same version.
const FB_VERSION = "10.12.5";
const FB_APP_URL = `https://www.gstatic.com/firebasejs/${FB_VERSION}/firebase-app.js`;
const FB_DB_URL = `https://www.gstatic.com/firebasejs/${FB_VERSION}/firebase-firestore-lite.js`;

const COLLECTION = "waitlist_signups";
const MIN_FILL_MS = 1200; // submissions faster than this are almost certainly bots

// ---------------------------------------------------------------- backend ----
let _backend = null; // memoised { db, collection, addDoc, serverTimestamp }

async function getFirebaseConfig() {
  // 1) Firebase Hosting auto-provisioned config (no secrets in the repo).
  try {
    const res = await fetch("/__/firebase/init.json", { cache: "no-store" });
    if (res.ok) {
      const cfg = await res.json();
      if (cfg && cfg.projectId) return cfg;
    }
  } catch (_) { /* not on Firebase Hosting, fall through */ }

  // 2) Locally-injected config (untracked firebase-config.js sets window.FIREBASE_CONFIG).
  if (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.projectId) {
    return window.FIREBASE_CONFIG;
  }
  throw new Error("Firebase config unavailable");
}

async function loadBackend() {
  if (_backend) return _backend;
  const [{ initializeApp }, fb] = await Promise.all([
    import(/* @vite-ignore */ FB_APP_URL),
    import(/* @vite-ignore */ FB_DB_URL),
  ]);
  const cfg = await getFirebaseConfig();
  const app = initializeApp(cfg);
  const db = fb.getFirestore(app);
  _backend = {
    db,
    collection: fb.collection,
    addDoc: fb.addDoc,
    serverTimestamp: fb.serverTimestamp,
  };
  return _backend;
}

/**
 * The one function the rest of the site depends on. Persists a single waitlist
 * signup. Swap the body of this function (and loadBackend) to change backends.
 * @param {{phone:string, city:string, role:string, source:string}} record
 */
async function submitWaitlist(record) {
  const { db, collection, addDoc, serverTimestamp } = await loadBackend();
  await addDoc(collection(db, COLLECTION), {
    phone: record.phone,
    city: record.city || "",
    role: record.role || "",
    source: record.source || "web",
    createdAt: serverTimestamp(), // resolves to request.time server-side (matches rules)
  });
}

// -------------------------------------------------------------- validation ---
// Normalises PK mobile input to E.164: +92 3XX XXXXXXX -> +923XXXXXXXXX.
// Accepts "0300 1234567", "300 1234567", "3001234567", "+92 300 1234567".
function normalizePkPhone(raw) {
  let d = String(raw || "").replace(/[^\d]/g, "");
  if (d.startsWith("0092")) d = d.slice(4);
  else if (d.startsWith("92")) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  // d should now be 10 digits beginning with 3 (Pakistani mobile).
  if (/^3\d{9}$/.test(d)) return "+92" + d;
  return null;
}

// -------------------------------------------------------------- UI wiring ----
function fieldWrap(input) {
  return input.closest(".form-field") || input.closest(".phone-wrap");
}
function setError(input, on) {
  const w = fieldWrap(input);
  if (w) w.classList.toggle("invalid", !!on);
}
function status(form, msg, kind) {
  const el = form.querySelector("[data-status]");
  if (!el) return;
  el.textContent = msg || "";
  if (kind) el.setAttribute("data-kind", kind);
  else el.removeAttribute("data-kind");
}

function showSuccess(form) {
  // Prefer a dedicated success block in the same card; otherwise inline status.
  const card = form.closest(".waitlist-card") || form.parentElement;
  const success = card && card.querySelector("[data-success]");
  if (success) {
    form.classList.add("hide");
    success.classList.add("show");
    success.setAttribute("tabindex", "-1");
    success.focus({ preventScroll: true });
  } else {
    status(form, "You're on the list. We'll text you when we launch.", "ok");
    form.reset();
  }
}

function bindForm(form) {
  const rendered = performance.now();
  const phoneInput = form.querySelector(".js-phone");
  const honeypot = form.querySelector(".hp");
  const submitBtn = form.querySelector('button[type="submit"]');

  // Clear the error state as soon as the user corrects the field.
  if (phoneInput) {
    phoneInput.addEventListener("input", () => setError(phoneInput, false));
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status(form, "", null);

    // Bot trap 1: honeypot must stay empty.
    if (honeypot && honeypot.value.trim() !== "") return;
    // Bot trap 2: near-instant submissions are bots.
    if (performance.now() - rendered < MIN_FILL_MS) return;

    const phone = normalizePkPhone(phoneInput && phoneInput.value);
    if (!phone) {
      setError(phoneInput, true);
      if (phoneInput) phoneInput.focus();
      return;
    }

    const record = {
      phone,
      city: (form.querySelector('[name="city"]') || {}).value || "",
      role: (form.querySelector('[name="role"]') || {}).value || "",
      source: form.getAttribute("data-source") || "web",
    };

    if (submitBtn) submitBtn.setAttribute("aria-busy", "true");
    try {
      await submitWaitlist(record);
      showSuccess(form);
    } catch (err) {
      console.error("[waitlist] submit failed:", err);
      status(
        form,
        "Something went wrong. Please try again, or check back soon.",
        "error"
      );
    } finally {
      if (submitBtn) submitBtn.removeAttribute("aria-busy");
    }
  });
}

function init() {
  document.querySelectorAll(".js-waitlist-form").forEach(bindForm);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

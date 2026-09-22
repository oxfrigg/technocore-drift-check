const monitor = {
  checks: 2,
  stale: 2,
  sources: 3,
};

document.getElementById("active-checks").textContent = monitor.checks;
document.getElementById("stale-count").textContent = monitor.stale;
document.getElementById("source-count").textContent = monitor.sources;


const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const themeIcon = document.getElementById("theme-icon");

const savedTheme = localStorage.getItem("frigg-theme") || "light";

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;

  themeLabel.textContent =
    theme === "dark" ? "LIGHT" : "DARK";

  themeIcon.textContent =
    theme === "dark" ? "☀" : "◐";

  localStorage.setItem("frigg-theme", theme);
}

setTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const current =
    document.documentElement.dataset.theme || "light";

  setTheme(current === "light" ? "dark" : "light");
});

// Technocore DID inspector.
// Public DID only. No signing, wallet access, or secrets.
// Reads only canonical Technocore identity-note paths derived from the DID.

const didForm = document.getElementById("did-form");
const didInput = document.getElementById("did-input");
const didStatus = document.getElementById("did-status");
const didNoteMatch = document.getElementById("did-note-match");
const didFingerprint = document.getElementById("did-fingerprint");
const didNotePath = document.getElementById("did-note-path");
const didMailbox = document.getElementById("did-mailbox");
const didX25519 = document.getElementById("did-x25519");
const didDelegations = document.getElementById("did-delegations");
const didTclk = document.getElementById("did-tclk");
const didGithub = document.getElementById("did-github");
const didProject = document.getElementById("did-project");
const didEvidence = document.getElementById("did-evidence");
const didNoteLink = document.getElementById("did-note-link");

const TECHNOCORE_ORIGIN = "https://technocore.chat";

function validTechnocoreDid(did) {
  return /^did:key:z6Mk[1-9A-HJ-NP-Za-km-z]{44}$/.test(did);
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return [...new Uint8Array(digest)]
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

function fieldFromNote(text, name) {
  const pattern = new RegExp(
    `(?:^|\\s)${name}:\\s*(\\S+)`,
    "i"
  );

  const match = text.match(pattern);
  return match ? match[1] : null;
}

function countDelegations(text) {
  const fields = text.trim().split(/\s+/);
  let count = 0;

  for (let i = 0; i < fields.length; i += 1) {
    if (fields[i] === "delegate:" && fields.length >= i + 6) {
      count += 1;
    }
  }

  return count;
}

function resetDidResult() {
  didStatus.textContent = "WAITING FOR DID";
  didNoteMatch.textContent = "—";
  didFingerprint.textContent = "—";
  didNotePath.textContent = "—";
  didMailbox.textContent = "—";
  didX25519.textContent = "—";
  didDelegations.textContent = "—";
  didTclk.textContent = "—";
  didGithub.textContent = "—";
  didProject.textContent = "—";
  didEvidence.textContent = "—";

  didNoteLink.href = "#";
  didNoteLink.classList.add("is-disabled");
  didNoteLink.setAttribute("aria-disabled", "true");
}

async function getIdentityNote(fingerprint) {
  const currentPath =
    `/kv/did-${fingerprint.slice(0, 2)}/${fingerprint.slice(2)}`;

  const legacyPath =
    `/kv/did/${fingerprint}`;

  for (const path of [currentPath, legacyPath]) {
    const url = `${TECHNOCORE_ORIGIN}${path}`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      credentials: "omit",
    });

    if (response.status === 404) {
      continue;
    }

    if (!response.ok) {
      throw new Error(`Technocore returned HTTP ${response.status}`);
    }

    return {
      path,
      url,
      text: await response.text(),
      legacy: path === legacyPath,
    };
  }

  return null;
}

async function inspectDid(did) {
  const fingerprint = (await sha256Hex(did)).slice(0, 16);
  didFingerprint.textContent = fingerprint;

  const result = await getIdentityNote(fingerprint);

  if (!result) {
    didStatus.textContent = "NOTE NOT FOUND";
    didNoteMatch.textContent = "—";
    return;
  }

  const note = result.text;
  const tokens = note.trim().split(/\s+/);

  didStatus.textContent =
    result.legacy ? "NOTE FOUND · LEGACY PATH" : "NOTE FOUND";

  didNoteMatch.textContent =
    tokens.includes(did) ? "DECLARED" : "NOT DECLARED";

  didNotePath.textContent = result.path;

  didMailbox.textContent =
    fieldFromNote(note, "mailbox") || "NOT DECLARED";

  didX25519.textContent =
    fieldFromNote(note, "x25519") || "NOT DECLARED";

  const delegationCount = countDelegations(note);
  didDelegations.textContent =
    delegationCount ? String(delegationCount) : "NONE DETECTED";

  didTclk.textContent =
    fieldFromNote(note, "tclk1") || "NOT DECLARED";

  didGithub.textContent =
    fieldFromNote(note, "github") || "NOT DECLARED";

  didProject.textContent =
    fieldFromNote(note, "repo") || "NOT DECLARED";

  didEvidence.textContent =
    fieldFromNote(note, "evidence") || "NOT DECLARED";

  didNoteLink.href = result.url;
  didNoteLink.classList.remove("is-disabled");
  didNoteLink.removeAttribute("aria-disabled");
}

if (didForm) {
  didForm.addEventListener("submit", async event => {
    event.preventDefault();

    const did = didInput.value.trim();

    resetDidResult();

    if (!validTechnocoreDid(did)) {
      didStatus.textContent = "INVALID DID";
      return;
    }

    didStatus.textContent = "INSPECTING…";

    try {
      await inspectDid(did);
    } catch (error) {
      console.error("DID inspection failed:", error);
      didStatus.textContent = "LOOKUP FAILED";
    }
  });
}

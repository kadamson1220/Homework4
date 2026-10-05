import { loadPages } from "./model.js";
import { showToast } from "./utility.js";
let isLoggedIn = false;

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");

  if (pageID) {
    loadPages(pageID);
  } else {
    loadPages("home");
  }

  initPageListeners();
}

function initURLListener() {
  window.addEventListener("hashchange", changeRoute);
  changeRoute();
}

function initPageListeners() {
  const loadBtn = document.querySelector("#loadBtn");

  if (loadBtn) {
    loadBtn.addEventListener("click", loadData);
  }
}

function loadData() {
  const data = document.querySelector("#data");
  showToast("Loading data...", "loading");

  //pretend to load data from server
  setTimeout(() => {
    data.innerHTML = `
      <p class="eyebrow">Student Data</p>
      <h2>Kayli Adamson</h2>
      <div class="student-details">
        <p><strong>Class Standing:</strong> Junior</p>
        <p><strong>Majors:</strong> Computer Science &amp; Digital Forensics</p>
        <p><strong>Campus:</strong> IU Indianapolis</p>
      </div>
    `;
    showToast("Data loaded successfully", "success");
  }, 2000);
}

function initLogin() {
  const loginBtn = document.querySelector("#loginBtn");
  const loginModal = document.querySelector("#loginModal");
  const closeModal = document.querySelector("#closeModal");
  const loginForm = document.querySelector("#loginForm");

  loginBtn.addEventListener("click", () => {
    if (isLoggedIn) {
      isLoggedIn = false;
      loginBtn.innerHTML = "SIGN IN";

      showToast("Logged out successfully", "info");
      return;
    }

    loginModal.classList.add("modal--show");
  });

  closeModal.addEventListener("click", () => {
    loginModal.classList.remove("modal--show");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.querySelector("#email").value;
    const passwordInput = document.querySelector("#password").value;
    const email = emailInput.trim();
    const password = passwordInput.trim();

    // Email validation
    if (email === "") {
      showToast("Email is required", "error");
      return;
    }
    if (emailInput !== email) {
      showToast("Email cannot have spaces at the beginning or end", "error");
      return;
    }
    if (email.length < 5) {
      showToast("Email must be at least 5 characters", "error");
      return;
    }
    if (!email.includes("@")) {
      showToast("Email must be valid with an @", "error");
      return;
    }

    // Password validation
    if (password === "") {
      showToast("Password is required", "error");
      return;
    }
    if (passwordInput !== password) {
      showToast("Password cannot have spaces at the beginning or end", "error");
      return;
    }
    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      showToast("Password must contain at least one uppercase letter", "error");
      return;
    }

    // Login Success
    isLoggedIn = true;
    loginBtn.innerHTML = "LOGOUT";
    showToast("Logged in successfully", "success");
    loginModal.classList.remove("modal--show");
    loginForm.reset();
  });
}

function initApp() {
  initURLListener();
  initLogin();
}

initApp();

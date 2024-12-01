document.querySelectorAll(".toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    document.querySelector(".wrapper").classList.toggle("flip");
  });
});

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth();

// START HERE

const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpBtn = document.getElementById("signup-btn");
const UIErrorMessage = document.getElementById("error-message");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");

const loginSignUpFormView = document.getElementById("login-signup-form");
const userProfileView = document.getElementById("user-profile");
const UIuserEmail = document.getElementById("user-email");
const stateBtn = document.getElementById("state-btn");
// const userName = document.getElementById("user-name");
const username = document.getElementById("username");
const modalh1 = document.querySelector(".modalh1");
const testName = document.getElementById("testName");
// const mainView = document.getElementById("main-view");
// const index2HomeState = document.getElementById("index2HomeState");

const loginErrorMsg = document.getElementById("login-error-message");
const loadingScreen = document.getElementById("loadingScreen");
const loadingScreenLogin = document.getElementById("loadingScreenLogin");

// MODAL

// const showModalEl = document.querySelectorAll(".show-modal");
const closeModalEl = document.querySelector(".close-modal");
const modalEl = document.querySelector(".modal");
const overlayEl = document.querySelector(".overlay");

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header1");

// FUNCTIONS

// menu
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
// end menu

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in: ", user);
  } else {
    console.log("No user is signed in.");
  }
  // mainView.classList.remove("loading");
});

// CREATEUSER REGISTER
const signUpButtonPressed = async (e) => {
  e.preventDefault();

  loadingScreen.style.display = "flex";

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    // for displayName
    // Set the display name using updateProfile
    await updateProfile(userCredential.user, {
      displayName: username.value,
    });
    console.log(userCredential);
    // modalh1.innerHTML = userCredential.user.displayName;
    // loginSignUpFormView.style.display = "none";
    // userProfileView.style.display = "block";
    // UIuserEmail.innerHTML = userCredential.user.email;

    ////////
    // manually logged out the user
    await signOut(auth);
    console.log("User created and logged out.");

    // SPINNER
    loadingScreen.style.display = "none";

    // MODAL
    modal();
    // setTimeout(() => {
    //   alert("Successful");
    // }, 500);
    // userName.innerHTML = userCredential.user.displayName;
    // console.log("User display name set to:", userCredential.user.displayName);
  } catch (error) {
    console.log(error.code);
    UIErrorMessage.innerHTML = formatErrorMessage(error.code, "signup");
    UIErrorMessage.classList.remove("display-none");
    loadingScreen.style.display = "none";
  }
};

// LOGIN USER
const loginButtonPressed = async (e) => {
  e.preventDefault();

  loadingScreenLogin.style.display = "flex";

  console.log(loginEmail.value);
  console.log(loginPassword.value);
  try {
    await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );
    alert("Successful");
    window.location.href = "index2.html";
    loginEmail.value = "";
    loginPassword.value = "";

    loadingScreenLogin.style.display = "none";
  } catch (error) {
    console.log(error.code);
    console.log(formatErrorMessage(error.code, "login"));
    loginErrorMsg.innerHTML = formatErrorMessage(error.code, "login");
    loginErrorMsg.classList.remove("display-none");

    loadingScreenLogin.style.display = "none";
  }
};

// CALLBACK
signUpBtn.addEventListener("click", signUpButtonPressed);
loginBtn.addEventListener("click", loginButtonPressed);

const formatErrorMessage = (errorCode, action) => {
  let message = "";
  if (action === "signup") {
    if (
      errorCode === "auth/invalid-email" ||
      errorCode === "auth/missing-email"
    ) {
      message = "Please enter a valid email";
    } else if (
      errorCode === "auth/missing-password" ||
      errorCode === "auth/weak-password"
    ) {
      message = "Password must be at least 6 characters long";
    } else if (errorCode === "auth/email-already-in-use") {
      message = "Email is already taken";
    }
  } else if (action === "login") {
    if (
      errorCode === "auth/invalid-email" ||
      errorCode === "auth/missing-password"
    ) {
      message = "Email or Password is incorrect";
    } else if (errorCode === "auth/user-not-found") {
      message = "Unable to verify email or password";
    }
  }

  return message;
};

const modal = () => {
  const openModal = () => {
    modalEl.classList.remove("hidden");
    overlayEl.classList.remove("hidden");
  };

  const closeModal = () => {
    modalEl.classList.add("hidden");
    overlayEl.classList.add("hidden");
    location.reload();
  };

  // Uncomment and use this if you want to bind openModal to specific elements
  // showModalEl.forEach((element) => {
  //   element.addEventListener("click", openModal);
  // });

  closeModalEl.addEventListener("click", closeModal);
  overlayEl.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
      closeModal();
    }
  });
  openModal();
};

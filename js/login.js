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
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
let file = null;

// START HERE

const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpBtn = document.getElementById("signup-btn");

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

// NEW
const resetPasswordForm = document.getElementById("reset-password-form");
const forgotPassBtn = document.getElementById("forgotPassBtn");
const resetPasswordBtn = document.getElementById("reset-password-btn");
const resetPasswordEmail = document.getElementById("reset-password-email");
const loginGoogleBtn = document.getElementById("login-google-btn");
const loginFacebookBtn = document.getElementById("login-facebook-btn");

const phone = document.getElementById("phone");

const imageUpload = document.getElementById("imageUpload");

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

    await updateProfile(userCredential.user, {
      displayName: username.value,
    });
    console.log(userCredential);

    await sendEmailVerification(userCredential.user);

    const docRef = doc(db, "users", userCredential.user.uid);
    await setDoc(docRef, {
      name: username.value,
      phone: phone.value,
      email: email.value,
    });

    if (file) {
      const customFileName = `${userCredential.user.uid}-profile-picture`;
      const storageRef = ref(
        storage,
        `user_images/${userCredential.user.uid}/${customFileName}`
      );

      await uploadBytes(storageRef, file);
      console.log("Profile picture uploaded");
    } else {
      console.log("No file selected, skipping upload.");
    }

    loadingScreen.style.display = "none";
    modal();
    await signOut(auth);
  } catch (error) {
    console.log("Error signing up:", error.code);
    loadingScreen.style.display = "none";

    UIErrorMessage.innerHTML = formatErrorMessage(error.code, "signup");
    UIErrorMessage.classList.remove("display-none");
  }
};

// LOGIN USER
const loginButtonPressed = async (e) => {
  e.preventDefault();

  loadingScreenLogin.style.display = "flex";

  console.log(loginEmail.value);
  console.log(loginPassword.value);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value
    );
    const user = userCredential.user;
    if (!user.emailVerified) {
      alert("You must verify your email before logging in.");

      await signOut(auth);
      window.location.href = "login.html";
      loadingScreenLogin.style.display = "none";
      return;
    }

    window.location.href = "index2.html";
    loginEmail.value = "";
    loginPassword.value = "";

    loadingScreenLogin.style.display = "none";
    ////////
  } catch (error) {
    console.log(error.code);
    console.log(formatErrorMessage(error.code, "login"));
    loginErrorMsg.innerHTML = formatErrorMessage(error.code, "login");
    loginErrorMsg.classList.remove("display-none");

    loadingScreenLogin.style.display = "none";
  }
};

// NEW
const loadingScreenReset = document.getElementById("loadingScreenReset");
const resetErrorMessage = document.getElementById("reset-error-message");

const backLoginBtn = document.getElementById("back-login-btn");

const backLoginPressed = () => {
  loginSignUpFormView.style.display = "block";
  resetPasswordForm.style.display = "none";
};

backLoginBtn.addEventListener("click", backLoginPressed);

const forgotPasswordButtonPressed = () => {
  loginSignUpFormView.style.display = "none";
  resetPasswordForm.style.display = "block";
};

const resetPasswordButtonPressed = async (e) => {
  e.preventDefault();

  try {
    console.log(resetPasswordEmail.value);
    await sendPasswordResetEmail(auth, resetPasswordEmail.value);
    resetErrorMessage.innerHTML = `We've sent a link to reset your password to ${resetPasswordEmail.value}`;
    alert("Reset password email has been sent!");
    resetErrorMessage.style.color = "#2ec246";
    resetErrorMessage.classList.remove("display-none");

    resetPasswordEmail.value = "";
  } catch (error) {
    resetErrorMessage.innerHTML = "Please provide a valid registered email";
    resetErrorMessage.style.color = "#9f3a38";
    resetErrorMessage.classList.remove("display-none");
    console.log(error.code);
  }
};
// END NEW

// GOOGLE
const loginGoogleBtnPressed = async (e) => {
  e.preventDefault();
  const googleProvider = new GoogleAuthProvider();
  loadingScreen.style.display = "flex";
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log(`Signed in as: ${user.displayName} (${user.email})`);
    console.log("Redirecting to index.html...");
    alert(`Signed in as: ${user.displayName}`);

    // /////////////////
    const userName = user.displayName || user.email || `User ${user.uid}`;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: userName, // Use Google Display Name or fallback name
        phone: "", // Empty or prompt for phone later
        email: user.email,
      });
    } else {
      console.log("User data already exists in Firestore.");
    }
    // //////////////

    openModal();

    modalh1.innerHTML = "Successfully loged in using Google!";
    document.querySelector(
      ".modal-text"
    ).innerHTML = `Signed in as: ${user.displayName}`;
    closeModalEl.addEventListener("click", () => {
      closeModal();
      window.location.href = "index.html";
    });
    overlayEl.addEventListener("click", () => {
      closeModal();
      window.location.href = "index.html";
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
        closeModal();
        window.location.href = "index.html";
      }
    });
    loadingScreen.style.display = "none";
  } catch (error) {
    alert(error.code);
    console.log(error.code);
  }
};

// FACEBOOK
const loginFacebookBtnPressed = async (e) => {
  e.preventDefault();
  const facebookProvider = new FacebookAuthProvider();
  loadingScreen.style.display = "flex";
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    console.log(`Signed in as: ${user.displayName} (${user.email})`);
    console.log("Redirecting to index.html...");
    alert(`Signed in as: ${user.displayName}`);

    // /////////////////
    const userName = user.displayName || user.email || `User ${user.uid}`;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: userName, // Use Facebook Display Name or fallback name
        phone: "", // Empty or prompt for phone later
        email: user.email,
      });
    } else {
      console.log("User data already exists in Firestore.");
    }
    // //////////////

    openModal();

    modalh1.innerHTML = "Successfully loged in using Facebook!";
    document.querySelector(
      ".modal-text"
    ).innerHTML = `Signed in as: ${user.displayName}`;
    closeModalEl.addEventListener("click", () => {
      closeModal();
      window.location.href = "index.html";
    });
    overlayEl.addEventListener("click", () => {
      closeModal();
      window.location.href = "index.html";
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
        closeModal();
        window.location.href = "index.html";
      }
    });
    loadingScreen.style.display = "none";
    // window.location.href = "index.html";
  } catch (error) {
    alert(error.code);
    console.log(error.code);
  }
};

const imageUploadChosen = (e) => {
  file = e.target.files[0];
  console.log("File selected for upload:", file);
};

// CALLBACK
signUpBtn.addEventListener("click", signUpButtonPressed);
loginBtn.addEventListener("click", loginButtonPressed);

forgotPassBtn.addEventListener("click", forgotPasswordButtonPressed);
resetPasswordBtn.addEventListener("click", resetPasswordButtonPressed);

loginGoogleBtn.addEventListener("click", loginGoogleBtnPressed);
loginFacebookBtn.addEventListener("click", loginFacebookBtnPressed);

imageUpload.addEventListener("change", imageUploadChosen);

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
      errorCode === "auth/missing-password" ||
      errorCode === "auth/invalid-credential"
    ) {
      message = "Email or Password is incorrect";
    } else if (errorCode === "auth/user-not-found") {
      message = "Unable to verify email or password";
    }
  }

  return message;
};

// MODAL
const openModal = () => {
  modalEl.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
};

const closeModal = () => {
  modalEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
  location.reload();
};

const modal = () => {
  closeModalEl.addEventListener("click", closeModal);
  overlayEl.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
      closeModal();
    }
  });
  openModal();
};

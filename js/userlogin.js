import app from "/iphowinProject/js/firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth = getAuth(app);

const getStartedBtn = document.getElementById("getStartedBtn");
const mainLog = document.getElementById("mainLog");

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in: ", user);
    //Changing some of the status and buttons
    getStartedBtn.href = "index2.html";
    console.log("getStartedBtn:", getStartedBtn);
    console.log("Href updated to: ", getStartedBtn.href);
    // getStartedBtn.addEventListener("click", (e) => {
    //   e.preventDefault();
    //   window.location.href = getStartedBtn.href;
    // });
    mainLog.innerHTML = "LOG OUT";
    mainLog.addEventListener("click", logOutBtnPressed);
  } else {
    console.log("No user is signed in.");
    mainLog.href = "login.html";
    getStartedBtn.href = "login.html";
  }
  //   mainView.classList.remove("loading");
});

const logOutBtnPressed = async () => {
  try {
    await signOut(auth);
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
};

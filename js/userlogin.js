// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8-gs42UP39ovLjtfQRUR7GI2PLuskFq4",
  authDomain: "my-first-firebase-projec-1bd5f.firebaseapp.com",
  projectId: "my-first-firebase-projec-1bd5f",
  storageBucket: "my-first-firebase-projec-1bd5f.firebasestorage.app",
  messagingSenderId: "848530380932",
  appId: "1:848530380932:web:451f57523ec3e94b920ad1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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

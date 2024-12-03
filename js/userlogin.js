import app from "/iphowinProject/js/firebase.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore();

const getStartedBtn = document.getElementById("getStartedBtn");
const mainLog = document.getElementById("mainLog");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User is signed in: ", user);

    getStartedBtn.href = "index2.html";
    console.log("getStartedBtn:", getStartedBtn);
    console.log("Href updated to: ", getStartedBtn.href);

    mainLog.innerHTML = "LOG OUT";
    mainLog.addEventListener("click", logOutBtnPressed);

    // NEW
    const docRef = doc(db, "users", user.uid);
    console.log("here");
    try {
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
    } catch (error) {
      console.log(error.code);
    }
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

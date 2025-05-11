import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js';
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-messaging.js";

const firebaseConfig = {
    apiKey: "AIzaSyB9utGKsSRxTblN5IJgq9u8gzNPyFtNTKI",
    authDomain: "showdown-8c6f2.firebaseapp.com",
    projectId: "showdown-8c6f2",
    storageBucket: "showdown-8c6f2.firebasestorage.app",
    messagingSenderId: "346675153216",
    appId: "1:346675153216:web:2a6f91d3417f4ed0ce12a5",
    measurementId: "G-5Z4WWN48FQ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const messaging = getMessaging();


const container = document.getElementById("container");
const register_btn = document.getElementById("register");
const login_btn = document.getElementById("login");
const sign_up_btn = document.getElementById("sign-up-btn");
const sign_in_btn = document.getElementById("sign-in-btn");

register_btn.addEventListener('click', () => {
    container.classList.add("active");
})

login_btn.addEventListener('click', () => {
    container.classList.remove("active");
})

sign_up_btn.addEventListener("click", (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("resistration-email").value;
    let password = document.getElementById("resistration-pass").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Creating...");
            login_btn.click();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error);
        });
})

sign_in_btn.addEventListener("click", (e) => {
    e.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-pass").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Login...");
            window.location.href = "home.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error);
        });
})

import { auth } from "../../js/firebase.js";

import {
signInWithEmailAndPassword,
setPersistence,
browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const ADMIN_EMAIL = "gamingadityaff4@gmail.com";

const form = document.getElementById("loginForm");
const error = document.getElementById("error");

form.addEventListener("submit", async (e) => {

e.preventDefault();

error.innerHTML = "";

const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;

if(email !== ADMIN_EMAIL){

error.innerHTML = "Only Admin can login.";

return;

}

try{

await setPersistence(auth,browserLocalPersistence);

await signInWithEmailAndPassword(auth,email,password);

window.location.href="dashboard.html";

}catch(err){

error.innerHTML=err.message;

}

});

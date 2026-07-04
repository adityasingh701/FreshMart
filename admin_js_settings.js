import { db } from "../../js/firebase.js";


import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";


/* =========================
ELEMENTS
========================= */


const form = document.getElementById("settingsForm");


/* =========================
LOAD SETTINGS
========================= */


async function loadSettings() {


const snap = await getDoc(doc(db, "settings", "store"));


if (snap.exists()) {


const data = snap.data();


document.getElementById("storeName").value = data.storeName || "";
document.getElementById("phone").value = data.phone || "";
document.getElementById("whatsapp").value = data.whatsapp || "";
document.getElementById("address").value = data.address || "";
document.getElementById("email").value = data.email || "";
document.getElementById("map").value = data.map || "";


}


}


/* =========================
SAVE SETTINGS
========================= */


form.addEventListener("submit", async (e) => {


e.preventDefault();


await setDoc(doc(db, "settings", "store"), {


storeName: document.getElementById("storeName").value,
phone: document.getElementById("phone").value,
whatsapp: document.getElementById("whatsapp").value,
address: document.getElementById("address").value,
email: document.getElementById("email").value,
map: document.getElementById("map").value


});


alert("Settings Saved Successfully ✅");


});


/* =========================
INIT
========================= */


loadSettings();

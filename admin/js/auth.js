import { auth } from "../../js/firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const ADMIN_EMAIL = "gamingadityaff4@gmail.com";

// Login Check

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    if (user.email !== ADMIN_EMAIL) {

        signOut(auth);

        window.location.href = "login.html";

        return;

    }

});

// Logout Function

window.logout = async function () {

    try {

        await signOut(auth);

        window.location.href = "login.html";

    } catch (e) {

        alert("Logout Failed");

    }

};

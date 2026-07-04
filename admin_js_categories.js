import { db, storage } from "../../js/firebase.js";


import {
collection,
addDoc,
onSnapshot,
doc,
deleteDoc,
updateDoc,
getDoc,
query,
orderBy,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";


import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";


/* =========================
ELEMENTS
========================= */


const modal = document.getElementById("catModal");
const openBtn = document.getElementById("openCatModal");
const form = document.getElementById("catForm");
const table = document.getElementById("categoryTable");


const catId = document.getElementById("catId");


/* =========================
MODAL OPEN
========================= */


openBtn.onclick = () => {
form.reset();
catId.value = "";
modal.style.display = "flex";
};


modal.onclick = (e) => {
if (e.target === modal) {
modal.style.display = "none";
}
};


/* =========================
LOAD CATEGORIES
========================= */


const q = query(collection(db, "categories"), orderBy("createdAt", "desc"));


onSnapshot(q, (snap) => {


table.innerHTML = "";


snap.forEach((docSnap) => {


const c = docSnap.data();


table.innerHTML += `
<tr>


<td>
<img src="${c.image}" width="50" height="50" style="border-radius:8px;">
</td>


<td>${c.name}</td>


<td>


<button class="editCat" data-id="${docSnap.id}">Edit</button>
<button class="delCat" data-id="${docSnap.id}">Delete</button>


</td>


</tr>
`;


});


});


/* =========================
ADD / UPDATE CATEGORY
========================= */


form.addEventListener("submit", async (e) => {


e.preventDefault();


const id = catId.value;
const name = document.getElementById("catName").value;
const file = document.getElementById("catImage").files[0];


let imageUrl = "";


if (file) {


const imgRef = ref(storage, `categories/${Date.now()}-${file.name}`);


await uploadBytes(imgRef, file);


imageUrl = await getDownloadURL(imgRef);


}


/* ADD */


if (!id) {


await addDoc(collection(db, "categories"), {


name,
image: imageUrl,
createdAt: serverTimestamp()


});


/* UPDATE */


} else {


const data = { name };


if (imageUrl) data.image = imageUrl;


await updateDoc(doc(db, "categories", id), data);


}


modal.style.display = "none";
form.reset();


});


/* =========================
EDIT
========================= */


document.addEventListener("click", async (e) => {


if (e.target.classList.contains("editCat")) {


const id = e.target.dataset.id;


const snap = await getDoc(doc(db, "categories", id));


const data = snap.data();


catId.value = id;
document.getElementById("catName").value = data.name;


modal.style.display = "flex";


}


});


/* =========================
DELETE
========================= */


document.addEventListener("click", async (e) => {


if (e.target.classList.contains("delCat")) {


const id = e.target.dataset.id;


if (confirm("Delete category?")) {


await deleteDoc(doc(db, "categories", id));


}


}


});

import { db, storage } from "../../js/firebase.js";


import {
collection,
addDoc,
onSnapshot,
doc,
deleteDoc,
updateDoc,
query,
orderBy,
getDoc,
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


const modal = document.getElementById("productModal");
const openModalBtn = document.getElementById("openModal");
const form = document.getElementById("productForm");
const table = document.getElementById("productTable");


const productIdInput = document.getElementById("productId");


/* =========================
OPEN / CLOSE MODAL
========================= */


openModalBtn.onclick = () => {
form.reset();
productIdInput.value = "";
modal.style.display = "flex";
};


modal.onclick = (e) => {
if (e.target === modal) {
modal.style.display = "none";
}
};


/* =========================
LOAD PRODUCTS
========================= */


const q = query(collection(db, "products"), orderBy("createdAt", "desc"));


onSnapshot(q, (snapshot) => {


table.innerHTML = "";


snapshot.forEach((docSnap) => {


const p = docSnap.data();


table.innerHTML += `
<tr>


<td>
<img src="${p.image}" />
</td>


<td>${p.name}</td>


<td>${p.category}</td>


<td>₹${p.price}</td>


<td>${p.stock}</td>


<td>


<button class="action-btn edit-btn" data-id="${docSnap.id}">
Edit
</button>


<button class="action-btn delete-btn" data-id="${docSnap.id}">
Delete
</button>


</td>


</tr>
`;


});


});


/* =========================
ADD / UPDATE PRODUCT
========================= */


form.addEventListener("submit", async (e) => {


e.preventDefault();


const id = productIdInput.value;


const name = document.getElementById("name").value;
const category = document.getElementById("category").value;
const price = document.getElementById("price").value;
const stock = document.getElementById("stock").value;
const file = document.getElementById("image").files[0];


let imageUrl = "";


try {


/* IMAGE UPLOAD */


if (file) {


const imgRef = ref(storage, `products/${Date.now()}-${file.name}`);


await uploadBytes(imgRef, file);


imageUrl = await getDownloadURL(imgRef);


}


/* ADD NEW */


if (!id) {


await addDoc(collection(db, "products"), {


name,
category,
price,
stock,
image: imageUrl,
createdAt: serverTimestamp()


});


/* UPDATE */


} else {


const updateData = {


name,
category,
price,
stock
};


if (imageUrl) {
updateData.image = imageUrl;
}


await updateDoc(doc(db, "products", id), updateData);


}


modal.style.display = "none";


form.reset();


} catch (error) {


console.log(error);


alert("Error: " + error.message);


}


});


/* =========================
EDIT PRODUCT
========================= */


document.addEventListener("click", async (e) => {


if (e.target.classList.contains("edit-btn")) {


const id = e.target.dataset.id;


const snap = await getDoc(doc(db, "products", id));


const data = snap.data();


productIdInput.value = id;


document.getElementById("name").value = data.name;
document.getElementById("category").value = data.category;
document.getElementById("price").value = data.price;
document.getElementById("stock").value = data.stock;


modal.style.display = "flex";


}


});


/* =========================
DELETE PRODUCT
========================= */


document.addEventListener("click", async (e) => {


if (e.target.classList.contains("delete-btn")) {


const id = e.target.dataset.id;


if (confirm("Delete this product?")) {


await deleteDoc(doc(db, "products", id));


}


}


});

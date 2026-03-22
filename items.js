// src/js/items.js
import { db, auth } from "./firebase-config.js";
import {
  collection, addDoc, getDocs, doc,
  updateDoc, deleteDoc, query, where, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── ADD ITEM ──────────────────────────────────────────────
export async function addItem(name, description, category, imageUrl = "") {
  const user = auth.currentUser;
  return await addDoc(collection(db, "items"), {
    name,
    description,
    category,
    imageUrl,
    status: "available",       // "available" | "borrowed"
    ownerID: user.uid,
    ownerName: user.displayName,
    createdAt: serverTimestamp()
  });
}

// ── GET ALL AVAILABLE ITEMS ───────────────────────────────
export async function getAvailableItems() {
  const q = query(collection(db, "items"), where("status", "==", "available"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── GET MY ITEMS ──────────────────────────────────────────
export async function getMyItems() {
  const user = auth.currentUser;
  const q = query(collection(db, "items"), where("ownerID", "==", user.uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── UPDATE ITEM STATUS ────────────────────────────────────
export async function updateItemStatus(itemId, status) {
  await updateDoc(doc(db, "items", itemId), { status });
}

// ── DELETE ITEM ───────────────────────────────────────────
export async function deleteItem(itemId) {
  await deleteDoc(doc(db, "items", itemId));
}
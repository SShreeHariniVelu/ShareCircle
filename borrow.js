// src/js/borrow.js
import { db, auth } from "./firebase-config.js";
import { updateItemStatus } from "./items.js";
import {
  collection, addDoc, getDocs, doc,
  updateDoc, query, where, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── SEND BORROW REQUEST ───────────────────────────────────
export async function sendBorrowRequest(itemId, itemName, ownerID) {
  const user = auth.currentUser;
  return await addDoc(collection(db, "borrowRequests"), {
    itemId,
    itemName,
    ownerID,
    borrowerID: user.uid,
    borrowerName: user.displayName,
    requestStatus: "pending",  // "pending" | "approved" | "rejected" | "returned"
    createdAt: serverTimestamp()
  });
}

// ── GET REQUESTS FOR MY ITEMS (owner view) ────────────────
export async function getIncomingRequests() {
  const user = auth.currentUser;
  const q = query(collection(db, "borrowRequests"), where("ownerID", "==", user.uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── GET MY BORROW REQUESTS (borrower view) ────────────────
export async function getMyRequests() {
  const user = auth.currentUser;
  const q = query(collection(db, "borrowRequests"), where("borrowerID", "==", user.uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── APPROVE REQUEST ───────────────────────────────────────
export async function approveRequest(requestId, itemId) {
  await updateDoc(doc(db, "borrowRequests", requestId), { requestStatus: "approved" });
  await updateItemStatus(itemId, "borrowed");
}

// ── REJECT REQUEST ────────────────────────────────────────
export async function rejectRequest(requestId) {
  await updateDoc(doc(db, "borrowRequests", requestId), { requestStatus: "rejected" });
}

// ── CONFIRM RETURN ────────────────────────────────────────
export async function confirmReturn(requestId, itemId) {
  await updateDoc(doc(db, "borrowRequests", requestId), { requestStatus: "returned" });
  await updateItemStatus(itemId, "available");
}
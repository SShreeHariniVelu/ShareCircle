// models/borrowModel.js

const { db } = require("../config/firebase");

const BorrowModel = {

  // ── CREATE BORROW REQUEST ────────────────────────────────
  async createRequest(data) {
    const request = {
      itemId:        data.itemId,
      itemName:      data.itemName,
      ownerID:       data.ownerID,
      borrowerID:    data.borrowerID,
      borrowerName:  data.borrowerName,
      requestStatus: "pending",
      createdAt:     new Date().toISOString(),
    };
    const docRef = await db.collection("borrowRequests").add(request);
    return { id: docRef.id, ...request };
  },

  // ── GET REQUEST BY ID ────────────────────────────────────
  async getRequestById(id) {
    const doc = await db.collection("borrowRequests").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  // ── GET INCOMING REQUESTS (owner) ────────────────────────
  async getIncomingRequests(ownerID) {
    const snapshot = await db.collection("borrowRequests")
      .where("ownerID", "==", ownerID)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // ── GET MY REQUESTS (borrower) ───────────────────────────
  async getMyRequests(borrowerID) {
    const snapshot = await db.collection("borrowRequests")
      .where("borrowerID", "==", borrowerID)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // ── GET PENDING REQUESTS FOR OWNER ──────────────────────
  async getPendingRequests(ownerID) {
    const snapshot = await db.collection("borrowRequests")
      .where("ownerID", "==", ownerID)
      .where("requestStatus", "==", "pending")
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // ── UPDATE REQUEST STATUS ────────────────────────────────
  async updateStatus(id, status) {
    await db.collection("borrowRequests").doc(id).update({
      requestStatus: status,
      updatedAt:     new Date().toISOString(),
    });
    return { id, requestStatus: status };
  },

  // ── DELETE REQUEST ───────────────────────────────────────
  async deleteRequest(id) {
    await db.collection("borrowRequests").doc(id).delete();
    return { id };
  },
};

module.exports = BorrowModel;
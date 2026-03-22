const { db } = require("../config/firebase");

// ── SEND BORROW REQUEST ────────────────────────────────────
const sendBorrowRequest = async (req, res) => {
  try {
    const { itemId, itemName, ownerID, borrowerID, borrowerName } = req.body;

    if (!itemId || !ownerID || !borrowerID) {
      return res.status(400).json({ success: false, message: "itemId, ownerID and borrowerID are required" });
    }

    const newRequest = {
      itemId,
      itemName,
      ownerID,
      borrowerID,
      borrowerName,
      requestStatus: "pending",
      createdAt:     new Date().toISOString(),
    };

    const docRef = await db.collection("borrowRequests").add(newRequest);
    res.status(201).json({ success: true, message: "Borrow request sent!", data: { id: docRef.id, ...newRequest } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET INCOMING REQUESTS (owner) ──────────────────────────
const getIncomingRequests = async (req, res) => {
  try {
    const { ownerID } = req.params;
    const snapshot = await db.collection("borrowRequests")
      .where("ownerID", "==", ownerID)
      .get();

    const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET MY REQUESTS (borrower) ─────────────────────────────
const getMyRequests = async (req, res) => {
  try {
    const { borrowerID } = req.params;
    const snapshot = await db.collection("borrowRequests")
      .where("borrowerID", "==", borrowerID)
      .get();

    const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── APPROVE REQUEST ────────────────────────────────────────
const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId } = req.body;

    await db.collection("borrowRequests").doc(id).update({ requestStatus: "approved", updatedAt: new Date().toISOString() });
    await db.collection("items").doc(itemId).update({ status: "borrowed" });

    res.status(200).json({ success: true, message: "Request approved!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── REJECT REQUEST ─────────────────────────────────────────
const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("borrowRequests").doc(id).update({ requestStatus: "rejected", updatedAt: new Date().toISOString() });
    res.status(200).json({ success: true, message: "Request rejected." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── CONFIRM RETURN ─────────────────────────────────────────
const confirmReturn = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId } = req.body;

    await db.collection("borrowRequests").doc(id).update({ requestStatus: "returned", updatedAt: new Date().toISOString() });
    await db.collection("items").doc(itemId).update({ status: "available" });

    res.status(200).json({ success: true, message: "Item marked as returned!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendBorrowRequest, getIncomingRequests, getMyRequests, approveRequest, rejectRequest, confirmReturn };
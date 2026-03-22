const { db } = require("../config/firebase");

// ── GET ALL AVAILABLE ITEMS ────────────────────────────────
const getAvailableItems = async (req, res) => {
  try {
    const snapshot = await db.collection("items")
      .where("status", "==", "available")
      .get();

    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET SINGLE ITEM ────────────────────────────────────────
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const itemDoc = await db.collection("items").doc(id).get();

    if (!itemDoc.exists) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, data: { id: itemDoc.id, ...itemDoc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── GET ITEMS BY OWNER ─────────────────────────────────────
const getItemsByOwner = async (req, res) => {
  try {
    const { ownerID } = req.params;
    const snapshot = await db.collection("items")
      .where("ownerID", "==", ownerID)
      .get();

    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── ADD ITEM ───────────────────────────────────────────────
const addItem = async (req, res) => {
  try {
    const { name, description, category, imageUrl, ownerID, ownerName } = req.body;

    if (!name || !category || !ownerID) {
      return res.status(400).json({ success: false, message: "Name, category and ownerID are required" });
    }

    const newItem = {
      name,
      description: description || "",
      category,
      imageUrl:    imageUrl || "",
      status:      "available",
      ownerID,
      ownerName,
      createdAt:   new Date().toISOString(),
    };

    const docRef = await db.collection("items").add(newItem);
    res.status(201).json({ success: true, message: "Item added successfully", data: { id: docRef.id, ...newItem } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── UPDATE ITEM ────────────────────────────────────────────
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    await db.collection("items").doc(id).update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    res.status(200).json({ success: true, message: "Item updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE ITEM ────────────────────────────────────────────
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("items").doc(id).delete();
    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAvailableItems, getItemById, getItemsByOwner, addItem, updateItem, deleteItem };
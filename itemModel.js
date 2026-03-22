// models/itemModel.js

const { db } = require("../config/firebase");

const ItemModel = {

  // ── CREATE ITEM ──────────────────────────────────────────
  async createItem(data) {
    const item = {
      name:        data.name,
      description: data.description || "",
      category:    data.category,
      imageUrl:    data.imageUrl || "",
      status:      "available",
      ownerID:     data.ownerID,
      ownerName:   data.ownerName,
      createdAt:   new Date().toISOString(),
    };
    const docRef = await db.collection("items").add(item);
    return { id: docRef.id, ...item };
  },

  // ── GET ALL AVAILABLE ITEMS ──────────────────────────────
  async getAvailableItems() {
    const snapshot = await db.collection("items")
      .where("status", "==", "available")
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // ── GET ITEM BY ID ───────────────────────────────────────
  async getItemById(id) {
    const doc = await db.collection("items").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  // ── GET ITEMS BY OWNER ───────────────────────────────────
  async getItemsByOwner(ownerID) {
    const snapshot = await db.collection("items")
      .where("ownerID", "==", ownerID)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // ── GET ITEMS BY CATEGORY ────────────────────────────────
  async getItemsByCategory(category) {
    const snapshot = await db.collection("items")
      .where("category", "==", category)
      .where("status", "==", "available")
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // ── UPDATE ITEM ──────────────────────────────────────────
  async updateItem(id, updates) {
    await db.collection("items").doc(id).update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return { id, ...updates };
  },

  // ── UPDATE ITEM STATUS ───────────────────────────────────
  async updateStatus(id, status) {
    await db.collection("items").doc(id).update({
      status,
      updatedAt: new Date().toISOString(),
    });
    return { id, status };
  },

  // ── DELETE ITEM ──────────────────────────────────────────
  async deleteItem(id) {
    await db.collection("items").doc(id).delete();
    return { id };
  },
};

module.exports = ItemModel;
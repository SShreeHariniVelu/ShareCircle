// models/userModel.js

const { db } = require("../config/firebase");

const UserModel = {

  // ── CREATE USER ──────────────────────────────────────────
  async createUser(uid, data) {
    const user = {
      name:      data.name,
      email:     data.email,
      createdAt: new Date().toISOString(),
    };
    await db.collection("users").doc(uid).set(user);
    return { id: uid, ...user };
  },

  // ── GET USER BY ID ───────────────────────────────────────
  async getUserById(uid) {
    const doc = await db.collection("users").doc(uid).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  // ── GET ALL USERS ────────────────────────────────────────
  async getAllUsers() {
    const snapshot = await db.collection("users").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // ── UPDATE USER ──────────────────────────────────────────
  async updateUser(uid, updates) {
    await db.collection("users").doc(uid).update({
      ...updates,
      updatedAt: new Date().toISOString(),
    });
    return { id: uid, ...updates };
  },

  // ── DELETE USER ──────────────────────────────────────────
  async deleteUser(uid) {
    await db.collection("users").doc(uid).delete();
    return { id: uid };
  },
};

module.exports = UserModel;
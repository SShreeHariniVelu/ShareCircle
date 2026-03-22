const express = require("express");
const router  = express.Router();
const { getAvailableItems, getItemById, getItemsByOwner, addItem, updateItem, deleteItem } = require("../controllers/itemController");

router.get("/",                    getAvailableItems);
router.get("/:id",                 getItemById);
router.get("/owner/:ownerID",      getItemsByOwner);
router.post("/",                   addItem);
router.put("/:id",                 updateItem);
router.delete("/:id",              deleteItem);

module.exports = router;
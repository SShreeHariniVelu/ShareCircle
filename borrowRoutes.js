const express = require("express");
const router  = express.Router();
const { sendBorrowRequest, getIncomingRequests, getMyRequests, approveRequest, rejectRequest, confirmReturn } = require("../controllers/borrowController");

router.post("/",                          sendBorrowRequest);
router.get("/incoming/:ownerID",          getIncomingRequests);
router.get("/my/:borrowerID",             getMyRequests);
router.put("/approve/:id",                approveRequest);
router.put("/reject/:id",                 rejectRequest);
router.put("/return/:id",                 confirmReturn);

module.exports = router;
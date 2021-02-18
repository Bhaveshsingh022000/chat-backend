const router = require('express').Router();
const chatContoller = require("../Controller/chatController");

router.get('/',chatContoller.getHomePage);
router.post('/chat', chatContoller.postMessage);

module.exports = router;
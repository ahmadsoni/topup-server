express = require('express');
const multer = require('multer');
const os = require('os');

const router = express.Router();
const { signUp, signIn } = require('./controller');

router.post('/signup', multer({ dest: os.tmpdir() }).single('image'), signUp);
router.post('/signin', signIn);

module.exports = router;

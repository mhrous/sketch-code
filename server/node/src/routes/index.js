const { Router } = require('express');

const {
  generationHtml,
  getPage,
  downloadPage,
  upload,
  pythonScript
} = require('../middlewares');

const router = Router();

router.post('/html.generate', upload.single('avatar'), pythonScript, generationHtml);
router.get('/html.get/:name', getPage);
router.get('/html.download/:name', downloadPage);

module.exports = router;

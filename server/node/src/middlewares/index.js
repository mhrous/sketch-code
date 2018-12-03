const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '../uploads/');
  },
  filename: function(req, file, cb) {
    let mimetype = file.mimetype.split('/');
    req.filee = file.size;
    cb(null, Date.now() + '.' + mimetype[1]);
  }
});
const upload = multer({ storage: storage });

const { exec } = require('child_process');

const runPython = name =>
  ` python convert_single_image.py --png_path ../../node/uploads/${name} --output_folder ../../node/html/ --model_json_file ../bin/model_json.json --model_weights_file ../bin/weights.h5`;

const pythonScript = async (req, res, next) => {
  try {
    exec(
      runPython(req.file.filename),
      {
        cwd: path.join(__dirname, '..', '..', '..', '/python/src')
      },
      () => {
        next();
      }
    );
  } catch (e) {
    next(e);
  }
};
const generationHtml = async (req, res, next) => {
  try {
    res.send({ fileName: req.file.filename });
    return next();
  } catch (e) {
    next(e);
  }
};

const getPage = async (req, res, next) => {
  try {
    const { name } = req.params;
    res.sendFile(path.join(__dirname, '..', '..', `/html/${name}`));
  } catch (e) {
    next(e);
  }
};
const downloadPage = async (req, res, next) => {
  try {
    const { name } = req.params;
    const file = path.join(__dirname, '..', '..', `/html/${name}`);
    return res.download(file);
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  generationHtml,
  getPage,
  downloadPage,
  upload,
  pythonScript
};

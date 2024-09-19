// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: err.message });
    } else if (err) {
      res.status(500).json({ message: err.message });
    } else {
      next();
    }
  };
  
  module.exports = errorHandler;
  
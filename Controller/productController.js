const Product = require('../Modal/Product.js');
const upload = require('../Middleware/upload.js');
const deleteFiles = require('../Middleware/deleteFiles.js');
exports.createProduct = async (req, res) => {
    upload.array('files', 10)(req, res, async (err) => { 
      if (err) {
        console.error(err);
        return res.status(400).json({ message: 'Error uploading files' });
      }
  
      const { name, description, price } = req.body;
  
      // Validate required fields
      if (!name) {
        return res.status(400).json({ message: 'Product name is required' });
      }
  
      // Get file paths for all uploaded files
      let imageUrls = [];
      if (req.files) {
        imageUrls = req.files.map(file => file.path);
      }
  
      const productData = {
        name,
        description,
        price,
        images: imageUrls, // Save the array of image URLs
      };
  
      try {
        const product = await Product.create(productData);
        res.status(201).json(product);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
    });
  };


// Assuming you're storing the image URL in your database, modify the Product model accordingly
// Add imageUrl field to your Product model if not already added.
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.update(req.body);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteProduct = async (req, res) => {
  try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Extract image URLs from the product and parse it as an array
      let imageUrls = [];
      if (product.images) {
          try {
              imageUrls = JSON.parse(product.images);
              if (!Array.isArray(imageUrls)) {
                  throw new TypeError('Images should be an array');
              }
          } catch (parseError) {
              console.error('Error parsing images:', parseError);
              return res.status(500).json({ message: 'Server Error: Invalid images format' });
          }
      }

      // Delete the images from the file system
      try {
          await deleteFiles(imageUrls);
      } catch (fileErr) {
          console.error('Error deleting files:', fileErr);
          return res.status(500).json({ message: 'Error deleting product images', errors: fileErr });
      }

      // Delete the product from the database
      await product.destroy();
      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
  }
};
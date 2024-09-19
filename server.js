const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./Routes/productRoutes');
const db = require("./db/database")
const userRoutes = require("./Routes/userRoutes");
const cors = require('cors');
const { register } = require('./Controller/userController');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/register', register);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.get('/server', (req, res)=>{
  res.send("My Server is Running")
})

db.sync()
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

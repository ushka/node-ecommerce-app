const express = require('express');

const router = express.Router();

// receive POST request to add an item to cart
router.post('/cart/products', (req, res) => {
  console.log(req.body.productId);

  res.send('Product added to cart.');
});

// receive GET request to show all items in cart

// receive POST request to delete an item from a cart 

module.exports = router;
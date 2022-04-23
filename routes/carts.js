const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartIndexTemplate = require('../views/carts/index');

const router = express.Router();

// receive POST request to add an item to cart
router.post('/cart/products', async(req, res) => {

  // Figure out the cart, make a new one or does one exist
  let cart;
  if(!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  // Either increment quantity for existing product or add new products to items array in Carts repository
  const existingItem = cart.items.find(item => item.id === req.body.productId);
  if(existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    items: cart.items
  });

  res.send('Product added to cart.');
});

// receive GET request to show all items in cart
router.get('/cart', async(req, res) => {
  if(!req.session.cartId) {
    return res.redirect('/');
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for(let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartIndexTemplate({ items: cart.items }));

});

// receive POST request to delete an item from a cart 
router.post('/cart/products/delete', async(req, res) => {
  const { itemId }  = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);

  const items = cart.items.filter(item => item.id !== itemId);
  await cartsRepo.update(req.session.cartId, { items });

  res.redirect('/cart');
});

module.exports = router;
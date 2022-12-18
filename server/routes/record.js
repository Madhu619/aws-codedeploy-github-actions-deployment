const express = require("express");

// projectRoute is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /product.
const projectRoute = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

/**
 * Razorpay code changes Node.js
 */
const Razorpay = require('razorpay')

//Initiate razorpay sdk

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_LIVE,
  key_secret: process.env.RAZORPAY_SECRET_LIVE,
})

projectRoute.route('/create/orderId').post(async function (req, response) {
  let db_connect = dbo.getDb("divine_collections");
 
  let options = {
    amount: req.body.amount.toString(),
    userId: req.params.id,
    currency: "INR",
    receipt: `${req.params.id}_Order_Receipt`
  }
  instance.orders.create(options, async function(error, order) {
    if (error) {
      response.json(error)
    } else {
     // await db_connect.collection("order_creation").insertOne(order);
      response.json(order)
    }
  })
});

projectRoute.route('/payment/success').post(async function (req, response) {
  let db_connect = dbo.getDb("divine_collections");
 
  let options = {
    paymentId: req.body.orderCreationId,
    userId: req.params.id,
    order_id: req.body.razorpayOrderId,
    signature: req.body.razorpaySignature,
    razorpayPaymentId: req.body.razorpayPaymentId
  }
  
  db_connect.collection("payments").insertOne(options, function (err, res) {
    if (err) throw err;
    response.json({success: true, orderId: options.order_id, paymentId: options.paymentId, message: "Your order was successful. We will update you once we schedule your delivery"})
  })
});


/**
 * Razorpay code ends
 */

// This section will help you create a new user.
projectRoute.route("/user/add").post(async function (req, response) {
  let db_connect = dbo.getDb("divine_collections");
  let myobj = {
    "userName": req.body.userName,
    "fName": req.body.fName,
    "lName": req.body.lName,
    "email": req.body.email,
    "phone": req.body.phone,
    "role": 'user'
  };
  await db_connect.collection("users").insertOne(myobj);
  db_connect.collection("login").insertOne({'userName': req.body.userName, "password": req.body.password}, function (err, res) {
    if (err) throw err;
    response.json(res)
  })
});

// This section will help you login and user details
projectRoute.route("/login").post(async function (req, response) {
  let db_connect = dbo.getDb("divine_collections");
  let myobj = {
    "userName": req.body.userName,
    "password": req.body.password
  };
  
  const users = db_connect.collection("login");
  const login = await users.find(myobj);
  if (await login.count() !== 0) {
    db_connect.collection("users").findOne({'userName': req.body.userName}, function (err, res) {
      if (err) throw err;
      response.json(res)
    })
  } else {
    response.json({error: "Invalid username & password"})
  }
});

// This section will help you get a list of all the products.
projectRoute.route("/products").get(function (req, res) {
  let db_connect = dbo.getDb("divine_collections");
  db_connect
    .collection("categories")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

//Get single cart information for a user id
projectRoute.route("/cart/:id").get(async function (req, res) {
  let db_connect = dbo.getDb("divine_collections");
  let myquery = { userId: req.params.id.toString() };
  
  await db_connect.collection("cart").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});


// This section will help you get a product list in cart by user id
projectRoute.route("/cart/products/:id").get(async function (req, res) {
  let db_connect = dbo.getDb("divine_collections");
  let myquery = { userId: req.params.id.toString() };
  
  const cartItems = await db_connect.collection("cart").findOne(myquery);

  if (await  cartItems && cartItems.items.length !== 0) {
    db_connect
    .collection("products")
    .find({"id": {$in: cartItems.items}})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    })
  } else {
    res.json({})
  }
});

// This section will help you get a single product by id
projectRoute.route("/category/:id&:name").get(function (req, res) {
  let db_connect = dbo.getDb("divine_collections");
  let myquery = { category: req.params.id.toString() };
  db_connect
      .collection("products")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you get a single product by id
projectRoute.route("/category/product/:id").get(function (req, res) {
  let db_connect = dbo.getDb("divine_collections");
  let myquery = { id: req.params.id.toString() };
  db_connect
      .collection("products")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});


// This section will help you add a new product to cart
projectRoute.route("/product/addToCart").post(async function (req, response) {
  let db_connect = dbo.getDb("divine_collections");
  const res = await db_connect.collection("cart")
  .updateOne(
    { userId: req.body.userId },
    { $addToSet: { items: req.body.itemId }}
  );
  if (await res.result.ok) {
    db_connect.collection('cart')
    .findOne({userId: req.body.userId},  function (err, res) {
      if (err) throw err;
      response.json(res)
    });
  }
});

// This section will help you remove a product from cart
projectRoute.route("/product/removeFromCart").post(async function (req, response) {
  let db_connect = dbo.getDb("divine_collections");
  const res = await db_connect.collection("cart")
  .updateOne(
    { userId: req.body.userId },
    { $pull: { items: req.body.itemId }}
  );
  if (await res.result.ok) {
    db_connect.collection('cart')
    .findOne({userId: req.body.userId},  function (err, res) {
      if (err) throw err;
      response.json(res)
    });
  }
});

// This section will help you create a new product.
projectRoute.route("/product/add").post(function (req, response) {
  let db_connect = dbo.getDb("divine_collections");
  let myobj = {
    "name": req.body.name,
    "position": req.body.position,
    "level": req.body.level,
  };
  db_connect.collection("products").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a product by id.
projectRoute.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("divine_collections");
  let myquery = { "_id": req.params.id.toString()};
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connect
    .collection("products")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// This section will help you delete a product
projectRoute.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb("divine_collections");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("products").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = projectRoute;






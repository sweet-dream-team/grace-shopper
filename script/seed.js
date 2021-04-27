"use strict";

const {
  db,
  models: { Product, User, Order, OrderHistory },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Dreams
  const products = await Promise.all([
    Product.create({
      productName: "Jellybean Dream",
      unitPrice: 2399,
      description:
        "Are you a big fan of jelly? Or beans? Well have we got a dream for people who actually like jellybeans.",
      type: "SWEET",
      duration: 7,
      imageURL: "/jellybeandream.png",
      stockQuantity: 5,
    }),
    Product.create({
      productName: "The Sweetest Dream",
      unitPrice: 4599,
      description:
        "This dream is so sweet you should bring your toothbrush to bed! Think of all your favorite sweets: they. are. there.",
      type: "SWEET",
      duration: 5,
      imageURL: "/thesweetestdream.png",
      stockQuantity: 5,
    }),
    Product.create({
      productName: "A Dream at the Beach",
      unitPrice: 2099,
      description:
        "One of the most relaxing places to be: now without sand! Enjoy a relaxing day at the beach... at night! While you sleep!",
      type: "SWEET",
      duration: 3,
      imageURL: "/adreamatthebeach.png",
      stockQuantity: 5,
    }),
    Product.create({
      productName: "The Circus Dream",
      unitPrice: 3099,
      description:
        "Be the ringmaster of your own dream! Dance with the elephants and fly through the air on trapeze like the star you are!",
      type: "SWEET",
      duration: 9,
      imageURL: "/thecircusdream.png",
      stockQuantity: 5,
    }),
    Product.create({
      productName: "Dreamillionare",
      unitPrice: 1099,
      description:
        "Time to spend them dolla dolla bills in your dreams! Own the most luxurious car or boat or plane or whatever rich people are riding in these days! Buy a 10,000 dollar sandwich just because you can!",
      type: "SWEET",
      duration: 6,
      imageURL: "/dreamillionaire.png",
      stockQuantity: 5,
    }),
    Product.create({
      productName: "Once Upon A Dream",
      unitPrice: 2899,
      description:
        "Once upon a time there was a magical fairy who ran the kingdom. It was you! Battle dragons and save the prince in this epic dream!",
      type: "SWEET",
      duration: 3,
      imageURL: "/onceuponadream.png",
      stockQuantity: 5,
    }),
    Product.create({
      productName: "School in Underwear Nightmare",
      unitPrice: 1499,
      description:
        "Oh god! You showed up to class wearing nothing but your skivvies. Get ready to deal with this all night.",
      type: "NIGHTMARE",
      duration: 8,
      imageURL: "/schoolinundies.png",
      stockQuantity: 10,
    }),
    Product.create({
      productName: "Monsters Nightmare",
      unitPrice: 1699,
      description:
        "Dream about being in your very own horror movie? Heres your chance!",
      type: "NIGHTMARE",
      duration: 5,
      imageURL: "/monsters.png",
      stockQuantity: 10,
    }),
    Product.create({
      productName: "Fire Nightmare",
      unitPrice: 1799,
      description: "AHHHHHHHHHHHHHH EVERYTHINGS ON FIRE SWEET MARY HELP US ALL",
      type: "NIGHTMARE",
      duration: 3,
      imageURL: "/firenightmare.png",
      stockQuantity: 10,
    }),
    Product.create({
      productName: "Teeth Falling Out Nightmare",
      unitPrice: 2099,
      description:
        "We all have it. Nobody wants it. Gift someone you really dont like this disconcerting nightmare. Or have it yourself, you freak.",
      type: "NIGHTMARE",
      duration: 9,
      imageURL: "/teethfallingout.png",
      stockQuantity: 10,
    }),
  ]);

  //Creating Users
  const users = await Promise.all([
    User.create({
      email: "michaelscott@aol.com",
      password: "thatswhatshesaid911",
      isAdmin: true,
    }),

    User.create({
      email: "dwightschrute@hotmail.com",
      password: "beets123",
      isAdmin: false,
    }),
    User.create({
      email: "jimhalpert@gmail.com",
      password: "ilovepam143",
      isAdmin: false,
    }),
    User.create({
      email: "angelamartin@yahoo.com",
      password: "catscatscats",
      isAdmin: false,
    }),
  ]);

  //Creating Orders

  const orders = await Promise.all([
    Order.create({
      status: "OPEN",
      price: 2099,
    }),
    Order.create({
      status: "CONFIRMED",
      price: 4599,
    }),
    Order.create({
      status: "CONFIRMED",
      price: 1099,
    }),
    Order.create({
      status: "CONFIRMED",
      price: 1799,
    }),
  ]);

  // Creating OrderHistory

  const orderHistory = await Promise.all([
    OrderHistory.create({
      productId: 1,
      orderId: 1,
      quantity: 3,
      price: 2399,
      dateSubmitted: new Date(),
    }),
    OrderHistory.create({
      productId: 2,
      orderId: 1,
      quantity: 1,
      price: 4599,
      dateSubmitted: new Date(),
    }),
    OrderHistory.create({
      productId: 3,
      orderId: 1,
      quantity: 2,
      price: 2099,
      dateSubmitted: new Date(),
    }),
    OrderHistory.create({
      productId: 1,
      orderId: 2,
      quantity: 1,
      price: 2399,
      dateSubmitted: new Date(),
    }),
    OrderHistory.create({
      productId: 2,
      orderId: 2,
      quantity: 1,
      price: 4599,
      dateSubmitted: new Date(),
    }),
    OrderHistory.create({
      productId: 5,
      orderId: 2,
      quantity: 1,
      price: 1699,
      dateSubmitted: new Date(),
    }),
    OrderHistory.create({
      productId: 10,
      orderId: 3,
      quantity: 1,
      price: 1799,
      dateSubmitted: new Date(),
    }),
    OrderHistory.create({
      productId: 10,
      orderId: 4,
      quantity: 1,
      price: 4599,
      dateSubmitted: new Date(),
    }),
    OrderHistory.create({
      productId: 6,
      orderId: 4,
      quantity: 1,
      price: 1099,
      dateSubmitted: new Date(),
    }),
  ]);
  //Association
  await users[1].addOrder([orders[0], orders[1]]);

  console.log(
    `seeded ${products.length} dreams & ${users.length} users & ${orders.length} orders`
  );
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

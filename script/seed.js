"use strict";

<<<<<<< HEAD
const {
  db,
  models: { User },
} = require("../server/db");
=======
const {db, models: {Product} } = require('../server/db')
>>>>>>> main

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

<<<<<<< HEAD
  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
=======
  // Creating Dreams
  const products = await Promise.all([
    Product.create({productName: 'Jellybean Dream', unitPrice: 2399, description: 'Are you a big fan of jelly? Or beans? Well have we got a dream for people who actually like jellybeans.', type: 'SWEET', duration: 7, imageURL: 'http://www.image.farm/images/2021/04/21/3eb9d2d0fa4d20f85dc7351a930cdbd9.png', stockQuantity: 5}),
    Product.create({productName: 'The Sweetest Dream', unitPrice: 4599, description: 'This dream is so sweet you should bring your toothbrush to bed! Think of all your favorite sweets: they. are. there.', type: 'SWEET', duration: 5, imageURL: 'http://www.image.farm/images/2021/04/21/214c5930e2e3e1758cdd6ad674d73d33.png', stockQuantity: 5}),
    Product.create({productName: 'A Dream at the Beach', unitPrice: 2099, description: 'One of the most relaxing places to be: now without sand! Enjoy a relaxing day at the beach... at night! While you sleep!', type: 'SWEET', duration: 3, imageURL: 'http://www.image.farm/images/2021/04/21/46ff1252168da0d179c01f79f2dfe786.png', stockQuantity: 5}),
    Product.create({productName: 'The Circus Dream', unitPrice: 3099, description: 'Be the ringmaster of your own dream! Dance with the elephants and fly through the air on trapeze like the star you are!', type: 'SWEET', duration: 9, imageURL: 'http://www.image.farm/images/2021/04/21/8228073375a90f5bc2894ac1fc5237af.png', stockQuantity: 5}),
    Product.create({productName: 'Dreamillionare', unitPrice: 1099, description: 'Time to spend them dolla dolla bills in your dreams! Own the most luxurious car or boat or plane or whatever rich people are riding in these days! Buy a 10,000 dollar sandwich just because you can!', type: 'SWEET', duration: 6, imageURL: 'http://www.image.farm/images/2021/04/21/fc6b88750874396c545c0f75b7d48477.png', stockQuantity: 5}),
    Product.create({productName: 'Once Upon A Dream', unitPrice: 2899, description: 'Once upon a time there was a magical fairy who ran the kingdom. It was you! Battle dragons and save the prince in this epic dream!', type: 'SWEET', duration: 3, imageURL: 'http://www.image.farm/images/2021/04/21/16f3e27db0202da3cf6e36e1861d2ad5.png', stockQuantity: 5}),
    Product.create({  productName: 'School in Underwear Nightmare', unitPrice: 1499, description: 'Oh god! You showed up to class wearing nothing but your skivvies. Get ready to deal with this all night.' ,type: 'NIGHTMARE',duration: 8,imageURL: 'http://www.image.farm/images/2021/04/21/b272a5e72348a56cc0136eb16d2d9133.png',stockQuantity: 10}),
    Product.create({ productName: 'Monsters Nightmare', unitPrice: 1699,  description: 'Dream about being in your very own horror movie? Heres your chance!', type: 'NIGHTMARE', duration: 5, imageURL: 'http://www.image.farm/images/2021/04/21/22d29e4786b1eb36d93c7dbe226001f6.png', stockQuantity: 10}),
     Product.create({ productName: 'Fire Nightmare', unitPrice: 1799, description: 'AHHHHHHHHHHHHHH EVERYTHINGS ON FIRE SWEET MARY HELP US ALL', type: 'NIGHTMARE', duration: 3, imageURL: 'http://www.image.farm/images/2021/04/21/a2e45a67cab55fcbae6491f08323f2f4.png', stockQuantity: 10}),
    Product.create({ productName: 'Teeth Falling Out Nightmare', unitPrice: 2099, description: 'We all have it. Nobody wants it. Gift someone you really dont like this disconcerting nightmare. Or have it yourself, you freak.', type: 'NIGHTMARE', duration: 9, imageURL: 'http://www.image.farm/images/2021/04/21/c37fd4fb6b07254e76e971ea939a99a1.png', stockQuantity: 10 }),
    ])

  console.log(`seeded ${products.length} dreams`)
  console.log(`seeded successfully`)
>>>>>>> main
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
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

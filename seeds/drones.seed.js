// Iteration #1
require("../db");

// 2. REQUIRE THE MODEL
let DroneModel = require("../models/Drone.model");

// 3. INSERT DATA IN THE MODEL
const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];
DroneModel.insertMany(drones)
  .then(() => {
    console.log("Data inserted");
    mongoose.connection.close();
  })
  .catch(() => {
    console.log("error", err);
    mongoose.connection.close();
  });

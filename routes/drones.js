const express = require("express");
const router = express.Router();
const alert = require("alert");

let DroneModel = require("../models/Drone.model");

router.get("/", (req, res, next) => {
  res.render("drones/index.hbs");
});

router.get("/drones", (req, res, next) => {
  DroneModel.find()
    .then((drones) => {
      // console.log(drones);
      res.render("drones/list.hbs", { drones });
    })
    .catch(() => {
      next("List of drones not found");
    });
});

router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  console.log(req.body);
  DroneModel.create({ name, propellers, maxSpeed })
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      alert("Oops! Something went wrong. Please try again");
      res.render("./drones/create-form.hbs");
    });
});

router.get("/drones/:id", (req, res, next) => {
  let { id } = req.params;
  DroneModel.findById(id)
    .then((drone) => {
      // console.log(drones);
      res.render("drones/detail.hbs", { drone });
    })
    .catch(() => {
      next("Drone details not found");
    });
});
router.get("/drones/:id/edit", (req, res, next) => {
  let { id } = req.params;
  DroneModel.findById(id)
    .then((drone) => {
      // console.log(drones);
      res.render("drones/edit-form.hbs", { drone });
    })
    .catch(() => {
      next("Page not found");
    });
});

router.post("/drones/:id/edit", (req, res, next) => {
  let { name, propellers, maxSpeed } = req.body;
  let { id } = req.params;
  DroneModel.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => {
      res.redirect("/");
    })
    .catch(() => {
      next("Edit drone failed");
    });
});

router.get("/drones/:id/delete", (req, res, next) => {
  const { id } = req.params;
  DroneModel.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/drones");
    })
    .catch(() => {
      next("Drone delete failed");
    });
});

module.exports = router;

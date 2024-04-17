require("../controllers/collections.controller");
module.exports = (app) => {
  const collections = require("../controllers/collections.controller.js");

  const router = require("express").Router();

  // Create a new collections
  router.post("/", collections.create);

  // Retrieve all collections
  router.get("/", collections.findAll);

  // Retrieve all collected collections
  router.get("/collected", collections.findAllCollected);

  // Delete a record by title
  router.delete("/record", collections.deleteRecord);

  // Retrieve a single collections with id
  router.get("/:id", collections.findOne);

  // Update a collections with id
  router.put("/:id", collections.update);

  // Delete a collections with id
  router.delete("/:id", collections.delete);

  // Delete all collections
  router.delete("/", collections.deleteAll);

  app.use("/api/collections", router);
};

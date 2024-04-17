const db = require("../models");
const Collections = db.collections;

// Create and Save a new collections
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a collections
  const collections = new Collections({
    title: req.body.title,
    description: req.body.description,
    collected: req.body.collected ? req.body.collected : false
  });

  // Save collections in the database
  collections
    .save(collections)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the collections."
      });
    });
};

// Retrieve all collections from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Collections.find(condition)
    .then(data => {
      res.send(data.description);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving collections."
      });
    });
};

exports.findByTitle = (req, res) => {
  const title = req.query.title;
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Collections.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving collections."
      });
    });
};

// Find a single collections with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Collections.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found collections with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving collections with id=" + id });
    });
}

// Update a collections by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Collections.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update collections with id=${id}. Maybe collections was not found!`
        });
      } else res.send({ message: "collections was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating collections with id=" + id
      });
    });
};

// Delete a collections with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Collections.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete collections with id=${id}. Maybe collections was not found!`
        });
      } else {
        res.send({
          message: "collections was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete collections with id=" + id
      });
    });
};

// Delete all collections from the database.
exports.deleteAll = (req, res) => {
  Collections.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} collections were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all collections."
      });
    });
};

exports.deleteRecord = (req, res) => {
  const title = req.query.title;
  Collections.deleteMany({ title: title })
    .then(data => {
      res.send({
        message: `${data.deletedCount} collections were deleted successfully! ${
          title
        }`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all collections."
      });
    });
};

// Find all collected collections
exports.findAllCollected = (req, res) => {
  Collections.find({ collected: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving collections."
      });
    });
};

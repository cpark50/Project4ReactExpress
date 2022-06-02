const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product
  const product = {
    id: req.body.id,
    p_name: req.body.name,
    p_othername: req.body.othername,
    p_price: req.body.price,
    p_size: req.body.size,
    p_desc: req.body.desc,
    p_desc2: req.body.desc2,
    p_water: req.body.water,
    p_light: req.body.light,
    p_pet: req.body.pet ? req.body.findAllPet : false,
    imagename: req.body.imagename
  };

  // Save Product in the database
  Product.create(product)
    .then(data => {
      // fs.writeFileSync(
      //   __basedir + "/Users/crystalalice/Desktop/IN4MATX124/JustPlants/justplants/src/main/webapp/images" + image.name
      //   );
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const p_name = req.query.name;
  const filterPrice = req.query.price;
  const friendliness = req.query.friendliness;
  var condition;
  if(p_name)
    condition = {p_name : { [Op.like]: `%${p_name}%` } };
  if(filterPrice)
    condition = {p_price : { [Op.between] : [0, filterPrice] } };
  if(friendliness){
    if(friendliness=="friendly")
      condition = {p_pet: { [Op.eq]: 1 }};
    else
      condition = {p_pet: { [Op.eq]: 0 }};
  }
  Product.findAll({where : condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products."
      });
    });
};

// find all published Product
exports.findAllPublished = (req, res) => {
  Product.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};

// find all published Product
exports.findAllPet = (req, res) => {
  Product.findAll({ where: { p_pet: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};

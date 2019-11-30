const Quake = require("../models/quake-model");

createQuake = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a quake"
    });
  }

  const quake = new Quake(body);

  if (!quake) {
    return res.status(400).json({ success: false, error: err });
  }

  quake
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: quake._id,
        message: "Quake created!"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Quake not created!"
      });
    });
};

updateQuake = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  Quake.findOne({ _id: req.params.id }, (err, quake) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Quake not found!"
      });
    }
    quake.name = body.name;
    quake.properties = body.properties;
    quake.coordinates = body.coordinates;
    quake
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: quake._id,
          message: "Quake updated!"
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: "Quake not updated!"
        });
      });
  });
};

deleteQuake = async (req, res) => {
  await Quake.findOneAndDelete({ _id: req.params.id }, (err, quake) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!quake) {
      return res.status(404).json({ success: false, error: `Quake not found` });
    }

    return res.status(200).json({ success: true, data: quake });
  }).catch(err => console.log(err));
};

getQuakeById = async (req, res) => {
  await Quake.findOne({ _id: req.params.id }, (err, quake) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!quake) {
      return res.status(404).json({ success: false, error: `Quake not found` });
    }
    return res.status(200).json({ success: true, data: quake });
  }).catch(err => console.log(err));
};

getQuakes = async (req, res) => {
  await Quake.find({}, (err, quakes) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!quakes.length) {
      return res.status(404).json({ success: false, error: `Quake not found` });
    }
    return res.status(200).json({ success: true, data: quakes });
  }).catch(err => console.log(err));
};

module.exports = {
  createQuake,
  updateQuake,
  deleteQuake,
  getQuakes,
  getQuakeById
};

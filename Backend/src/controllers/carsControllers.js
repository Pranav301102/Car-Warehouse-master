const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const Car = require('../models/carModel');

const isNotCar = (car) => {
  if (!car) {
    const err = new Error('Car not found');
    err.statusCode = 404;
    return err;
  }
  return null;
};

exports.getCars = async (req, res, next) => {
  const cars = await Car.findAll();

  res.status(200).json({
    status: 'success',
    length: cars.length,
    cars,
  });
};

exports.getCar = asyncHandler(async (req, res, next) => {
  const car = await Car.findOne({
    where: {
      id: req.params.id,
    },
  });

  const error = isNotCar(car);
  if (error) {
    return res.status(error.statusCode).json({
      status: 'error',
      msg: error.message,
    });
  }

  res.status(200).json({
    status: 'success',
    car,
  });
});

exports.createCar = asyncHandler(async (req, res, next) => {
  const { model, color, quantity } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      msg: 'Input validation error',
      errors: errors.array(),
    });
  }
  const newCar = await Car.create({ model, color, quantity });

  res.status(201).json({
    status: 'success',
    newCar,
  });
});

exports.updateCar = asyncHandler(async (req, res, next) => {
  const [rowsUpdated] = await Car.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  const error = isNotCar(rowsUpdated);
  if (error) {
    return res.status(error.statusCode).json({
      status: 'error',
      msg: error.message,
    });
  }
  res.status(200).json({
    status: 'success',
  });
});

exports.deleteCar = asyncHandler(async (req, res, next) => {
  const car = await Car.destroy({
    where: {
      id: req.params.id,
    },
  });

  const error = isNotCar(car);
  if (error) {
    return res.status(error.statusCode).json({
      status: 'error',
      msg: error.message,
    });
  }
  res.status(200).json({
    status: 'success',
  });
});

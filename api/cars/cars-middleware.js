const Yup = require('yup')
const vinValidator = require('vin-validator');
const Database = require('./cars-model');

const payloadSchema = Yup.object().shape({
  vin: Yup.string().required(),
  make: Yup.string().required(),
  model: Yup.string().required(),
  mileage: Yup.string().required(),
  title: Yup.string(),
  transmission: Yup.string(),
})

const getFirstWordOfError = (message) => {
  return message.split(' ')[0];  
}

// `checkCarId` returns a status 404 with a 
// `{ message: "car with id <car id> is not found" }` 
// if the id in `req.params` does not exist in the database.

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  req.errStatus = 404;
  req.errMessage = `car with id ${id} is not found`;
  await Database.getById(id)
    .then((result) => {
      if (result.length === 0) {
        req.errStatus = 404;
        req.errMessage = `car with id ${id} is not found`;
        throw Error;
      }
      req.payload = result;
      req.carId = id;
      next();
    })
    .catch(next)
}

// `checkCarPayload` returns a status 400 with a 
// `{ message: "<field name> is missing" }` 
// if any required field is missing.

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  payloadSchema.validate(req.body)
    .then((validatedData) => {
      next(); 
    })
    .catch((err) => {
      req.errStatus = 400;
      req.errMessage = `${getFirstWordOfError(err.errors[0])} is missing`;
      next(err);
    })
}

// `checkVinNumberValid` returns a status 400 with a 
// `{ message: "vin <vin number> is invalid" }` 
// if the vin number is [invalid]
// (https://www.npmjs.com/package/vin-validator).

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("checkVinNumberValid Middleware Running")
  const isValid = vinValidator.validate(req.body.vin);
  if (isValid) {
    next();
  } else {
    const error = new Error;
    req.errStatus = 400;
    req.errMessage = `vin ${req.body.vin} is invalid`; 
    next(error);
  }
}

// `checkVinNumberUnique` returns a status 400 with a 
// `{ message: "vin <vin number> already exists" }` 
// if the vin number already exists in the database.

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  console.log("checkVinNumberUnique Middleware Running");
  const vin = req.body.vin;
  await Database.getAll()
    .then((result) => {
      result.forEach((car) => {
        if (car.vin === vin) {
          const error = new Error;
          req.errStatus = 400;
          req.errMessage = `vin ${req.body.vin} already exists`; 
          next(error);
        }
      })
      next();
    })
    .catch(next)
}

module.exports = { 
  checkCarId, 
  checkCarPayload, 
  checkVinNumberValid, 
  checkVinNumberUnique,
}

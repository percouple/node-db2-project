
// `checkCarId` returns a status 404 with a 
// `{ message: "car with id <car id> is not found" }` 
// if the id in `req.params` does not exist in the database.

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("checkCarId Middleware Running")
  next();
}

// `checkCarPayload` returns a status 400 with a 
// `{ message: "<field name> is missing" }` 
// if any required field is missing.

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("checkCarPayload Middleware Running")
  next();
}

// `checkVinNumberValid` returns a status 400 with a 
// `{ message: "vin <vin number> is invalid" }` 
// if the vin number is [invalid]
// (https://www.npmjs.com/package/vin-validator).

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("checkVinNumberValid Middleware Running")
  next();
}

// `checkVinNumberUnique` returns a status 400 with a 
// `{ message: "vin <vin number> already exists" }` 
// if the vin number already exists in the database.

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log("checkVinNumberUnique Middleware Running")
  next();
}

module.exports = { 
  checkCarId, 
  checkCarPayload, 
  checkVinNumberValid, 
  checkVinNumberUnique,
}

// DO YOUR MAGIC
const express = require('express')
const router = express.Router();
const Database = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} = require('./cars-middleware')

// `[GET] /api/cars` returns an array of cars sorted by 
// id (or an empty array if there aren't any).
router.get('/', async (req, res, next) => {
    await Database.getAll()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(next)
})

// `[GET] /api/cars/:id` returns a car by the given id.
router.get('/:id', checkCarId, async (req, res, next) => {
    res.status(200).json(req.payload);
})

// `[POST] /api/cars` returns the created car.
router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid,
    async (req, res, next) => {
        await Database.create(req.body)
            .then((result) => {
                console.log(result);
                const [id] = result;
                req.body.id = id;
                res.status(201).json(req.body);
            })
            .catch(next);
    })

// Error handler
router.use((err, req, res, next) => {
    err.status = req.errStatus || 500;
    err.message = req.errMessage || "Internal Server Error"
    res.status(err.status).json({ message: err.message })
})

module.exports = router;
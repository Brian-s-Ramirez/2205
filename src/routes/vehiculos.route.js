const express = require('express')
const vehiculosController = require('../controllers/vehiculos.controller')

const router = express.Router()

router.get('/', vehiculosController.getAllVehiculos)
router.get('/:patente', vehiculosController.getVehiculoByPatente)
router.post('/', vehiculosController.createVehiculo)
router.put('/:patente', vehiculosController.updateVehiculo )

module.exports = {router}
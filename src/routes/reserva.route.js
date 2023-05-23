const express = require('express')
const router = express.Router()
const reservasController = require('../controllers/reserva.controller')

router.get('/', reservasController.getAllReservas)
router.get('/:id', reservasController.getReservasById)
router.delete('/:id', reservasController.deleteReservaById)
router.post('/', reservasController.createReserva)

module.exports = { router }

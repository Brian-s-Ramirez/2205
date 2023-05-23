const express = require('express');

const app = express()

const PORT = process.env.PORT || 3000;

const reservaRuta = require('./routes/reserva.route')
const vehiculosRuta = require('./routes/vehiculos.route')

app.use(express.json())
app.use('/reservas', reservaRuta.router )
app.use('/vehiculos', vehiculosRuta.router)

app.listen( PORT , ()=>{ console.log(`Inicia en el puerto ${PORT}`)} )

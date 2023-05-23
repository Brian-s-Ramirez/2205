const reservas = require('../../data/reservas.json')

const getAllReservas = (req, res)=>{
    res.status(200).json(reservas)
}
const getReservasById = ( req, res) => {
    const id = req.params.id
    const indice = reservas.findIndex( reserva => reserva.id == id)
    if(indice >= 0 ){
        res.status(200)
        .json(reservas[indice])
    } else {
        res.status(404)
        .json({
            mensaje : `La reserva con el id ${id} no fue encontrada.`
        })
    }
}
const deleteReservaById = (req, res) => {
    const id = req.params.id
    const indice = reservas.findIndex( reserva => reserva.id == id )
    if(indice==-1) {
        res.status(404).
        json(
            {
            resultado: "La operación de borrado no pudo ser realizada",
            mensaje: `La reserva con id ${id} no fue encontrada`
            }
        )
    } else {
        const reserva = reservas[indice];
        const resultado = reservas.splice(indice,1)
        res.status(200)
        .json(
            {resultado: "La operación de borrado pudo realizarse con exito",
                  reserva: reserva
            }
        )
    }
}
const createReserva = (req, res) => {
    const reservasData = req.body
    const existe = reservas.find(reserva => reserva.patente == reservasData.id)
    if (!existe) {
        if( ! reservasData.cantPersonas > 10)
        res.status(400).json({mensaje: `No se puede generar la reserva para esa cantidad de personas ${reservasData.cantPersonas} `})     
        if( ! reservasData.distancia > 500)
        res.status(400).json({mensaje: `No se puede generar la reserva para esa distancia ${reservasData.distancia} `})
        if( ! reservasData.fecha > 8)
        res.status(400).json({mensaje: `Ingrese una fecha correcta fecha ${reservasData.fecha} `})

        if (!reservasData.id) {
            res.status(400).json({mensaje: `No se pudo generar la reserva ${reservasData.id} `})    
        } else  {
            reservas.push(reservasData)
            res.status(201).json({mensaje: `La reserva con id ${reservasData.id} fue creada correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `La reserva con id ${reservasData.id} ya existe `})
    }
}

module.exports = { getAllReservas, getReservasById, deleteReservaById, createReserva }
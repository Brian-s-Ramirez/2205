const vehiculos = require('../../data/vehiculos.json')

const getAllVehiculos = (req, res)=>{
    res.json( vehiculos ).status(200)
}
const getVehiculoByPatente = (req, res) => {
    const patente = req.params.patente
    const resultado = vehiculos.find( vehiculo => vehiculo.patente == patente)
    if(resultado) {
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El vehiculo con patente ${patente} no esta registrado`} )
    }
}
const updateVehiculo = (req, res)=>{
    const patente = req.params.patente
    const vehiculosData = req.body
    const indice = vehiculos.findIndex(vehiculo => vehiculo.patente == patente)
    if ( indice >= 0 ) {
        vehiculos[indice].capacidad = vehiculosData.capacidad
        vehiculos[indice].autonomiaKms = vehiculosData.autonomiaKms
        if (vehiculosData.habilitado!==undefined) {
            vehiculos[indice].habilitado = vehiculosData.habilitado 
        }
        res.status(201).json({"vehiculo": vehiculos[indice]})
    }
    else {
        res.status(404).
        json(
            {
                resultado: "La operación de modicar no pudo ser realizada",
                mensaje: `El vehiculo con patente ${patente} no se pudo encontrar`
            }
        )
    }
}
const createVehiculo = (req, res) => {
    const vehiculosData = req.body
    const existe = vehiculos.find(vehiculo => vehiculo.patente == vehiculosData.patente)
    if (!existe) {
        if( ! vehiculosData.habilitado)
        vehiculosData.habilitado = false
        if( ! vehiculosData.capacidad > 7)
        res.status(400).json({mensaje: `No puedo generar el vehiculo con capacidad ${vehiculosData.capacidad} `})     
        if (!vehiculosData.patente) {
            res.status(400).json({mensaje: `No puedo generar el vehiculo con patente ${vehiculosData.patente} `})    
        } else  {
            vehiculos.push(vehiculosData)
            res.status(201).json({mensaje: `El vehiculo con patente ${vehiculosData.patente} fue creado correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `El vehiculo con patente ${vehiculosData.patente} ya existe `})
    }
}

module.exports = { 
    getAllVehiculos, 
    getVehiculoByPatente,
    createVehiculo,
    updateVehiculo,
}
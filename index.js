require('dotenv').config()

const {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares
} = require("./helpers/inquirer")

const Busquedas = require("./models/busquedas")

const main = async() => {
  const busquedas = new Busquedas()
  let opt

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1:
        const buscar = await leerInput('Ciudad: ')
        const lugares = await busquedas.ciudad(buscar)
        const id = await listarLugares(lugares)
        const lugarSeleccionado = lugares.find(lugar => lugar.id === id)
        const clima = await busquedas.climaLugarSeleccionado(lugarSeleccionado.lat, lugarSeleccionado.lng)

        console.clear()
        console.log('\nInformación de la ciudad\n'.magenta)
        console.log('Ciudad:'.cyan, lugarSeleccionado.nombre.magenta)
        console.log('Lat:'.cyan, lugarSeleccionado.lat)
        console.log('Lng:'.cyan, lugarSeleccionado.lng)
        console.log('Temperatura:'.cyan, clima.temp)
        console.log('Mínima:'.cyan, clima.min)
        console.log('Máxima:'.cyan, clima.max)
        console.log('Sensación:'.cyan, clima.sens)
        console.log('Descripción:'.cyan, clima.desc.magenta)
      break
      case 2:
        console.log('Opcion 2')
      break
      case 0:
        console.log('Salir')
      break
    }

    if (opt !== 0) await pausa()
  } while (opt !== 0)
}

main()

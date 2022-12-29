const fs = require('fs')
const axios = require('axios')

class Busquedas {
  historial = []
  rutaDB = './db/database.json'

  constructor() {
    this.leerDB()
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: 'es'
    }
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es'
    }
  }

  get historialCapitalizado() {
    return this.historial.map(item => {
      let palabras = item.split(' ')
      palabras = palabras.map(palabra => palabra[0].toUpperCase() + palabra.substr(1))

      return palabras.join(' ')
    })
  }

  async ciudad(lugar = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox
      })

      const response = await instance.get()
      return response.data.features.map(lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
      }))
    } catch (error) {
      return []
    }
  }

  async climaLugarSeleccionado (lat, lon) {
    try {
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: { ...this.paramsOpenWeather, lat, lon }
      })

      const response = await instance.get()
      const {main, weather} = response.data

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
        sens: main.feels_like
      }
    } catch (error) {
      console.log(error)
    }
  }

  agregarHistorial( lugar = '' ) {
    if ( this.historial.includes( lugar.toLowerCase() ) ) {
      return
    }

    this.historial = this.historial.splice(0, 5)

    this.historial.unshift( lugar.toLowerCase() )
    this.guardarDB()
  }

  guardarDB() {
    const payload = {
      historial: this.historial
    }

    fs.writeFileSync(this.rutaDB, JSON.stringify(payload))
  }

  leerDB() {
    if ( !fs.existsSync(this.rutaDB) ) return

    const info = fs.readFileSync(this.rutaDB, {encondig: 'utf-8'})
    const data = JSON.parse(info)

    this.historial = data.historial
  }
}

module.exports = Busquedas
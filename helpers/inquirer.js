const inquirer = require('inquirer')
require('colors')

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.magenta} Buscar ciudad`
      },
      {
        value: 2,
        name: `${'2.'.magenta} Historial`
      },
      {
        value: 0,
        name: `${'0.'.magenta} Salir`
      }
    ]
  }
]

const inquirerMenu = async() => {
  console.clear()
  console.log('========================='.cyan)
  console.log('  Selecciona una opción'.magenta)
  console.log('=========================\n'.cyan)

  const { opcion } = await inquirer.prompt(preguntas)
  return opcion
}

const pausa = async() => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.magenta} para continuar`
    }
  ]

  console.log('\n')
  await inquirer.prompt(question)
}

const leerInput = async( message ) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate( value ) {
        if(value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      }
    }
  ]

  const {desc} = await inquirer.prompt(question)
  return desc
}

const listarLugares = async( lugares = [] ) => {
  const choices = lugares.map((lugar, index) => {
    const indice = `${index + 1}.`.magenta

    return {
      value: lugar.id,
      name: `${indice} ${lugar.nombre}`
    }
  })

  choices.unshift({
    value: '0',
    name: `${'0.'.magenta} Cancelar`
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Selecciona un lugar',
      choices
    }
  ]

  const {id} = await inquirer.prompt(preguntas)
  return id
}

const confirmar = async(message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

const mostrarListadoChecklist = async( tareas = [] ) => {
  const choices = tareas.map((tarea, index) => {
    const indice = `${index + 1}.`.magenta

    return {
      value: tarea.id,
      name: `${indice} ${tarea.desc}`,
      checked: ( tarea.fechaCompletado ) ? true : false
    }
  })

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ]

  const {ids} = await inquirer.prompt(pregunta)
  return ids
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoChecklist
}
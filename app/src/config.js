const baseUrl = process.env.NODE_ENV == 'production' ? 'https://misol.herokuapp.com' : 'localhost:3000/api'

const configuration = {
  homeMenu: [
    {name: 'Variedades', path: '/categories'},
    {name: 'Pedidos', path: '/orders'},
    {name: 'Estadisticas', path: '/statistics'},
    {name: 'Ajustes', path: '/settings'}
  ],
  baseUrl: baseUrl,
  restUrl: baseUrl + '/api',
  sandwichQuantity: [3, 6, 9, 12, 24, 36, 48, 60],
  showToast: true
}

export default configuration

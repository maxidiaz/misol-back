const baseUrl = 'http://192.168.0.13:3000'

const configuration = {
  homeMenu: [
    {name: 'Variedades', path: '/categories'},
    {name: 'Pedidos', path: '/orders'},
    {name: 'Estadisticas', path: '/statistics'},
    {name: 'Ajustes', path: '/settings'}
  ],
  baseUrl: baseUrl,
  //restUrl: process.env.NODE_ENV == 'production' ? 'https://misol.herokuapp.com/api' : 'localhost:3000/api',
  restUrl: baseUrl + '/api',
  sandwichQuantity: [3, 6, 9, 12, 24, 36, 48, 60],
  bitlyToken: '3cfde5d2b1e1d2544ca4490f749c51622e7ade89',
  showToast: true
}

export default configuration

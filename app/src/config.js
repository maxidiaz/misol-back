const configuration = {
  homeMenu: [
    {name: 'Variedades', path: '/categories'},
    {name: 'Pedidos', path: '/orders'},
    {name: 'Estadisticas', path: '/statistics'},
    {name: 'Ajustes', path: '/settings'}
  ],
  //restUrl: process.env.NODE_ENV == 'production' ? 'https://misol.herokuapp.com/api' : 'localhost:3000/api',
  restUrl: 'http://127.0.0.1:3000/api',
  sandwichQuantity: [3, 6, 9, 12, 24, 36, 48, 60],
  showToast: true
}

export default configuration

const configuration = {
  homeMenu: [
    {name: 'Variedades', path: '/categories'},
    {name: 'Pedidos', path: '/orders'},
    {name: 'Estadisticas', path: '/statistics'},
    {name: 'Ajustes', path: '/settings'}
  ],
  //restUrl: 'https://misol.herokuapp.com/api',
  restUrl: 'http://localhost:3000/api',
  sandwichQuantity: [3, 6, 9, 12, 24, 36, 48, 60],
  showToast: true
}

export default configuration

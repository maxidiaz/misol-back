export const newOrderNotification = (data) => {
  return {
    title: 'Nuevo pedido',
    body: 'Un pedido a nombre de ' + data.name,
    icon: '/assets/app/platform/android/res/drawable-xxxhdpi/appicon.png',
    click_action: 'https://misol.herokuapp.com/#/orders',
    data: {
      actionUrl: '/orders'
    }
  }
}

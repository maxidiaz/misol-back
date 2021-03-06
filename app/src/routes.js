import CategoriesMenu from './routes/categories/CategoriesMenu.vue'
import Varieties from './routes/varieties/Varieties.vue'
import Home from './routes/home/Home.vue'
import Orders from './routes/orders/Orders.vue'
import OrderDetail from './routes/orders/orderDetail/OrderDetail.vue'
import NewOrder from './routes/orders/newOrder/NewOrder.vue'
import Options from './routes/options/Options.vue'
import StatisticMenu from './routes/statistic/StatisticMenu.vue'
import DailyStats from './routes/statistic/DailyStats.vue'
import StatsOnDate from './routes/statistic/StatsOnDate.vue'
import Settings from './routes/settings/Settings.vue'
import SignUp from './routes/signup/SignUp.vue'
import Login from './routes/login/Login.vue'
import RecentTransactions from './routes/statistic/RecentTransactions.vue'

const routes = [
  {path: '/', component: Home},
  {path: '/login', component: Login},
  {path: '/signup', component: SignUp},
  {path: '/categories', component: CategoriesMenu},
  {path: '/varieties/:category', component: Varieties},
  {path: '/orders', component: Orders},
  {path: '/orders/detail/:id', component: OrderDetail},
  {path: '/orders/new', component: NewOrder, meta: {keepAlive:true}},
  {path: '/options', component: Options},
  {path: '/statistics', component: StatisticMenu},
  {path: '/statistics/daily/:date', component: DailyStats},
  {path: '/statistics/stats-on-date', component: StatsOnDate},
  {path: '/statistics/recent-transactions', component: RecentTransactions},
  {path: '/settings', component: Settings}
]

export default routes

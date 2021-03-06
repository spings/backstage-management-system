import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import ClassifiedInfo from '../views/ClassifiedInfo'
import ShopInfo from '../views/ShopInfo'
import MerchantInfoAudit from '../views/MerchantInfoAudit'
import MerchantInfoMaintenance from '../views/MerchantInfoMaintenance'
import Emp from '../views/Emp'
import Role from '../views/Role'
import Menu from '../views/Menu'
import WarehouseType from '../views/WarehouseType'
import Warehouse from '../views/Warehouse'
import AllocatingManagement from '../views/AllocatingManagement'
import SalesStatistics from '../views/SalesStatistics'
import RevenueStatistics from '../views/RevenueStatistics'
import ProcurementManagement from '../views/ProcurementManagement'
import WarehouseGoods from "../views/WarehouseGoods";
import Purchase from "../views/Purchase";
/*import ShoplnfoAdd from "../components/Shop/ShoplnfoAdd";
import ShoplnfoEdit from "../components/Shop/ShoplnfoEdit";*/

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/user',
        name: 'User',
        component: User
    },
    {
        path: '/classifiedInfo',
        name: 'ClassifiedInfo',
        component: ClassifiedInfo
    },
    {
        path: '/shopInfo',
        name: 'ShopInfo',
        component: ShopInfo
    },
    {
        path: '/merchantInfoAudit',
        name: 'MerchantInfoAudit',
        component: MerchantInfoAudit
    },
    {
        path: '/merchantInfoMaintenance',
        name: 'MerchantInfoMaintenance',
        component: MerchantInfoMaintenance
    },
    {
        path: '/emp',
        name: 'Emp',
        component: Emp
    },
    {
        path: '/role',
        name: 'Role',
        component: Role
    },
    {
        path: '/menu',
        name: 'Menu',
        component: Menu
    },
    {
        path: '/warehouseType',
        name: 'WarehouseType',
        component: WarehouseType
    },
    {
        path: '/warehouse',
        name: 'Warehouse',
        component: Warehouse
    },
    {
        path: '/allocatingManagement',
        name: 'AllocatingManagement',
        component: AllocatingManagement
    },
    {
        path: '/salesStatistics',
        name: 'SalesStatistics',
        component: SalesStatistics
    },
    {
        path: '/revenueStatistics',
        name: 'RevenueStatistics',
        component: RevenueStatistics
    },
    {
        path: '/procurementManagement',
        name: 'ProcurementManagement',
        component: ProcurementManagement
    },
    {
        path: '/warehouseGoods',
        name: 'WarehouseGoods',
        component: WarehouseGoods
    },
    {
        path: '/purchase',
        name: 'Purchase',
        component: Purchase
    },
/*    {
        path: '/shoplnfoAdd',
        name: 'ShoplnfoAdd',
        component:ShoplnfoAdd
    },
    {
        path: '/shoplnfoAdd',
        name: 'ShoplnfoAdd',
        component:ShoplnfoAdd
    },*/
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

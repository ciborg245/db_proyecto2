import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewClient from '@/components/NewClient'
import Clients from '@/components/Clients'
import Products from '@/components/Products'
import Stores from '@/components/Stores'
import States from '@/components/States'
import Client from '@/components/Client'
import ClientEdit from '@/components/ClientEdit'
import StateEdit from '@/components/StateEdit'
import StoreEdit from '@/components/StoreEdit'
import ProductEdit from '@/components/ProductEdit'

Vue.use(Router)

export default new Router(
  {
    routes: [
      {
        path: '/',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/new',
        name: 'NewClient',
        component: NewClient
      },
      {
        path: '/clients',
        name: 'Clients',
        component: Clients
      },
      {
        path: '/client',
        name: 'Client',
        component: Client
      },
      {
        path: '/clientEdit',
        name: 'ClientEdit',
        component: ClientEdit
      },
      {
        path: '/products',
        name: 'Products',
        component: Products
      },
      {
        path: '/editProduct',
        name: 'ProductEdit',
        component: ProductEdit
      },
      {
        path: '/stores',
        name: 'Stores',
        component: Stores
      },
      {
        path: '/editStore',
        name: 'StoreEdit',
        component: StoreEdit
      },
      {
        path: '/states',
        name: 'States',
        component: States
      },
      {
        path: '/editState',
        name: 'StateEdit',
        component: StateEdit
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
)

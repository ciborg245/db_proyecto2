import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewClient from '@/components/NewClient'
import Clients from '@/components/Clients'
import Products from '@/components/Products'
import Stores from '@/components/Stores'
import States from '@/components/States'
import Client from '@/components/Client'
import Twitter from '@/components/Twitter'
import ClientNewEdit from '@/components/ClientNewEdit'
import StateNewEdit from '@/components/StateNewEdit'
import StoreNewEdit from '@/components/StoreNewEdit'
import ProductNewEdit from '@/components/ProductNewEdit'

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
        path: '/twitter',
        name: 'Twitter',
        component: Twitter
      },
      {
        path: '/clientEdit',
        name: 'ClientNewEdit',
        component: ClientNewEdit
      },
      {
        path: '/products',
        name: 'Products',
        component: Products
      },
      {
        path: '/product',
        name: 'ProductNewEdit',
        component: ProductNewEdit
      },
      {
        path: '/stores',
        name: 'Stores',
        component: Stores
      },
      {
        path: '/store',
        name: 'StoreNewEdit',
        component: StoreNewEdit
      },
      {
        path: '/states',
        name: 'States',
        component: States
      },
      {
        path: '/state',
        name: 'StateNewEdit',
        component: StateNewEdit
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
)

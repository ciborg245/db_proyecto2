import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'

import Clients from '@/components/Clients'
import ClientTypes from '@/components/ClientTypes'
import clientTypesNewEdit from '@/components/clientTypesNewEdit'
import Products from '@/components/Products'
import Stores from '@/components/Stores'
import States from '@/components/States'
import Client from '@/components/Client'
import Twitter from '@/components/Twitter'

import Reports from '@/components/Reports'

import Graph1 from '@/components/Reports/graph1'
import Graph2 from '@/components/Reports/graph2'
import Graph3 from '@/components/Reports/graph3'
import Graph4 from '@/components/Reports/graph4'
import Graph5 from '@/components/Reports/graph5'

import Resumen1 from '@/components/Reports/resumen1'
import Resumen2 from '@/components/Reports/resumen2'
import Resumen3 from '@/components/Reports/resumen3'
import Resumen4 from '@/components/Reports/resumen4'
import Resumen5 from '@/components/Reports/resumen5'

import Detalle1 from '@/components/Reports/detail1'
import Detalle2 from '@/components/Reports/detail2'
import Detalle3 from '@/components/Reports/detail3'
import Detalle4 from '@/components/Reports/detail4'

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
        path: '/clientTypes',
        name: 'ClientTypes',
        component: ClientTypes
      },
      {
        path: '/types',
        name: 'ClientTypesNewEdit',
        component: clientTypesNewEdit
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
      },
      {
        path: '/reports',
        name: 'Reports',
        component: Reports
      },
      {
        path: '/graph1',
        name: 'Graph1',
        component: Graph1
      },
      {
        path: '/graph2',
        name: 'Graph2',
        component: Graph2
      },
      {
        path: '/graph3',
        name: 'Graph3',
        component: Graph3
      },
      {
        path: '/graph4',
        name: 'Graph4',
        component: Graph4
      },
      {
        path: '/graph5',
        name: 'Graph5',
        component: Graph5
      },
      {
        path: '/resumen1',
        name: 'Resumen1',
        component: Resumen1
      },
      {
        path: '/resumen2',
        name: 'Resumen2',
        component: Resumen2
      },
      {
        path: '/resumen3',
        name: 'Resumen3',
        component: Resumen3
      },
      {
        path: '/resumen4',
        name: 'Resumen4',
        component: Resumen4
      },
      {
        path: '/resumen5',
        name: 'Resumen5',
        component: Resumen5
      },
      {
        path: '/detail1',
        name: 'Detalle1',
        component: Detalle1
      },
      {
        path: '/detail2',
        name: 'Detalle2',
        component: Detalle2
      },
      {
        path: '/detail3',
        name: 'Detalle3',
        component: Detalle3
      },
      {
        path: '/detail4',
        name: 'Detalle4',
        component: Detalle4
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
)

import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewClient from '@/components/NewClient'
import Clients from '@/components/Clients'
import Client from '@/components/Client'

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
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
)

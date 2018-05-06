import config from '@/settings/config'
import api from '@/store/utils/api'

import Client from '@/store/models/Client'

const state = {}

const getters = {}

const mutations = {}

// async operations
const actions = {
  client_delete (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const query = data.sqlQuery || ''

    let url = apiRoot + config.apiQuery

    const params = {
      'sql_query': query
    }

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  client_new (context, data = {}) {

  },
  client_edit (context, data = {}) {

  },
  clients_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiClients

    return new Promise((resolve, reject) => {
      api
        .get(url)
        .then((response) => {
          const data = response.data || {}
          const clientsData = data.msg || {}

          let clients = []
          for (const clientData of clientsData) {
            const newClient = new Client()
            newClient.initWithData(clientData)
            clients.push(newClient)
          }
          resolve(clients)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

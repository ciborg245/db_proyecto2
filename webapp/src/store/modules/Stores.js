import config from '@/settings/config'
import api from '@/store/utils/api'

const state = {}

const getters = {}

const mutations = {}

// async operations
const actions = {
  store_delete (context, data = {}) {
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
  store_new (context, data = {}) {
    const state = data.state || ''
    const address = data.address || ''

    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiStores

    const params = {
      'direccion': address,
      'id_depto': state
    }
    console.log('params')
    console.log(params)
    return new Promise((resolve, reject) => {
      api.post(url, params)
        .then((response) => {
          console.log(response)
          const data = response.data || {}
          if (data.success) {
            resolve(data.msg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  store_edit (context, data = {}) {
    const storeId = data.storeId || ''
    const state = data.state || ''
    const address = data.address || ''

    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiStoreId
    url = url.replace('{storeId}', storeId) + '/edit'

    const params = {
      'direccion': address,
      'id_depto': state
    }

    return new Promise((resolve, reject) => {
      api.put(url, params)
        .then((response) => {
          console.log(response)
          const data = response.data || {}
          if (data.success) {
            resolve(data.msg)
            return
          }
          reject(data.msg)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  stores_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiStores

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data || {}
          if (data.success) {
            resolve(data.msg)
          }
        })
    })
  },
  store_get (context, data = {}) {
    const storeId = data.storeId

    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiStoreId
    url = url.replace('{storeId}', storeId)

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data || {}
          if (data.success) {
            resolve(data.msg[0])
          }
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

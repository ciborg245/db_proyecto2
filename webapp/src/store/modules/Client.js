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

    let url = apiRoot + config.apiClientId
    const clientId = data.clientId || ''
    url = url.replace('{clientId}', clientId)

    return new Promise((resolve, reject) => {
      api
        .delete(url)
        .then((response) => {
          const data = response.data || {}
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  client_new (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const name = data.name || ''
    const gender = data.gender || ''
    const birthdate = data.birthdate || ''
    const email = data.email || ''
    const phone = data.phone || ''
    const address = data.address || ''
    const credit = (data.credit * 1) || ''
    const state = (data.state * 1) || null
    const image = data.image || null
    const twitterId = data.twitterId || null
    const clientType = (data.clientType * 1) || null
    const favoriteProduct = (data.favoriteProduct * 1) || null

    const extraFields = data.extras || null

    const params = {
      'nombre': name,
      'genero': gender,
      'fechanacimiento': birthdate,
      'correo': email,
      'telefono': phone,
      'direccion': address,
      'limitecredito': credit,
      'foto': image,
      'id_depto': state,
      'id_twitter': twitterId,
      'id_tipocliente': clientType,
      'id_producto': favoriteProduct
    }

    if (extraFields) {
      params['extras'] = extraFields
    }

    let url = apiRoot + config.apiClients

    return new Promise((resolve, reject) => {
      api
        .post(url, params)
        .then((response) => {
          const clientData = response.data || {}
          const msg = clientData.msg || {}
          resolve(msg)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  client_edit (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const clientId = data.clientId || ''

    let url = apiRoot + config.apiClientId
    url = url.replace('{clientId}', clientId)
    url = url + '/edit'
    const name = data.name || ''
    const gender = data.gender || ''
    const birthdate = data.birthdate || ''
    const email = data.email || ''
    const phone = data.phone || ''
    const address = data.address || ''
    const credit = (data.credit * 1) || ''
    const state = (data.state * 1) || null
    const image = data.image || null
    const twitterId = data.twitterId || null
    const clientType = (data.clientType * 1) || null
    const favoriteProduct = (data.favoriteProduct * 1) || null
    const extras = data.extras || {}

    const params = {
      'id': clientId,
      'nombre': name,
      'genero': gender,
      'fechanacimiento': birthdate,
      'correo': email,
      'telefono': phone,
      'direccion': address,
      'limitecredito': credit,
      'foto': image,
      'id_depto': state,
      'id_twitter': twitterId,
      'tipocliente': clientType,
      'id_producto': favoriteProduct,
      'extras': extras
    }

    return new Promise((resolve, reject) => {
      api
        .put(url, params)
        .then((response) => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  clients_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot
    const orderby = data.orderby || 'id'
    let url = apiRoot + config.apiClients + '?orderby=' + orderby

    if (data) {
      if (data.state) {
        url = url + '&state=' + data.state
      }
      if (data.clientType) {
        url = url + '&type=' + data.clientType
      }
      if (data.nameSearch) {
        url = url + '&name=' + data.nameSearch
      }
    }

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
  },
  client_types (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + '/clientTypes'

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data
          if (data.success) {
            resolve(data.msg)
            return
          }
          console.log(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  type_get (context, data = {}) {
    const typeId = data.typeId
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + '/clientTypes/' + typeId

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data
          if (data.success) {
            resolve(data.msg[0])
            return
          }
          console.log(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  client_type_new (context, data = {}) {
    const name = data.name || ''
    const discount = data.discount || 0

    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + '/clientTypes'

    const params = {
      'name': name,
      'discount': discount
    }

    return new Promise((resolve, reject) => {
      api.post(url, params)
        .then((res) => {
          const data = res.data || {}
          resolve(data)
        })
        .catch(err => reject(err))
    })
  },
  client_type_edit (context, data = {}) {
    const typeId = data.typeId
    const name = data.name
    const discount = data.discount

    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + '/clientTypes/{typeId}'
    url = url.replace('{typeId}', typeId)

    const params = {
      'name': name,
      'discount': discount
    }

    return new Promise((resolve, reject) => {
      api.put(url, params)
        .then((response) => {
          const data = response.data || {}
          if (data.success) {
            resolve(data.msg)
            return
          }
          reject(data)
        })
        .catch((err) => reject(err))
    })
  },
  client_type_delete (context, data = {}) {
    const typeId = data.typeId

    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + '/clientTypes/' + typeId

    return new Promise((resolve, reject) => {
      api.delete(url)
        .then((res) => {
          const data = res.data || {}
          resolve(data)
        })
        .catch(err => reject(err))
    })
  },
  client_getOne (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot
    const clientId = data.clientId || ''
    let url = apiRoot + config.apiClientId
    url = url.replace('{clientId}', clientId)

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
  },
  field_delete (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot
    const fieldId = data.fieldId || ''
    let url = apiRoot + '/extrafield/{fieldId}'
    url = url.replace('{fieldId}', fieldId)

    return new Promise((resolve, reject) => {
      api.delete(url)
        .then((response) => {
          resolve(response)
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

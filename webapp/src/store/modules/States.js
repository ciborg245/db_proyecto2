import config from '@/settings/config'
import api from '@/store/utils/api'

const state = {}

const getters = {}

const mutations = {}

// async operations
const actions = {
  state_delete (context, data = {}) {
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
  state_new (context, data = {}) {

  },
  state_edit (context, data = {}) {

  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

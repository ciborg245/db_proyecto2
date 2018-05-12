import config from '@/settings/config'
import api from '@/store/utils/api'

const state = {}

const getters = {}

const mutations = {}

// async operations
const actions = {
  state_delete (context, data = {}) {
  },
  state_new (context, data = {}) {

  },
  state_edit (context, data = {}) {

  },
  states_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiStates

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data || {}
          if (data.success) {
            const states = data.msg || []
            resolve(states)
            return
          }
          console.log(response)
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

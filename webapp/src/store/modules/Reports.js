import config from '@/settings/config'
import api from '@/store/utils/api'

const state = {}

const getters = {}

const mutations = {}

// async operations
const actions = {
  report1_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + '/favoriteProduct'
    const gender = data.gender
    const minAge = data.minAge
    const maxAge = data.maxAge

    url = url + '/' + gender + '/' + minAge + '/' + maxAge

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data || {}
          resolve(data.rows[0])
        })
        .catch(err => reject(err))
    })
  },
  report2_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + '/favoriteCategory'
    const gender = data.gender
    const minAge = data.minAge
    const maxAge = data.maxAge

    url = url + '/' + gender + '/' + minAge + '/' + maxAge

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data || {}
          resolve(data.rows[0])
        })
        .catch(err => reject(err))
    })
  },
  report3_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + '/popularState'
    const gender = data.gender
    const minAge = data.minAge
    const maxAge = data.maxAge
    const minCredit = data.minCredit
    const maxCredit = data.maxCredit

    url = url + '/' + gender + '/' + minAge + '/' + maxAge + '/' + minCredit + '/' + maxCredit

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data || {}
          resolve(data.rows[0])
        })
        .catch(err => reject(err))
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

import config from '@/settings/config'
import api from '@/store/utils/api'
import Product from '@/store/models/Product'

const state = {}

const getters = {}

const mutations = {}

// async operations
const actions = {
  product_delete (context, data = {}) {
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
  products_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiProducts

    return new Promise((resolve, reject) => {
      api
        .get(url)
        .then((response) => {
          console.log(response)
          const data = response.data || {}
          const productsData = data.msg || {}
          let products = []
          for (const productData of productsData) {
            const newProduct = new Product()
            newProduct.initWithData(productData)
            products.push(newProduct)
          }
          resolve(products)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  product_get (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot
    const productId = data.productId || ''
    let url = apiRoot + config.apiProductId
    url = url.replace('{productId}', productId)

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((response) => {
          const data = response.data
          if (data.success) {
            const newProduct = new Product()
            newProduct.initWithData(data.msg)
            resolve(newProduct)
            return
          }
          console.log(data.msg)
        })
        .catch(err => reject(err))
    })
  },
  product_edit (context, data = {}) {

  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

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

    const productId = data.productId

    let url = apiRoot + config.apiProductId
    url = url.replace('{productId}', productId)

    return new Promise((resolve, reject) => {
      api
        .delete(url)
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
    if (data.category) {
      url = url + '?category=' + data.category
    }

    return new Promise((resolve, reject) => {
      api
        .get(url)
        .then((response) => {
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
          console.log(response)
          const data = response.data
          if (data.success) {
            const newProduct = new Product()
            newProduct.initWithData(data.msg[0])
            resolve(newProduct)
            return
          }
          console.log(data.msg)
        })
        .catch(err => reject(err))
    })
  },
  product_edit (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    const productId = data.productId || ''
    const productName = data.productName || null
    const price = data.price * 1 || 0
    const category = data.category || null

    let url = apiRoot + config.apiProductId
    url = url.replace('{productId}', productId) + '/edit'

    const params = {
      'nombre': productName,
      'precio': price,
      'categoria': category
    }

    return new Promise((resolve, reject) => {
      api.put(url, params)
        .then((response) => {
          const data = response.data
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  product_new (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiProducts

    const productName = data.productName || null
    const price = data.price * 1 || 0
    const category = data.category || null

    const params = {
      'name': productName,
      'price': price,
      'category': category
    }

    return new Promise((resolve, reject) => {
      api.post(url, params)
        .then((response) => {
          const data = response.data
          resolve(data)
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

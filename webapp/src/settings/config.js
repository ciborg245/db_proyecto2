const config = {
  env: 'local',

  local: {
    domain: 'localhost',
    root: 'http://localhost:8080',
    apiRoot: 'http://localhost:3000/api',
    cookieDomain: 'localhost',
    cookieSecure: false,
    analytics: '',
    forgotCallback: '/#/reset'
  },

  apiClients: '/clients',
  apiClientId: '/clients/{clientId}',
  apiProducts: '/products',
  apiProductId: '/products/{productId}',
  apiStates: '/states',
  apiStores: '/stores',
  apiStoreId: '/stores/{storeId}',
  apiTwitterName: '/twitter/name/{screen_name}',
  apiTwitterId: '/twitter/id/{twitterId}',
  apiTwitterTweets: '/twitter/tweets',
  apiTwitterSearch: '/twitter/search/{word}',
  apiTwitterSearchId: '/twitter/search/{id}/{word}',
  apiTwitterSearchName: '/twitter/search/name/{screen_name}/{word}',
  apiTwitterDelete: '/twitter/{twitterId}'
}

export default config

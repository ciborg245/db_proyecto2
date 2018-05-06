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
  apiDatabases: '/databases',
  apiQuery: '/databases/queries'
}

export default config

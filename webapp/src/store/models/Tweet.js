
export default class Tweet {
  constructor () {
    this.created_at = null
    this.id = 0
    this.user = null
    this.text = ''
    this.favorites = ''
    this.retweets = ''
  }

  initWithData (data = {}) {
    this.created_at = data.created_at || null
    this.id = data.id || 0
    this.user = data.user || null
    this.text = data.text || ''
    this.favorites = data.favorites || 0
    this.retweets = data.retweets || 0
  }
}

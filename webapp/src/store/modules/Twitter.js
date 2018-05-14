import config from '@/settings/config'
import api from '@/store/utils/api'

import Tweet from '@/store/models/Tweet'

const actions = {
  create_tweets_screnname (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot
    const screenName = data['screen_name'] || ''
    let url = apiRoot + config.apiTwitterName
    url = url.replace('{screen_name}', screenName)

    return new Promise((resolve, reject) => {
      api.post(url)
        .then((responce) => {
          const data = responce.data || {}
          const msg = data.msg || {}
          resolve(msg)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  create_tweets_id (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot
    const twitterId = data.twitterId || ''
    let url = apiRoot + config.apiTwitterId
    url = url.replace('{twitterId}', twitterId)

    return new Promise((resolve, reject) => {
      api.post(url)
        .then((responce) => {
          const data = responce.data || {}
          const msg = data.msg || {}
          resolve(msg)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  get_tweets (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot

    let url = apiRoot + config.apiTwitterTweets

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((responce) => {
          const data = responce.data || {}
          const tweetsData = data.tweets || {}
          let tweets = []
          for (const tweetData of tweetsData) {
            const tweet = new Tweet()
            tweet.initWithData(tweetData)
            tweets.push(tweet)
          }

          resolve(tweets)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  search_tweets (context, data = {}) {
    const env = config.env
    const apiRoot = config[env].apiRoot
    const word = data.word || ''
    let url = apiRoot + config.apiTwitterSearch
    url = url.replace('{word}', word)

    return new Promise((resolve, reject) => {
      api.get(url)
        .then((responce) => {
          const data = responce.data || {}
          const tweetsData = data.tweets || {}
          let tweets = []
          for (const tweetData of tweetsData) {
            const tweet = new Tweet()
            tweet.initWithData(tweetData)
            tweets.push(tweet)
          }

          resolve(tweets)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  actions
}


<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title">
            Ánalisis de Twitter
          </h1>
          <h2 class="subttile">
            Datos
          </h2>
        </div>
      </div>
    </section>
    <div class="columns search-div">
      <div class="column is-two-fifths">
        <div class="control is-medium has-icons-left">
          <input class="input is-medium is-rounded" v-model="searchWord" type="text" placeholder="Text">
          <span class="icon is-medium is-left">
              <i class="fa fa-search"></i>
          </span>
        </div>
      </div>
      <div class="column is-two-fifths">
        <div class="dropdown is-active">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>{{ currentName }}</span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content" v-for="user in users">
              <a href="#" class="dropdown-item">
                {{ user }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <a class="button is-info is-medium" v-on:click="searchTweets">Search</a>
      </div>
    </div>
    <div style="margin-top: 3%">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tweets</p>
            <p class="title">325</p>
          </div>
        </div>
        <div class="level-item nas-text-centered">
          <div>
            <p class="heading">Events</p>
            <p class="title">53</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Matches</p>
            <p class="title">384</p>
          </div>
        </div>
      </nav>
      <section class="section">
        <div class="container">
          <div class="box" v-for="tweet in tweets">
            <Tweet
              :id="tweet.twitterId"
              :text="tweet.text"
              :user="tweet.user"
              :favorites="tweet.favorites"
              :retweets="tweet.retweets"
            />
          </div>
        </div>
      </section>
    </div>
    <loader :is-loading="isLoading"/>
  </div>
</template>

<script type="text/javascript">
  
  // import tweets from '../../static/tweets'
  import Tweet from '@/components/common/Tweet'
  import Loader from '@/components/common/Loader'

  export default {
    name: 'twitter',
    components: {
      Tweet,
      Loader
    },
    data () {
      return {
        tweets: [],
        users: {},
        currentName: '',
        searchWord: '',
        isLoading: true
      }
    },
    methods: {
      goBack: function () {
        console.log('safo')
      },
      loadData: function () {
        this.tweets = []
        return this.$store.dispatch('get_tweets')
          .then((info) => {
            console.log(info)
            this.tweets = info
          })
      },
      searchTweets: function () {
        if (this.searchWord) {
          return this.$store.dispatch('search_tweets', {
            word: this.searchWord
          })
            .then((info) => {
              console.log(info)
              this.tweets = info
            })
        }
      }
    },
    created: function () {
      this.isLoading = true
      return this.loadData()
        .then(() => {
          this.isLoading = false
        })
    }
  }
</script>

<style type="text/css" scoped>
  
  .search-div {
    margin-top: 2%;
    margin-left: 10%;
    margin-right: 10%;
  }

</style>
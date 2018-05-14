
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
      <div class="column is-three-quarters">
        <div class="control is-medium has-icons-left">
          <input class="input is-medium is-rounded" type="text" placeholder="Search">
          <span class="icon is-medium is-left">
              <i class="fa fa-search"></i>
          </span>
        </div>
      </div>
      <div class="column">
        <a class="button is-info is-medium">Search</a>
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
              :id="tweet.id"
              :text="tweet.text"
              :imageSrc="tweet['profile-image']"
            />
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<script type="text/javascript">
  
  // import tweets from '../../static/tweets'
  import Tweet from '@/components/common/Tweet'

  export default {
    name: 'twitter',
    components: {
      Tweet
    },
    data () {
      const tweets = [
        {
          'created_at': 'Sun Feb 25 18:11:01 +0000 2018',
          'id': 967824267948773377,
          'id_str': '967824267948773377',
          'text': 'From pilot to astronaut, Robert H. Lawrence was the first African-American to be selected as an astronaut by any na… https://t.co/FjPEWnh804',
          'truncated': true,
          'profile-image': 'http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg'
        },
        {
          'created_at': 'Sun Feb 25 18:11:01 +0000 2018',
          'id': 967824267948773377,
          'id_str': '967824267948773377',
          'text': 'From pilot to astronaut, Robert H. Lawrence was the first African-American to be selected as an astronaut by any na… https://t.co/FjPEWnh804',
          'truncated': true,
          'profile-image': 'http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg'
        },
        {
          'created_at': 'Sun Feb 25 18:11:01 +0000 2018',
          'id': 967824267948773377,
          'id_str': '967824267948773377',
          'text': 'From pilot to astronaut, Robert H. Lawrence was the first African-American to be selected as an astronaut by any na… https://t.co/FjPEWnh804',
          'truncated': true,
          'profile-image': 'http://pbs.twimg.com/profile_images/188302352/nasalogo_twitter_normal.jpg'
        }
      ]
      return {
        tweets
      }
    },
    methods: {
      goBack: function () {
        console.log('safo')
      }
    }
  }
</script>

<style type="text/css" scoped>
  
  .search-div {
    margin-top: 2%;
    margin-left: 20%;
    margin-right: 20%;
  }

</style>

<template>
  <section class="section">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="user.image" />
        </p>
      </figure>
      <div clas="media-content">
        <div class="content">
          <p>
            <strong>{{ user.name }}</strong> <small>@{{ user.screen_name}} </small> <small>31m</small>
            <br>
            {{ text }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-reply"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-retweet"></i></span>
              {{ retweets }}
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-heart"></i></span>
              {{ favorites }}
            </a>
          </div>
        </nav>
      </div>
      <div class="media-right">
        <button class="delete"></button>
      </div>
    </article>
  </section>
</template>

<script type="text/javascript">
  
  export default {
    name: 'tweet',
    props: {
      'twitterId': {
        type: Number,
        default: 79526
      },
      'text': {
        type: String,
        default: ''
      },
      'user': {
        type: Object
      },
      'favorites': {
        type: Number,
        default: 0
      },
      'retweets': {
        type: Number,
        default: 0
      }
    },
    created: function () {
    }
  }
</script>

<template>
  <section class="section">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="imageSrc" />
        </p>
      </figure>
      <div clas="media-content">
        <div class="content">
          <p>
            <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
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
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fa fa-heart"></i></span>
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
      'id': {
        type: Number,
        default: 79526
      },
      'text': {
        type: String,
        default: ''
      },
      'imageSrc': {
        type: String,
        default: '../../../static/imgs/defaultProfile.jpg'
      }
    },
    created: function () {
      console.log(this.imageSrc)
    }
  }
</script>
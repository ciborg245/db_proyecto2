<template>
  <div>
    <section class="hero is-medium is-primary is-bold"  id="panito">
      <div class="hero-head" style="margin-right: 10%" >
        <div id="navbarMenuHeroB" class="navbar-menu">
          <div class="navbar-end">
            <span class="navbar-item">
              <a class="button is-centered is-info is-medium" v-on:click="goToTwitter">
                <span class="icon">
                  <i class="fa fa-twitter"></i>
                </span>
                <span>Twitter</span>
              </a>
            </span>
          </div>
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
          <h1 class="title sombra">
            Panito fresh
          </h1>
          <h2 class="subtitle sombra">
            CRM
          </h2>

        </div>
      </div>
    </section>
    <div class="container" style="margin-top: 20px;">
      <h1 class="title">Gráficas</h1>
      <div class="columns is-multiline">
        <div class="column is-one-fifth">
          <div class="box caja" v-on:click="gotoGraph1">
            <p>Productos favoritos por género</p>
          </div>
        </div>
        <div class="column is-one-fifth">
          <div class="box caja" v-on:click="gotoGraph2">
            <p>Categorías de producto favoritas</p>
          </div>
        </div>
        <div class="column is-one-fifth">
          <div class="box caja" v-on:click="gotoGraph3">
            <p>Departamentos con más crédito</p>
          </div>
        </div>
        <div class="column is-one-fifth">
          <div class="box caja" v-on:click="gotoProducts">
            <p>Productos</p>
            <hr>
            <span class="icon">
              <i class="fa fa-birthday-cake fa-lg fa-5x"></i>
            </span>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="box caja" v-on:click="gotoStates">
            <p>Departamentos</p>
            <hr>
            <span class="icon">
              <i class="fa fa-globe fa-lg fa-5x"></i>
            </span>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="box caja" v-on:click="gotoStores">
            <p>Sucursales</p>
            <hr>
            <span class="icon">
              <i class="fa fa-coffee fa-lg fa-5x"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  // Script donde se realiza los metodos de comunicación de la webapp
  import FormCheckbox from '@/components/common/FormCheckbox'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'
  export default {
    name: 'dashboard',

    components: {
      FormCheckbox,
      FormInput,
      ConfirmModal,
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        responses: null,
        showNotificationSuccess: false,
        showNotificationDanger: false,
        showSelected: false,
        notificationMessage: null,
        isLoading: false,
        showConfirm: false,
        confirmMsg: null,
        verbose: false
      }
    },

    methods: {
      gotoNew: function () {
        this.$router.push({name: 'ClientNewEdit'})
      },
      gotoGraph1: function () {
        this.$router.push({name: 'Graph1'})
      },
      gotoGraph2: function () {
        this.$router.push({name: 'Graph2'})
      },
      gotoGraph3: function () {
        this.$router.push({name: 'Graph3'})
      },
      gotoGraph4: function () {
        this.$router.push({name: 'Graph4'})
      },
      gotoGraph5: function () {
        this.$router.push({name: 'Graph1'})
      },
      gotoProducts: function () {
        this.$router.push({name: 'Products'})
      },
      gotoStores: function () {
        this.$router.push({name: 'Stores'})
      },
      gotoStates: function () {
        this.$router.push({name: 'States'})
      },
      cancelConfirm: function () {
        this.sqlQuery = null
        this.showConfirm = false
      },
      goToTwitter: function () {
        console.log('[ut')
        this.$router.push({name: 'Twitter'})
      },
      gotoReports: function () {
        this.$router.push({name: 'Reports'})
      }
    }
  }
</script>

<style lang="scss" scoped>
#panito {
  background-image: url("../../static/imgs/monika-grabkowska-468575-unsplash.jpg");
  background-size: contain;
  height: 100%;
}
.sombra {
  text-shadow: 	0px 4px 3px rgba(0,0,0,0.4),
					0px 8px 13px rgba(0,0,0,0.1),
					0px 18px 23px rgba(0,0,0,0.1);
  font-size: 3em;
  text-align: center;
}
.caja {
  font-weight: bold;
  text-align: center;
}
.caja span {
  margin-top: 30px;
}
.caja:hover {
  background-color: gray;
  color: white;
}
</style>

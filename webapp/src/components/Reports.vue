<template>
  <div>
    <section class="hero is-medium is-primary is-bold"  id="panito">
      <div class="hero-head" style="margin-right: 10%" >
        <div id="navbarMenuHeroB" class="navbar-menu">
        </div>
      </div>
      <div class="hero-body">
        <div class="container">
          <h1 class="title sombra">
            Panito fresh
          </h1>
          <h2 class="subtitle sombra">
            Reportes
          </h2>

        </div>
      </div>
    </section>
    <div class="container" style="margin-top: 20px;">
      <h2 class="title">Gráficas</h2>
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
          <div class="box caja" v-on:click="gotoGraph4">
            <p>Tipos de clientes más frecuentes</p>
          </div>
        </div>
        <div class="column is-one-fifth">
          <router-link :to="{name: 'Graph5'}" class="box caja">
            Crecimiento de clientes
          </router-link>
        </div>
      </div>

      <h2 class="title">Resúmenes</h2>
      <div class="columns is-multiline">
        <div class="column is-one-fifth">
          <div class="box caja" v-on:click="gotoResumen1">
            <p>Tiendas por departamento</p>
          </div>
        </div>
        <div class="column is-one-fifth">
          <router-link :to="{name: 'Resumen2'}" class="box caja">
            Crédito por departamento
          </router-link>
        </div>
        <div class="column is-one-fifth">
          <router-link :to="{name: 'Resumen3'}" class="box caja">
            Productos favoritos por departamento
          </router-link>
        </div>
        <div class="column is-one-fifth">
          <router-link :to="{name: 'Resumen4'}" class="box caja">
            Productos favoritos por tipo de cliente
          </router-link>
        </div>
        <div class="column is-one-fifth">
          <router-link :to="{name: 'Resumen5'}" class="box caja">
            Producto favorito por género
          </router-link>
        </div>
      </div>

      <h2 class="title">Reportes de detalle</h2>
      <div class="columns is-multiline">
        <div class="column is-one-fifth">
          <router-link :to="{ name: 'Detalle1'}" class="box caja">Detalle crédito departamentos</router-link>
        </div>
        <div class="column is-one-fifth">
          <router-link :to="{ name: 'Detalle2'}" class="box caja">Detalle nuevos clientes</router-link>
        </div>
        <div class="column is-one-fifth">
          <router-link :to="{ name: 'Detalle3'}" class="box caja">Crédito por tipo de cliente</router-link>
        </div>
        <div class="column is-one-fifth">
          <router-link :to="{ name: 'Detalle4'}" class="box caja">Crédito y producto por edad</router-link>
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
      gotoResumen1: function () {
        this.$router.push({name: 'Resumen1'})
      },
      gotoReports: function () {
        this.$router.push({name: 'Reports'})
      }
    },
    created: function () {
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

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
      <div class="columns is-multiline">
        <div class="column is-one-third">
          <div class="box caja" v-on:click="gotoUsers">
            <p>Ver clientes</p>
            <hr>
            <span class="icon">
              <i class="fa fa-users fa-lg fa-5x"></i>
            </span>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="box caja" v-on:click="gotoNew">
            <p>Agregar nuevo cliente</p>
            <hr>
            <span class="icon">
              <i class="fa fa-user-plus fa-lg fa-5x"></i>
            </span>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="box caja">
            <p>Reportes</p>
            <hr>
            <span class="icon">
              <i class="fa fa-line-chart fa-lg fa-5x"></i>
            </span>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="box caja">
            <p>Productos</p>
            <hr>
            <span class="icon">
              <i class="fa fa-birthday-cake fa-lg fa-5x"></i>
            </span>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="box caja">
            <p>Departamentos</p>
            <hr>
            <span class="icon">
              <i class="fa fa-globe fa-lg fa-5x"></i>
            </span>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="box caja">
            <p>Sucursales</p>
            <hr>
            <span class="icon">
              <i class="fa fa-coffee fa-lg fa-5x"></i>
            </span>
          </div>
        </div>
      </div>

      <confirm-modal :show-confirm="showConfirm"
                         confirm-msg="¿Realmente desea remover esta base de datos?"
                         @accept=""
                         @cancel=""/>
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
        sqlQuery: null,
        database: null,
        columns: [],
        registers: [],
        constraints: [],
        responses: null,
        showTables: false,
        showColumns: false,
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

    // Metodos de la Webapp
    // ExecuteQuery, manda la query actual al sevidor y espera la respuesta
    // CheckIfDrop, chequea si hay un DROP TABLE y pregunta si realmente quiere eliminar la tabla
    methods: {
      gotoNew: function () {
        this.$router.push({name: 'NewClient'})
      },
      gotoUsers: function () {
        this.$router.push({name: 'Clients'})
      },
      cancelConfirm: function () {
        this.sqlQuery = null
        this.showConfirm = false
      },
      goToTwitter: function () {
        console.log('[ut')
        this.$router.push({name: 'Twitter'})
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

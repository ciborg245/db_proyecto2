<template>
  <div class="container">
    <div class="columns" v-show="!isLoading">
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-128x128">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ name }}</p>
                <p class="subtitle is-6"> @{{ twitterId }} </p>
              </div>
            </div>

            <div class="content">
              <p><strong>Correo:</strong> {{ email }} </p>
              <p><strong>Ubicación:</strong> {{ address }} </p>
              <p><strong>Teléfono:</strong> {{ phone }} </p>
              <p><strong>Producto favorito:</strong> {{ favoriteProduct }} </p>
              <p><strong>Sexo:</strong> {{ gender }} </p>
              <p><strong>Límite de crédito:</strong> {{ credit }} </p>
              <p><strong>Cumpleaños:</strong> {{ birthdate }} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader :is-loading="isLoading"/>
  </div>

</template>
<script>
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
        photo: 'https://bulma.io/images/placeholders/128x128.png',
        name: 'ClienteX',
        twitterId: 'clientex',
        email: '',
        gender: '',
        phone: '',
        birthdate: '',
        credit: 0,
        address: '',
        favoriteProduct: '',
        isLoading: false,
        clientId: null
      }
    },

    methods: {
      loadData: function () {
        this.isLoading = true
        this.getClientId()
        return this
          .getClientData()
        .then(() => {
          this.isLoading = false
        })
      },
      getClientId: function () {
        const query = this.$route.query
        this.clientId = query['id'] ? query['id'] : null
        /*
        if (this.clientId !== null) {
          this.isEdit = true
        }
        */
      },
      getClientData: function () {
        const data = {
          clientId: this.clientId
        }
        return this.$store.dispatch('client_getOne', data)
          .then((client) => {
            this.name = client.firstName
            this.twitterId = client.twitterId
            this.email = client.email
            this.gender = client.gender
            this.address = client.address
            this.phone = client.phone
            this.birthdate = client.birthdate
            this.credit = client.credit
          })
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

<style lang="scss" scoped>
</style>

<template>
  <div class="container">
    <div class="columns" v-show="!isLoading">
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-128x128">
                  <img v-bind:src="photo" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{ name }}</p>
                <p class="subtitle is-6"> @{{ twitterId }} </p>
              </div>
            </div>
            <hr>
            <div class="content">
              <p><strong>Correo:</strong> {{ email }} </p>
              <p><strong>Dirección:</strong> {{ address }} </p>
              <p><strong>Departamento:</strong> {{ state }} </p>
              <p><strong>Teléfono:</strong> {{ phone }} </p>
              <p><strong>Producto favorito:</strong> {{ favoriteProduct }} </p>
              <p><strong>Sexo:</strong> {{ gender }} </p>
              <p><strong>Límite de crédito:</strong> {{ credit }} </p>
              <p><strong>Cumpleaños:</strong> {{ birthdate }} </p>
              <hr v-show="extras.length > 0">
              <p v-show="extras.length > 0"> <strong>Campos extras</strong> </p>
              <p v-for="extra of extras"> <strong> {{extra.field}}: </strong> {{extra.value}} </p>
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
        name: '',
        twitterId: '',
        email: '',
        gender: '',
        phone: '',
        birthdate: '',
        credit: 0,
        address: '',
        favoriteProduct: '',
        state: '',
        extras: [],
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
          .then((clients) => {
            console.log(clients)
            const client = clients[0]
            this.name = client.firstName
            this.twitterId = client.twitterId
            this.email = client.email
            this.gender = client.gender
            this.address = client.address
            this.phone = client.phone
            this.birthdate = client.birthdate
            this.credit = client.credit
            this.favoriteProduct = client.favoriteProduct
            this.state = client.state || ''
            this.photo = client.image || 'https://bulma.io/images/placeholders/96x96.png'

            for (const cliente of clients) {
              if (cliente.extraField) {
                this.extras.push(
                  {
                    field: cliente.extraField,
                    value: cliente.extraValue
                  }
                )
              }
            }
          })
          .then(() => {
            return this.$store.dispatch('products_get')
          })
          .then((products) => {
            for (const product of products) {
              if (product.id === this.favoriteProduct) {
                this.favoriteProduct = product.name
              }
            }
          })
          .then(() => {
            return this.$store.dispatch('states_get')
          })
          .then((states) => {
            for (const state of states) {
              if (state.id === this.state) {
                this.state = state.nombre
              }
            }
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

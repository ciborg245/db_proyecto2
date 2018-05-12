<template>
  <section class="hero is-fullheight">
    <div class="hero-head" v-show="!isLoading">
      <div class="container">
        <!-- logo -->
      </div>
    </div>

    <div class="hero-body" v-show="!isLoading">
      <div class="container">
        <div class="columns">
          <div class="column is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
            <!-- form -->
            <form @submit.prevent="submitForm" novalidate>
              <div class="box">
                <FormInput type="text"
                           icon="user"
                           label="Nombre"
                           place-holder="Nombres"
                           v-model="firstName"
                           :max-length="255"
                           :is-required="true"
                           :is-success="firstNameIsSuccess"
                           :is-danger="firstNameIsDanger"
                           :error-msg="firstNameErrorMsg"/>
                <FormInput type="text"
                           icon="envelope"
                           label="Correo"
                           place-holder="Correo electrónico"
                           v-model="email"
                           :max-length="255"
                           :is-required="true"
                           :is-success="emailIsSuccess"
                           :is-danger="emailIsDanger"
                           :error-msg="emailErrorMsg"/>
                <FormInput type="text"
                         icon="phone"
                         label="Teléfono"
                         place-holder="Número telefónico"
                         v-model="phone"
                         :max-length="255"
                         :is-required="true"
                         :is-success="emailIsSuccess"
                         :is-danger="emailIsDanger"
                         :error-msg="emailErrorMsg"/>
                <FormInput type="text"
                          icon="map-marker"
                          label="Dirección"
                          place-holder="Ingrese la dirección del cliente"
                          v-model="address"
                          :max-length="255"
                          :is-required="true"
                          :is-success="emailIsSuccess"
                          :is-danger="emailIsDanger"
                          :error-msg="emailErrorMsg"/>
                <FormInput type="text"
                           icon="picture-o"
                           label="Imagen"
                           place-holder="Ingrese el url de la foto del usuario"
                           v-model="image"
                           :is-required="true"
                           :is-success="firstNameIsSuccess"
                           :is-danger="firstNameIsDanger"
                           :error-msg="firstNameErrorMsg"/>
                <FormInput type="text"
                           icon="twitter"
                           label="Twitter"
                           place-holder="Ingrese su cuenta de twitter"
                           v-model="twitterId"
                           :max-length="255"
                           :is-required="true"
                           :is-success="emailIsSuccess"
                           :is-danger="emailIsDanger"
                           :error-msg="emailErrorMsg"/>
                <FormInput type="text"
                           icon="money"
                           label="Límite de crédito"
                           v-model="credit"
                          :max-length="255"
                           :is-required="true"
                           :is-success="emailIsSuccess"
                           :is-danger="emailIsDanger"
                           :error-msg="emailErrorMsg"/>
                <DateChooser label="Fecha de nacimiento"
                              v-model="birthDate"
                              icon="calendar"/>
                <FormSelectWithSearch icon="venus-mars"
                            label="Sexo"
                            place-holder="Indique su Sexo"
                            v-model="gender"
                            :list="genders"/>
                <FormSelectWithSearch icon="building"
                            label="Departamento"
                            place-holder="Indique el departamento del cliente"
                            v-model="state"
                            :list="states"/>

                <FormSelectWithSearch icon="birthday-cake"
                            label="Producto favorito"
                            place-holder="Indique su producto favorito"
                            v-model="favoriteProduct"
                            :list="products"/>

              </div>
              <div class="field is-grouped is-grouped-centered" style="margin-top: 30px;">
                <button type="submit"
                        class="button is-primary"
                        :class="{'is-loading': isSubmitting}">Registrar
                </button>
                <router-link class="button" :to="{ name: 'dashboard'}">Cancelar</router-link>
              </div>
            </form>

        </div>
      </div>
    </div>
  </div>
    <loader :is-loading="isLoading"/>
  </section>
</template>

<script>
  import Validator from 'validator'
  // import Moment from 'moment'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import DateChooser from '@/components/common/DateChooser'
  import FormSelectWithSearch from '@/components/common/FormSelectWithSearch'
  export default {
    name: 'NewClient',
    components: {
      FormInput,
      DateChooser,
      FormSelectWithSearch,
      Loader
    },
    data () {
      return {
        clientId: null,
        firstName: null,
        email: null,
        phone: null,
        address: null,
        image: null,
        twitterId: null,
        credit: null,
        birthDate: null,
        gender: null,
        state: null,
        clientType: null,
        favoriteProduct: null,
        firstNameErrorMsg: null,
        emailErrorMsg: null,
        passwordValidateErrMsg: null,
        showExtraFieldError: false,
        clientTypes: [],
        states: [],
        products: [],
        genders: [],
        extraFields: [],
        extraValues: [],
        extras: 0,
        isLoading: false,
        isSubmitting: false
      }
    },
    computed: {
      firstNameIsSet: function () {
        return (this.firstName !== null)
      },
      firstNameIsValid: function () {
        if (!this.firstNameIsSet || this.firstName.trim().length <= 0) {
          this.firstNameErrorMsg = 'Debe ingresar su nombre'
          return false
        }
        this.firstNameErrorMsg = null
        return true
      },
      firstNameIsSuccess: function () {
        return (this.firstNameIsSet && this.firstNameIsValid)
      },
      firstNameIsDanger: function () {
        return (this.firstNameIsSet && !this.firstNameIsValid)
      },
      lastNameIsSet: function () {
        return (this.lastName !== null)
      },
      lastNameIsValid: function () {
        if (!this.lastNameIsSet || this.lastName.trim().length <= 0) {
          return false
        }
        return true
      },
      lastNameIsSuccess: function () {
        return (this.lastNameIsSet && this.lastNameIsValid)
      },
      emailIsSet: function () {
        return (this.email !== null)
      },
      emailIsValid: function () {
        if (!this.emailIsSet || !Validator.isEmail(this.email)) {
          this.emailErrorMsg = 'Debe ingresar un correo válido'
          return false
        }
        return true
      },
      emailIsSuccess: function () {
        return (this.emailIsSet && this.emailIsValid)
      },
      emailIsDanger: function () {
        return (this.emailIsSet && !this.emailIsValid)
      },
      passwordIsSet: function () {
        return (this.password !== null)
      },
      passwordIsValid: function () {
        if (!this.passwordIsSet || this.password.trim().length <= 0) {
          return false
        }
        return true
      },
      passwordIsSuccess: function () {
        return (this.passwordIsSet && this.passwordIsValid)
      },
      passwordIsDanger: function () {
        return (this.passwordIsSet && !this.passwordIsValid)
      },
      passwordValidateIsSet: function () {
        return (this.passwordValidate !== null)
      },
      passwordValidateIsValid: function () {
        if (!this.passwordValidateIsSet || this.passwordValidate.trim().length <= 0) {
          this.passwordValidateErrMsg = 'Las contraseñas no coinciden'
          return false
        }
        if (this.password !== this.passwordValidate) {
          this.passwordValidateErrMsg = 'Las contraseñas no coinciden'
          return false
        }
        return true
      },
      passwordValidateIsSuccess: function () {
        return (this.passwordValidateIsSet && this.passwordValidateIsValid)
      },
      passwordValidateIsDanger: function () {
        return (this.passwordValidateIsSet && !this.passwordValidateIsValid)
      }
    },

    methods: {
      loadData: function () {
        this.getGenders()
        return this.getStates()
          .then(() => {
            return this.getProducts()
          })
          .then(() => {
            return this.getClient()
          })
      },
      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          return
        }
        const data = {
          clientId: this.clientId,
          name: this.firstName,
          email: this.email,
          phone: this.phone,
          address: this.address,
          image: this.image,
          twitterId: this.twitterId,
          credit: this.credit,
          birthdate: this.birthDate,
          gender: this.gender,
          state: this.state,
          favoriteProduct: this.favoriteProduct
        }

        return this
          .$store.dispatch('client_edit', data)
          .then((response) => {
            console.log(response)
            this.$router.push({name: 'dashboard'})
          })
          .catch(err => {
            throw err
          })
      },
      validForm: function () {
        return true
      },
      getGenders: function () {
        this.genders = [
          {
            value: 'male',
            text: 'Masculino'
          },
          {
            value: 'female',
            text: 'Femenino'
          }
        ]
      },
      getClient: function () {
        const query = this.$route.query
        this.clientId = query['client'] ? query['client'] : null
        const data = {
          clientId: this.clientId
        }
        return this.$store.dispatch('client_getOne', data)
          .then((client) => {
            this.firstName = client.firstName
            this.twitterId = client.twitterId
            this.email = client.email
            this.gender = client.gender
            this.image = client.image
            this.address = client.address
            this.phone = client.phone + ''
            this.birthDate = client.birthdate
            this.credit = client.credit + ''
            this.favoriteProduct = client.favoriteProduct
            this.state = client.state || ''
          })
      },
      getStates: function () {
        return this.$store.dispatch('states_get')
          .then((states) => {
            console.log(states)
            for (const state of states) {
              this.states.push({
                id: state.id,
                text: state.nombre
              })
            }
          })
      },
      getProducts: function () {
        return this.$store.dispatch('products_get')
          .then((products) => {
            for (const product of products) {
              this.products.push(
                {
                  id: product.id,
                  text: product.name
                }
              )
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

<style lang="css">
#fb_btn {
  background-color: #3b579d;
  color: #fff;
}
#google_btn {
  background-color: #dd381d;
  color: #fff;
}

.zenter {
  width: 68%;
  margin: 2% auto;
}
</style>

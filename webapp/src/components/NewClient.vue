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
                         :is-success="phoneIsSuccess"
                         :is-danger="phoneIsDanger"/>
                <FormInput type="text"
                          icon="map-marker"
                          label="Dirección"
                          place-holder="Ingrese la dirección del cliente"
                          v-model="address"
                          :max-length="255"
                          :is-required="true"
                          :is-success="addressIsSuccess"
                          :is-danger="addressIsDanger"/>
                <FormInput type="text"
                           icon="picture-o"
                           label="Imagen"
                           place-holder="Ingrese el url de la foto del usuario"
                           v-model="image"
                           :is-success="imageIsSuccess"
                           :is-danger="imageIsDanger"/>
                <FormInput type="text"
                           icon="twitter"
                           label="Twitter"
                           place-holder="Ingrese su cuenta de twitter"
                           v-model="twitterId"
                           :max-length="255"
                           :is-success="twitterIdIsSuccess"
                           :is-danger="twitterIdIsDanger"/>
                <FormInput type="number"
                           icon="money"
                           label="Límite de crédito"
                           v-model="credit"
                          :max-length="255"
                           :is-required="true"
                           :is-success="creditIsSuccess"
                           :is-danger="creditIsDanger"/>
                <DateChooser label="Fecha de nacimiento"
                              v-model="birthDate"
                              icon="calendar"/>
                <FormSelectWithSearch label="Tipo de cliente"
                              v-model="clientType"
                              :is-required="true"
                              icon="user"
                              :list="clientTypes"/>
                <FormSelectWithSearch icon="venus-mars"
                            label="Sexo"
                            place-holder="Indique su Sexo"
                            :is-required="true"
                            v-model="gender"
                            :list="genders"/>
                <FormSelectWithSearch icon="building"
                            label="Departamento"
                            place-holder="Indique el departamento del cliente"
                            :is-required="true"
                            v-model="state"
                            :list="states"/>
                <FormSelectWithSearch icon="birthday-cake"
                            label="Producto favorito"
                            place-holder="Indique su producto favorito"
                            :is-required="true"
                            v-model="favoriteProduct"
                            :list="products"/>
                <div v-for="extra in extras" class="box">
                  <FormInput type="text" v-model="extraFields[extra-1]" label="Campo"/>
                  <FormInput type="text" v-model="extraValues[extra-1]" label="Valor"/>
                </div>
                <div class="notification is-danger" v-show="showExtraFieldError">
                  El campo extra anterior no fue llenado correctamente
                </div>
                <p>{{extraFields}}</p>
                <p>{{extraValues}}</p>
                <a class="button is-primary" v-on:click="addField">Agregar campo</a>
                <a class="button is-danger" @click="removeField">Borrar último campo</a>
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
      emailIsSet: function () {
        return (this.email !== null)
      },
      emailIsValid: function () {
        if (!this.emailIsSet || !Validator.isEmail(this.email) || this.email.trim().length <= 0) {
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
      phoneIsSet: function () {
        return this.phone !== null
      },
      phoneIsValid: function () {
        if (!this.phoneIsSet || !Validator.isNumeric(this.phone) || this.phone.trim().length <= 0) {
          return false
        }
        return true
      },
      phoneIsSuccess: function () {
        return this.phoneIsSet && this.phoneIsValid
      },
      phoneIsDanger: function () {
        return this.phoneIsSet && !this.phoneIsValid
      },
      addressIsSet: function () {
        return this.address !== null
      },
      addressIsValid: function () {
        if (!this.addressIsSet || this.address.trim().length <= 0) {
          return false
        }
        return true
      },
      addressIsSuccess: function () {
        return this.addressIsSet && this.addressIsValid
      },
      addressIsDanger: function () {
        return this.addressIsSet && !this.addressIsValid
      },
      imageIsSet: function () {
        return this.image !== null
      },
      imageIsValid: function () {
        if (!this.imageIsSet || this.image.trim().length <= 0) {
          return false
        }
        return true
      },
      imageIsSuccess: function () {
        return this.imageIsSet && this.imageIsValid
      },
      imageIsDanger: function () {
        return this.imageIsSet && !this.imageIsValid
      },
      twitterIdIsSet: function () {
        return this.twitterId !== null
      },
      twitterIdIsValid: function () {
        if (!this.twitterIdIsSet || this.twitterId.trim().length <= 0) {
          return false
        }
        return true
      },
      twitterIdIsSuccess: function () {
        return this.twitterIdIsSet && this.twitterIdIsValid
      },
      twitterIdIsDanger: function () {
        return this.twitterIdIsSet && !this.twitterIdIsValid
      },
      creditIsSet: function () {
        return this.credit !== null
      },
      creditIsValid: function () {
        if (!this.creditIsSet || this.credit.trim().length <= 0 || !Validator.isNumeric(this.credit)) {
          return false
        }
        return true
      },
      creditIsSuccess: function () {
        return this.creditIsSet && this.creditIsValid
      },
      creditIsDanger: function () {
        return this.creditIsSet && !this.creditIsValid
      },
      birthdateIsSet: function () {
        return this.birthDate !== null
      },
      genderIsSet: function () {
        return this.gender !== null
      },
      stateIsSet: function () {
        return this.state !== null
      },
      favoriteProductIsSet: function () {
        return this.favoriteProduct !== null
      }
    },

    methods: {
      addField: function () {
        this.showExtraFieldError = false
        if (this.extraFields.length !== this.extraValues.length) {
          this.showExtraFieldError = true
          return
        }
        this.extras++
      },
      removeField: function () {
        if (this.extraFields.length + this.extraValues.length === 0) {
          if (this.extras > 0) this.extras--
          return
        }
        if (this.extraFields.length === this.extraValues.length && this.extras > this.extraFields.length) {
          this.extras--
          return
        }
        if (this.extraFields.length > this.extraValues.length) {
          this.extraFields.pop()
        } else if (this.extraFields.length < this.extraValues.length) {
          this.extraValues.pop()
        } else {
          this.extraFields.pop()
          this.extraValues.pop()
        }
        this.extras--
      },
      loadData: function () {
        this.getGenders()
        return this.getStates()
          .then(() => {
            return this.getProducts()
          })
          .then(() => {
            return this.getClientTypes()
          })
      },
      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          return
        }
        const data = {
          name: this.firstName,
          email: this.email,
          phone: this.phone,
          address: this.address,
          credit: this.credit,
          clientType: this.clientType,
          gender: this.gender,
          state: this.state,
          favoriteProduct: this.favoriteProduct
        }
        if (this.birthdateIsSet) {
          data.birthdate = this.birthDate
        }
        if (this.imageIsSet) {
          data.image = this.image
        }
        if (this.twitterIdIsSet) {
          data.twitterId = this.twitterId
        }
        if (this.extraFields.length > 0) {
          if (this.extraFields.length !== this.extraValues.length) {
            e.preventDefault()
            return
          }
          let extras = {}
          for (let i = 0; i < this.extraFields.length; i++) {
            extras[this.extraFields[i]] = this.extraValues[i]
          }
          data.extras = extras
          /*
          console.log(data)
          return
          */
        }
        this.isSubmitting = true
        return this
          .$store.dispatch('client_new', data)
          .then((response) => {
            console.log(response)
            this.isSubmitting = false
            this.$router.push({name: 'dashboard'})
          })
          .catch(err => {
            this.isSubmitting = false
            throw err
          })
      },
      validForm: function () {
        this.firstName = this.firstName || ''
        this.email = this.email || ''
        this.address = this.address || ''
        this.phone = this.phone || ''
        this.credit = this.credit || ''

        return this.firstNameIsValid && this.emailIsValid && this.phoneIsValid &&
        this.addressIsValid && this.creditIsValid && this.genderIsSet && this.favoriteProductIsSet &&
        this.stateIsSet
      },
      getGenders: function () {
        this.genders = [
          {
            value: 'masculino',
            text: 'Masculino'
          },
          {
            value: 'femenino',
            text: 'Femenino'
          }
        ]
      },
      getStates: function () {
        return this.$store.dispatch('states_get')
          .then((states) => {
            for (const state of states) {
              this.states.push({
                value: state.id,
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
                  value: product.id,
                  text: product.name
                }
              )
            }
          })
      },
      getClientTypes: function () {
        return this.$store.dispatch('client_types')
          .then((types) => {
            for (const type of types) {
              this.clientTypes.push(
                {
                  id: type.id,
                  text: type.nombre
                }
              )
            }
          })
      }
    },
    created: function () {
      this.loadData()
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

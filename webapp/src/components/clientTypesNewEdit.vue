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
                           place-holder="Nombre del producto"
                           v-model="name"
                           :max-length="255"
                           :is-required="true"
                           :is-success="nameIsSuccess"
                           :is-danger="nameIsDanger"
                           :error-msg="nameErrorMsg"/>
                <FormInput type="number"
                           icon="percent"
                           label="Descuento"
                           place-holder="Ingrese el descuento para este tipo de cliente"
                           v-model="discount"
                           :max-length="255"
                           :is-required="true"
                           :is-success="discountIsSuccess"
                           :is-danger="discountIsDanger"
                           :error-msg="discountErrorMsg"/>
              </div>
              <div class="field is-grouped is-grouped-centered" style="margin-top: 30px;">
                <button type="submit"
                        class="button is-primary"
                        :class="{'is-loading': isSubmitting}">Crear
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
  import FormSelectWithSearch from '@/components/common/FormSelectWithSearch'
  export default {
    name: 'ClientNewEdit',
    components: {
      FormInput,
      FormSelectWithSearch,
      Loader
    },
    data () {
      return {
        typeId: null,
        isEdit: false,
        name: null,
        discount: null,
        category: null,
        nameErrorMsg: null,
        discountErrorMsg: null,
        categories: [],
        isLoading: false,
        isSubmitting: false
      }
    },
    computed: {
      nameIsSet: function () {
        return (this.name !== null)
      },
      nameIsValid: function () {
        if (!this.nameIsSet || this.name.trim().length <= 0) {
          this.nameErrorMsg = 'Debe ingresar el nombre del producto'
          return false
        }
        this.nameErrorMsg = null
        return true
      },
      nameIsSuccess: function () {
        return (this.nameIsSet && this.nameIsValid)
      },
      nameIsDanger: function () {
        return (this.nameIsSet && !this.nameIsValid)
      },
      discountIsSet: function () {
        return (this.discount !== null)
      },
      discountIsValid: function () {
        if (!this.discountIsSet || !Validator.isDecimal(this.discount + '')) {
          this.discountErrorMsg = 'Debe ingresar un precio válido'
          return false
        }
        return true
      },
      discountIsSuccess: function () {
        return (this.discountIsSet && this.discountIsValid)
      },
      discountIsDanger: function () {
        return (this.discountIsSet && !this.discountIsValid)
      }
    },

    methods: {
      loadData: function () {
        return Promise.resolve()
          .then(() => {
            return this.getClientType()
          })
      },
      getClientType: function () {
        const query = this.$route.query
        this.typeId = query['typeId'] ? query['typeId'] : null
        if (!this.typeId) {
          this.isEdit = false
          return
        }
        this.isEdit = true
        const data = {
          typeId: this.typeId
        }
        return this.$store.dispatch('type_get', data)
          .then((type) => {
            console.log(type)
            this.name = type.nombre
            this.discount = type.descuento + ''
          })
      },
      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          return
        }
        let dispatch = ''
        if (this.isEdit) {
          dispatch = 'client_type_edit'
        } else {
          dispatch = 'client_type_new'
        }
        const data = {
          typeId: this.typeId || '',
          name: this.name,
          discount: this.discount
        }
        this.isSubmitting = true
        return this
          .$store.dispatch(dispatch, data)
          .then((response) => {
            console.log(response)
            this.isSubmitting = false
            this.$router.push({name: 'ClientTypes'})
          })
          .catch(err => {
            this.isSubmitting = false
            throw err
          })
      },
      validForm: function () {
        this.name = this.name || ''
        this.discount = this.discount || ''
        return this.nameIsValid && this.discountIsValid
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
</style>

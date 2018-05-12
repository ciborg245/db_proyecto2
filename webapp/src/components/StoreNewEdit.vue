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
                <FormSelectWithSearch icon="building"
                            label="Departamento"
                            place-holder="Indique el departamento del cliente"
                            v-model="state"
                            :list="states"/>
                <FormInput type="text"
                           icon="map-marker"
                           label="Dirección"
                           place-holder="Ingrese la dirección específica del local"
                           v-model="address"
                           :max-length="255"
                           :is-required="true"
                           :is-success="addressIsSuccess"
                           :is-danger="addressIsDanger"
                           :error-msg="addressErrorMsg"/>
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
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import FormSelectWithSearch from '@/components/common/FormSelectWithSearch'
  export default {
    name: 'ProductNewEdit',
    components: {
      FormInput,
      FormSelectWithSearch,
      Loader
    },
    data () {
      return {
        storeId: null,
        isEdit: false,
        state: null,
        address: null,
        addressErrorMsg: null,
        priceErrorMsg: null,
        states: [],
        isLoading: false,
        isSubmitting: false
      }
    },
    computed: {
      addressIsSet: function () {
        return (this.address !== null)
      },
      addressIsValid: function () {
        if (!this.addressIsSet || this.address.trim().length <= 0) {
          this.addressErrorMsg = 'Debe ingresar el nombre del producto'
          return false
        }
        this.addressErrorMsg = null
        return true
      },
      addressIsSuccess: function () {
        return (this.addressIsSet && this.addressIsValid)
      },
      addressIsDanger: function () {
        return (this.addressIsSet && !this.addressIsValid)
      },
      stateIsSet: function () {
        return this.category !== null
      }
    },

    methods: {
      loadData: function () {
        return this.getStates()
          .then(() => {
            return this.getStore()
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
      getStore: function () {
        const query = this.$route.query
        this.storeId = query['storeId'] ? query['storeId'] : null
        if (!this.storeId) {
          this.isEdit = false
          return
        }
        this.isEdit = true
        const data = {
          storeId: this.storeId
        }
        return this.$store.dispatch('store_get', data)
          .then((store) => {
            // console.log(store)
            this.state = store.state
            this.address = store.direccion || ''
          })
      },
      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          return
        }
        let dispatch = ''
        if (this.isEdit) {
          dispatch = 'store_edit'
        } else {
          dispatch = 'store_new'
        }
        const data = {
          storeId: this.storeId || '',
          state: this.state,
          address: this.address
        }
        this.isSubmitting = true
        return this
          .$store.dispatch(dispatch, data)
          .then((response) => {
            console.log(response)
            this.isSubmitting = false
            this.$router.push({name: 'Stores'})
          })
          .catch(err => {
            this.isSubmitting = false
            throw err
          })
      },
      validForm: function () {
        return true
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

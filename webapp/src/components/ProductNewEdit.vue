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
                           v-model="productName"
                           :max-length="255"
                           :is-required="true"
                           :is-success="productNameIsSuccess"
                           :is-danger="productNameIsDanger"
                           :error-msg="productNameErrorMsg"/>
                <FormInput type="number"
                           icon="money"
                           label="Precio"
                           place-holder="Ingrese el precio del producto"
                           v-model="price"
                           :max-length="255"
                           :is-required="true"
                           :is-success="priceIsSuccess"
                           :is-danger="priceIsDanger"
                           :error-msg="priceErrorMsg"/>
                <FormSelectWithSearch icon="birthday-cake"
                            label="Categoría"
                            place-holder="Indique la categoría del producto"
                            v-model="category"
                            :list="categories"/>
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
    name: 'ProductNewEdit',
    components: {
      FormInput,
      FormSelectWithSearch,
      Loader
    },
    data () {
      return {
        productId: null,
        isEdit: false,
        productName: null,
        price: null,
        category: null,
        productNameErrorMsg: null,
        priceErrorMsg: null,
        categories: [],
        isLoading: false,
        isSubmitting: false
      }
    },
    computed: {
      productNameIsSet: function () {
        return (this.productName !== null)
      },
      productNameIsValid: function () {
        if (!this.productNameIsSet || this.productName.trim().length <= 0) {
          this.productNameErrorMsg = 'Debe ingresar el nombre del producto'
          return false
        }
        this.productNameErrorMsg = null
        return true
      },
      productNameIsSuccess: function () {
        return (this.productNameIsSet && this.productNameIsValid)
      },
      productNameIsDanger: function () {
        return (this.productNameIsSet && !this.productNameIsValid)
      },
      priceIsSet: function () {
        return (this.price !== null)
      },
      priceIsValid: function () {
        if (!this.priceIsSet || !Validator.isNumeric(this.price)) {
          this.priceErrorMsg = 'Debe ingresar un precio válido'
          return false
        }
        return true
      },
      priceIsSuccess: function () {
        return (this.priceIsSet && this.priceIsValid)
      },
      priceIsDanger: function () {
        return (this.priceIsSet && !this.priceIsValid)
      },
      categoryIsSet: function () {
        return this.category !== null
      }
    },

    methods: {
      loadData: function () {
        this.getCategories()
        return this.getProduct()
      },
      getProduct: function () {
        const query = this.$route.query
        this.productId = query['product'] ? query['product'] : null
        if (!this.productId) {
          this.isEdit = false
          return
        }
        this.isEdit = true
        const data = {
          productId: this.productId
        }
        return this.$store.dispatch('product_get', data)
          .then((product) => {
            this.productName = product.name
            this.price = product.price
            this.category = product.category
          })
      },
      submitForm: function (e) {
        if (!this.validForm()) {
          e.preventDefault()
          return
        }
        const data = {
          productName: this.productName,
          price: this.price,
          password: this.password
        }
        if (this.lastNameIsSet) {
          data.lastName = this.lastName
        }

        return this
          .$store.dispatch('register', data)
          .then((response) => {
            console.log(response)
            this.$router.push({name: 'Dashboard'})
          })
          .catch(err => {
            throw err
          })
      },
      validForm: function () {
        return true
      },
      getCategories: function () {
        this.categories = [
          {
            value: 'dulce',
            text: 'Dulce'
          },
          {
            value: 'salado',
            text: 'Salado'
          },
          {
            value: 'especial',
            text: 'Especial'
          },
          {
            value: 'agridulce',
            text: 'Agridulce'
          }
        ]
      }
    },
    created: function () {
      return this.loadData()
        .then(() => {
          this.firstFieldFocus()
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

<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Productos Fresh
          </h1>
        </div>
      </div>
    </section>
    <section style="margin-top: 10px">
      <div class="container">
        <div class="box">
          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products">
                <td> <a @click="gotoProduct(product.id)">{{product.id}}</a>  </td>
                <td> {{product.name}} </td>
                <td> {{product.price}} </td>
                <td style="text-align: right">
                  <p class="field">
                    <a class="button is-danger" @click="confirmDelete(product.id)">
                                      <span class="icon">
                                          <i class="fa fa-trash-o"></i>
                                      </span>
                    </a>

                    <router-link class="button is-warning"
                                 :to="{name: 'ClientEdit', query: { 'product': product.id}}">
                                      <span class="icon">
                                          <i class="fa fa-pencil-square-o"></i>
                                      </span>
                    </router-link>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <loader :is-loading="isLoading"/>
    <confirm-modal :show-confirm="showConfirm"
                   confirm-msg="¿Realmente desea eliminar este producto?"
                   @accept="deleteProduct"
                   @cancel="cancelConfirm"/>
  </div>
</template>
<script>
  import FormCheckbox from '@/components/common/FormCheckbox'
  import FormInput from '@/components/common/FormInput'
  import Loader from '@/components/common/Loader'
  import ConfirmModal from '@/components/common/ConfirmModal'
  export default {
    name: 'Products',

    components: {
      FormCheckbox,
      FormInput,
      ConfirmModal,
      Loader
    },

    // Formato de la data, que se va a enviar al servidor.
    data () {
      return {
        products: [
          {
            id: 1,
            name: 'Producto X',
            price: 12.0
          }],
        notificationMessage: null,
        isLoading: false,
        showConfirm: false,
        toDelete: null,
        confirmMsg: null
      }
    },

    methods: {
      gotoNew: function () {
        this.$router.push({name: 'NewClient'})
      },
      gotoProduct: function (id) {
        this.$router.push({ name: 'Product', query: {product: id} })
      },
      cancelConfirm: function () {
        this.toDelete = null
        this.showConfirm = false
      },
      loadData: function () {

      },
      confirmDelete: function (id) {
        this.toDelete = id
        this.showConfirm = true
      },
      deleteProduct: function (id) {
        this.showConfirm = false
        return this
          .$store.dispatch('product_delete', {
            productId: id
          })
          .then(() => {
            this.toDelete = null
            return this.loadData()
          })
          .catch(err => {
            console.log(err)
            // this.$store.dispatch('feedback_process_err', {err: err, expire: true})
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

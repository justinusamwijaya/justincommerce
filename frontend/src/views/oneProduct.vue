<template>
    <b-row style="margin-top:10rem;">
        <b-col cols=12 md=4>
            <div class="imageWrapper">
                <img :src="productFound.productPicture" alt="">
            </div>
        </b-col>
        <b-col cols=12 md=4 class="contentWrapper">
            <h3>
                {{productFound.productName}}
            </h3>
            <p>
                {{productFound.productDescription}}
            </p>
        </b-col>
        <b-col cols=12 md=4>
            <h3>Rp. {{productFound.productPrice}}</h3>
            <button v-if="$store.state.loggedIn" @click="addToCart">add to cart</button>
        </b-col>
    </b-row>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      productFound: {}
    }
  },
  created () {
    this.getProduct()
  },
  methods: {
    ...mapActions([
      'getCart'
    ]),
    getProduct: function () {
      axios.get('https://ecommerceserver.justtodo.fun/products/' + this.$route.params.id)
        .then(productFound => {
          this.productFound = productFound.data.result
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    addToCart: function () {
      let Cart = {
        cartId: this.productFound._id
      }
      axios.put('https://ecommerceserver.justtodo.fun/addtocart', Cart, { headers: { authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(result => {
          this.getCart()
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
    .imageWrapper{
        display:flex;
        align-items:center;
        justify-content: center;
        height: 30rem;
        img{
            max-width:80%;
            max-height:80%;
        }
    }
    .contentWrapper{
        text-align: center;
        h3{
            font-size:3rem !important;
        }
    }
</style>

<template>
  <div cols="12">
    <!-- higlight -->
    <b-row>
      <b-col id="highlightContainer" cols="12">
        <b-col id="highlight" cols="12">
            <img src="https://i.ytimg.com/vi/FCPoi7wHKCQ/maxresdefault.jpg" alt="">
        </b-col>
      </b-col>
    </b-row>
    <!-- categories  -->
    <b-row>
      <!-- otherListings -->
        <product v-for="product in products" :key="product._id" :productId="product._id" :productDescription="product.productDescription" :productPicture="product.productPicture" :productName="product.productName" :productPrice="product.productPrice" />
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import product from './subComponent/product.vue'
export default {
  data () {
    return {
      products: []
    }
  },
  components: { product },
  methods: {
    getAllProducts: function () {
      axios.get('http://localhost:3000/products')
        .then(allProducts => {
          this.products = allProducts.data.result
        })
    }
  },
  created () {
    this.getAllProducts()
  },
  mounted () {

  }

}
</script>
<style lang="scss" scoped>
.row{
  margin:0 !important;
}
</style>

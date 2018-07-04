<template>
    <b-row style="margin-top:10rem;">
        <b-col v-if="productsUploaded.length<1" class="welcomeWrapper" cols=12>
            <p class="heading1">WELCOME {{loggedUsername}}</p>
            <p class="heading2">you haven't add any products here</p>
            <p class="heading3"> add new product now!</p>
            <router-link :to="{path:'/addProduct'}" tag="button" class="noProductButton">
                Add New Product
            </router-link>
            <router-link :to="{path:'/allProduct'}" tag="button" class="noProductButton">
                View All Products
            </router-link>
        </b-col>
        <b-col class="productList" cols=12 v-else>
            <router-link class="addProduct" :to="{path:'addProduct'}" tag="a">add Product</router-link>
            <div v-for="product in productsUploaded" :key="product._id" class="card" style="margin-top:.5rem;">
                <profileProduct :productId="product._id" :productDescription="product.productDescription" :productPicture="product.productPicture" :productName="product.productName" :productPrice="product.productPrice"/>
            </div>
            <router-link :to="{path:'/allProduct'}" tag="a" class="noProductButton">
                View All Products
            </router-link>
        </b-col>

    </b-row>
</template>
<script>
import axios from 'axios'
import profileProduct from './subComponent/profileProduct.vue'
export default {
  components: { profileProduct },
  data () {
    return {
      productsUploaded: [],
      loggedUsername: localStorage.getItem('username')

    }
  },
  created () {
    this.getAllList()
    if (!localStorage.getItem('token') || !localStorage.getItem('id') || !localStorage.getItem('username')) {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      window.location.href = '/'
    }
  },
  methods: {
    getAllList: function () {
      axios.get('http://localhost:3000/products/user/' + localStorage.getItem('id'))
        .then(allProducts => {
          console.log(allProducts)
          this.productsUploaded = allProducts.data.result
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
$welcomeTextColor: rgba(0,0,0,.4);
.welcomeWrapper{
    text-align:center;
    color:$welcomeTextColor;
    .heading1{
        max-width:100%;
        font-size:8rem;
    }
    .heading2{
        max-width:100%;
        font-size:6rem;
    }
    .heading3{
        max-width:100%;
        font-size:4rem;
    }
    .noProductButton{
        cursor: pointer;
        border:0;
        background:none;
        width:40rem;
        height:20rem;
        margin-left: 3rem;
        margin-right:3rem;
        font-size: 2rem;
        border-radius:5rem;
        color:$welcomeTextColor;
        transition:all .3s;
        &:hover{
            color:white;
            background-color:$welcomeTextColor;
        }
    }
}
.productList{
    margin-top:5rem;
    position:relative;
    padding-top: 5rem;
    margin-bottom: 5rem;
    padding-bottom:5rem;
    .addProduct{
        position:absolute;
        right: 10rem;
        top: 1rem;
    }
}
@media (max-width: 767px){
    .heading1{
        font-size:5rem !important;
    }
    .heading2{
        font-size:3rem !important;
    }
    .heading3{
        font-size:2rem !important;
    }
    .noProductButton{
        width:100% !important;
        margin:0 !important;
    }
}
</style>

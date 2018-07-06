<template>
    <b-row style="margin-top: 10rem;">
        <product v-for="product in allProducts" :key="product._id" :productId="product._id" :productDescription="product.productDescription" :productPicture="product.productPicture" :productName="product.productName" :productPrice="product.productPrice" />
    </b-row>
</template>
<script>
import axios from 'axios'
import product from '@/components/subComponent/product.vue'
export default {
    data(){
        return{
            allProducts:[]
        }
    },
    components:{ product },
    created(){
        this.getAllProducts()
    },
    methods:{
        getAllProducts:function(){
            axios.get('https://ecommerceserver.justtodo.fun/products')
            .then(allProducts =>{
                console.log(allProducts)
                this.allProducts = allProducts.data.result
            })
            .catch(error=>{
                console.log(error.response)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.row{
  margin-right:0 !important;
  margin-left:0 !important;
}
</style>

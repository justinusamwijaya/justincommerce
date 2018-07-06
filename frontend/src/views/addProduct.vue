<template>
    <b-row style="margin-top:10rem;">
        <b-col class="formWrapper" cols=12>
            <form @submit.prevent="addProduct">
                <label>Name</label>
                <input v-model="productName" type="text">
                <label>Description</label>
                <input v-model="productDescription" type="text">
                <label>Price</label>
                <input v-model="productPrice" type="number">
                <input @change="inputfile($event)" type="file" name="" id="">
                <button type="submit"> add Product </button>
                <router-link to='/profile' tag="button">
                    cancel
                </router-link>
            </form>
        </b-col>
    </b-row>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      productName: '',
      productDescription: '',
      productPrice: '',
      img: ''
    }
  },
  methods: {
    inputfile (event) {
      this.img = event.target.files[0]
    },
    addProduct: function () {
      let { productName, productDescription, productPrice, img } = this
      let newProduct = new FormData()
      newProduct.append('productName', productName)
      newProduct.append('productPrice', productPrice)
      newProduct.append('productDescription', productDescription)
      newProduct.append('img', img)
      axios.post('https://ecommerceserver.justtodo.fun/products/', newProduct, { headers: { authorization: 'bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' } })
        .then(response => {
          window.location.href = '/#/profile'
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.formWrapper{
    display:flex;
    justify-content: center;
    form{
        text-align:center;
        input{
            width:80%;
            margin-bottom: 4rem;
            padding:1rem;
            border:0;
            border-bottom: 1px solid black;
        }
        label{
            width:100%;
        }
        button{
            width:40%;
        }
    }
}
</style>

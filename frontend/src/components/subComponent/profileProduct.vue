<template>
    <b-row class="productWrapper">
        <div class="col-3 imgWrapper">
            <img :src="productPicture"/>
        </div>
        <div v-if="!editMode" class="col-9 contentWrapper">
            <h3>{{editProductName}}</h3>
            <p>{{editProductDescription}}</p>
            <p>Rp. {{editProductPrice}}</p>
        </div>
        <form @submit.prevent="editProduct()" v-if="editMode" class="col-9 contentWrapper">
            product Name
            <input v-model="editProductName" type="text">
            product Description
            <input v-model="editProductDescription" type="text">
            product Price
            <input v-model="editProductPrice" type="number">
            <button type="submit">edit</button>
            <button @click="editMode = !editMode" type="button">cancel</button>
        </form>
        <a @click="editMode = !editMode" class="edit">edit</a>
        <a @click="deleteProduct()" class="delete">delete</a>
    </b-row>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'productProfile',
  data () {
    return {
      editMode: false,
      editProductName: this.productName,
      editProductDescription: this.productDescription,
      editProductPrice: this.productPrice
    }
  },
  props: ['productId', 'productName', 'productDescription', 'productPrice', 'productPicture'],
  methods: {
    ...mapActions([
      'getCart'
    ]),
    deleteProduct: function () {
      axios.delete('http://localhost:3000/products/' + this.productId, { headers: { authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(() => {
          location.reload()
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    editProduct () {
      let { editProductName, editProductDescription, editProductPrice } = this
      let updatedProfile = {
        productName: editProductName,
        productDescription: editProductDescription,
        productPrice: editProductPrice
      }
      axios.put('http://localhost:3000/products/' + this.productId, updatedProfile, { headers: { authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(result => {
          this.getCart()
          this.editMode = false
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
    .productWrapper{
        height: 30rem;
        display:flex;
        align-items:center;
        position:relative;
        .imgWrapper{
            height:25rem;
            display:flex;
            align-items: center;
            justify-content: center;
            img{
                max-width:100%;
                max-height:100%;
            }
        }
        .contentWrapper{
            input{
                width:100%;
            }
            h3{
                font-size: 3rem !important;
            }
            p{
                font-size: 1.7rem !important;
            }
        }
        .edit{
            cursor: pointer;
            position:absolute;
            bottom: 1rem;
            right: 10rem;
        }
        .delete{
            cursor: pointer;
            position:absolute;
            bottom: 1rem;
            right: 5rem;
        }
    }
</style>

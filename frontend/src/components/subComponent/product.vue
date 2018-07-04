<template>
    <b-col class="productWrapper" cols=4 md=3 >
        <router-link :to="{ path:'/product/'+productId }" tag="button">
            <div class="card productSizing">
                <div  class="productPicture">
                    <img :src="productPicture" alt="">
                </div>
                <div class="productDescription">
                    <h3>{{productName}}</h3>
                    <p>Rp. {{productPrice}}</p>
                </div>
            </div>
        </router-link>
    </b-col>
</template>
<script>
export default{
  props: ['productName', 'productDescription', 'productPrice', 'productPicture', 'productId']
}
</script>
<style lang="scss" scoped>
button{
    border:0;
    background:none;
    width:100%;
    height:100%;
}
.productWrapper{
    height:30rem;
    .productSizing{
    width:90%;
    height:90%;
    .productPicture{
        height:20rem;
        width:100%;
        display:flex;
        justify-content: center;
        align-items: center;
        img{
            margin:0;
            padding:0;
            max-height:90%;
            max-width:90%;
        }
    }
    .productDescription{
        width:100%;
        text-align:center;
    }
    }
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: !!localStorage.getItem('token'),
    cart: []
  },
  mutations: {
    changeCart (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    getCart ({commit}) {
      axios.get('http://localhost:3000/getCart', { headers: { authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(result => {
          commit('changeCart', result.data.cart)
        })
        .catch(error => {
          console.log(error.response)
        })
    }
  }
})

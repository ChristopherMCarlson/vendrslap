import Vue from 'vue'
import Vuex from 'vuex'
import Target from './models/Target';
import Vendr from './models/Vendr';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    target: new Target({
      health: 100,
      name: "ScarCrow",
      attacks: {
        kick: 10,
        slap: 1,
        punch: 5,
        haduouken: 100
      },
      items: []
    }),
    machine: new Vendr({
      name: "Vendr",
      cash: 0,
      items: {
        mtDew: {
          id: 1,
          name: 'Mtn Dew',
          price: 1.5,
          stock: 5,
          imgUrl: 'http://www.mountaindew.com/assets/content/38195/20881/21892-grew-dew-product.png'
        },
        appleJuice: {
          id: 2,
          name: 'Apple Juice',
          price: 1.25,
          stock: 10,
          imgUrl: 'http://cdn7.bigcommerce.com/s-8mxfjk2bmu/images/stencil/500x659/products/9889/8992/AppleJuice_15.2flozBottle_Hero__28917.1519150065.png?c=2&imbypass=on'
        },
        holyGrail: {
          id: 3,
          name: 'Holy Grail',
          price: 5,
          stock: 1,
          imgUrl: 'https://i.pinimg.com/originals/5f/99/59/5f99596b9b9f67402cac56af05d18d5d.gif'
        }
      },
      addCash: {
        25: {
          value: 0.25
        },
        10: {
          value: 0.10
        },
        5: {
          value: 0.05
        }
      }
    })
  },
  mutations: {
    setHealth(state, actualHealth) {
      state.target.health = actualHealth
    },
    setCash(state, cash) {
      state.machine.cash = cash
    },
    buy(state, data) {
      state.machine.cash = data.newTotal
      data.item.stock = data.newStock
    },
  },
  actions: {
    attack({ dispatch, commit, state }, payload) {
      //async call
      let newHealth = state.target.health - state.target.attacks[payload]
      commit('setHealth', newHealth)
    },
    addCash({ dispatch, commit, state }, val) {
      let newTotal = state.machine.cash + val
      commit('setCash', newTotal)
    },
    buy({ dispatch, commit, state }, id) {
      let item = Object.values(state.machine.items).find(i => i.id == id)
      let newTotal = state.machine.cash - item.price
      let newStock = item.stock - 1
      if (newTotal < 0) {
        return
      }
      if (newStock <= 0) {
        return
      }

      commit('buy', { newTotal, newStock, item })
    }
  }
})

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 13,
  },
  getters: {
    getCount2(state) {
      return state.counter * 2;
    },
  },
  mutations: {},
  actions: {},
});

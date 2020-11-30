import Vue from "vue";
import Vuex from "vuex";
import sys from "./modules/sys";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    sys
  },
  strict: debug
});

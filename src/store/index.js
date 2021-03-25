import Vue from "vue";
import Vuex from "vuex";
import apiModule from "./modules/api-module";
import authModule from "./modules/auth-module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authModule,
    api: apiModule
  }
});

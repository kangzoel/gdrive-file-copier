export default {
  namespaced: true,

  state: () => ({
    status: {
      gapi: false
    }
  }),

  mutations: {
    SET_LOADED: (state, payload) => {
      state.status[payload] = true;
    }
  },

  actions: {
    initializeGoogleApiInstance({ commit }) {
      const interval = setInterval(() => {
        if (typeof window.gapi !== "undefined") {
          commit("SET_LOADED", "gapi");
          clearInterval(interval);
        }
      }, 50);
    }
  }
};

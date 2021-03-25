import { Message } from "element-ui";

export default {
  namespaced: true,

  state: () => ({
    authorized: null, // boolean
    popupIsShown: false,
    oauthToken: null
  }),

  mutations: {
    SET_AUTHORIZED_STATUS: (state, payload) => {
      state.authorized = payload;
    },

    SET_OAUTH_TOKEN: (state, payload) => {
      state.oauthToken = payload;
    },

    SET_POPUP: (state, payload) => {
      state.popupIsShown = payload;
    }
  },

  actions: {
    /**
     * Authorize the user based on the current status
     *
     * @param {context} param0
     */
    authorizeUser({ commit }) {
      const DISCOVERY_DOCS = [
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
      ];

      const SCOPES = "https://www.googleapis.com/auth/drive";

      window.gapi.load("client:auth2", function() {
        window.gapi.client
          .init({
            clientId:
              "930329239171-5aco5v8spv1pvh1t7upto7g2pil6mumq.apps.googleusercontent.com",
            apiKey: "AIzaSyA_iHmPkgOYo5wH3AnCK2t7KWy4bfibJcE",
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          })
          .then(
            () => {
              // Add a listener for the auth status change
              window.gapi.auth2
                .getAuthInstance()
                .isSignedIn.listen(function(status) {
                  commit("SET_AUTHORIZED_STATUS", status);
                });

              // Initialize auth status
              commit(
                "SET_AUTHORIZED_STATUS",
                window.gapi.auth2.getAuthInstance().isSignedIn.get()
              );

              commit("SET_POPUP", false);
            },
            error => {
              commit("SET_POPUP", false);
              console.log(error);
              Message.error("error happened");
            }
          );
      });
    },

    setOauthToken({ commit }, oauthToken) {
      commit("SET_OAUTH_TOKEN", oauthToken);
    },

    async signIn({ commit }) {
      commit("SET_POPUP", true);

      return new Promise((resolve, reject) => {
        let authIsCanceled;

        window.gapi.auth2
          .getAuthInstance()
          .signIn()
          .catch(() => {
            authIsCanceled = true;
          })
          .then(() => {
            if (authIsCanceled) {
              reject();
            } else {
              resolve();
            }

            commit("SET_POPUP", false);
          });
      });
    },

    signOut({ commit }) {
      Message("Signed out");

      commit("SET_AUTHORIZED_STATUS", false);

      window.gapi.auth2.getAuthInstance().signOut();
    }
  }
};

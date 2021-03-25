<template>
  <div id="App">
    <router-view />
    <the-loading-screen v-if="authorized === null">
      {{ loaderStatus }}
    </the-loading-screen>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TheLoadingScreen from "@/components/TheLoadingScreen";

export default {
  components: {
    TheLoadingScreen,
  },

  data: () => ({
    loaderStatus: "",
  }),

  computed: {
    ...mapState({
      gapiStatus: (state) => state.api.status,
      authorized: (state) => state.auth.authorized,
    }),
  },

  watch: {
    gapiStatus: {
      immediate: true,
      deep: true,
      handler: function (newVal) {
        if (newVal.gapi === true) {
          this.loaderStatus = "Preparing authentication...";
          this.authorizeUser();
        } else {
          this.loaderStatus = "Initializing API...";
        }
      },
    },
  },

  methods: {
    ...mapActions("api", ["initializeGoogleApiInstance"]),
    ...mapActions("auth", ["authorizeUser"]),
  },

  created() {
    this.initializeGoogleApiInstance();
  },
};
</script>

<style>
html {
  font-size: 16px;
}

body {
  margin: 0;
  font: 400 1em/1.5 "Segoe WPC", "Segoe UI", "Helvetica Neue", Tahoma, Geneva,
    Verdana, sans-serif;
}

mark {
  background: #ffa50059;
  padding: 0px 3px;
  color: #a0721d;
  border-radius: 0.25em;
}

li {
  line-height: 1.5em;
}

.el-alert {
  font-weight: 500;
}

.el-loading-spinner {
  display: flex;
  justify-content: center;
}

.container {
  margin: 0 auto;
  width: 630px;
  max-width: 100%;
}
</style>
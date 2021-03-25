<template>
  <div id="TheAuthButton" v-if="ready && authorized !== null">
    <el-button v-if="!authorized" @click="signIn" :disabled="popupIsShown">
      <span v-if="!popupIsShown">Sign In</span>
      <span v-else>Signing In...</span>
    </el-button>
    <el-button v-else @click="signOut">Sign Out</el-button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      ready: (state) => state.api.status.gapi,
      popupIsShown: (state) => state.auth.popupIsShown,
      authorized: (state) => state.auth.authorized,
    }),
  },

  methods: {
    ...mapActions("auth", ["signIn", "signOut"]),
  },
};
</script>

<style>
</style>
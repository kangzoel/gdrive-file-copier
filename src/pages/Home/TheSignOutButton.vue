<template>
  <div id="TheSignOutButton" class="fixed top-0 right-0 m-4">
    <el-button @click="signOut" size="small" type="danger">Sign Out</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("auth", ["signOut"]),
  },
};
</script>
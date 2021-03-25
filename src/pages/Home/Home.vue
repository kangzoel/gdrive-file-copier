<template>
  <div id="Home">
    <the-sign-out-button v-if="authorized" />
    <div class="container">
      <div class="mb-6 text-center text-gray-600">
        <h1 class="text-3xl font-medium mb-3">Google Drive File Copier</h1>
        <p><i>Download files without limitation!</i></p>
      </div>
      <the-form />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TheForm from "./TheForm.vue";
import TheSignOutButton from "./TheSignOutButton.vue";

export default {
  components: {
    TheForm,
    TheSignOutButton,
  },

  computed: {
    ...mapState("auth", ["authorized"]),
  },
};
</script>

<style>
#Home {
  height: 75vh;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
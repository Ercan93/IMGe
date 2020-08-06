<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark mt-4 mr-5 ml-5 bg-info">
      <router-link class="navbar-brand" tag="a" to="/">IMGe</router-link>

      <div class="navbar-nav mr-auto">
        <router-link class="nav-link" tag="a" to="/features">Özellikler</router-link>
        <router-link class="nav-link" tag="a" to="/about">Hakkında</router-link>
      </div>

      <div class="ml-auto">
        <button
          v-if="$route.name != 'file-chooser'"
          class="btn btn-warning border-dark text-dark"
          @click="PreviousFunction"
        >Previous</button>
        <button
          v-if="$route.name != 'segmentation-menu'"
          class="btn btn-warning border-dark font-weight-bold text-dark mr-5"
          @click="nextFunction"
        >Next</button>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routeName: null,
    };
  },
  created() {},
  methods: {
    nextFunction() {
      this.routeName = this.$store.getters.routeNameGetters;
      this.$router.push({ name: this.routeName });
    },
    PreviousFunction() {
      this.$router.go(-1);
    },
  },
};
</script>

<style  scoped>
.navlist {
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
</style>
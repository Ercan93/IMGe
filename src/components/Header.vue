<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark mt-4 mr-5 ml-5 bg-info">
      <a class="navbar-brand" href="#">IMGe</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Özellikler</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">Hakkında</a>
          </li>
        </ul>
      </div>
      <button
        v-if="$route.name != 'file-chooser'"
        class="btn btn-warning border-dark text-dark mr-3"
        @click="PreviousFunction"
      >Previous</button>
      <button
        v-if="$route.name != 'segmentation-menu'"
        class="btn btn-warning border-dark font-weight-bold text-dark mr-5"
        @click="nextFunction"
      >Next</button>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      routeName: null
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
    }
  }
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
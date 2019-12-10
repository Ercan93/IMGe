<template>
  <div>
    <h1>Preprocess menu</h1>
    <img :src="imageData" alt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageData: null
    };
  },
  computed: {},
  created() {
    this.imageData = this.$store.getters.sourceImageGetters;
  }
};
</script>
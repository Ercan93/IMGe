<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provider: {
        context: null
      }
    };
  },
  provide() {
    return {
      provider: this.provider
    };
  },

  mounted() {
    this.provider.context = this.$refs["canvas"].getContext("2d");
    this.$refs["canvas"].width = this.$refs["canvas"].parentElement.clientWidth;
    this.$refs["canvas"].height = this.$refs[
      "canvas"
    ].parentElement.clientHeight;
  }
};
</script>
<template>
  <div class="jumb">
    <span class="badge badge-success head-text">PreProcess Menu</span>
    <div class="jumbotron bg-info">
      <img :src="imageData" width="300px" height="300px" alt />
      <div class="process-buttons">
        <button class="btn btn-success head-text">Birinci işlem</button>
        <button class="btn btn-success head-text">Birinci işlem</button>
        <button class="btn btn-success head-text">Birinci işlem</button>
        <button class="btn btn-success head-text">Birinci işlem</button>
      </div>
    </div>
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

<style scoped>
.jumb {
  margin-left: 200px;
  margin-right: 400px;
  margin-top: 50px;
}
.jumbotron {
  margin-top: 24px;
  height: 450px;
  width: 600px;
  display: flex;
  justify-content: space-around;
}
.jumbotron img {
  border: 3px solid black;
}
.head-text {
  font-size: 25px;
}
span.head-text {
  border: 2px solid black;
}
.process-buttons {
  display: flex;
  flex-direction: column;
}
.process-buttons button {
  margin-bottom: 25px;
  margin-left: 15px;
}
</style>
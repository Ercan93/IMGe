<template>
  <div class="jumb">
    <span class="badge badge-success head-text">PreProcess Menu</span>
    <div class="jumbotron bg-info">
      <div class="process-buttons">
        <button class="btn btn-success head-text" @click="grayScale">Gray Scale</button>
        <button class="btn btn-success head-text">Birinci işlem</button>
        <button class="btn btn-success head-text">Birinci işlem</button>
        <button class="btn btn-success head-text">Birinci işlem</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
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
.jumbotron canvas {
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
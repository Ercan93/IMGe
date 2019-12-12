<template>
  <div class="jumb">
    <span class="badge badge-success head-text">PreProcess Menu</span>
    <img :src="image" id="orgImg" v-show="false" />
    <canvas v-show="false" ref="my-canvas"></canvas>
    <div class="jumbotron bg-info">
      <div class="canvasPanel">
        <img ref="org-img" class="imgClass" :src="image" alt />
      </div>
      <div class="process-buttons">
        <button class="btn btn-success head-text">Gray Scale</button>
        <button class="btn btn-success head-text">drawRect</button>
        <button class="btn btn-success head-text">Birinci işlem</button>
        <button class="btn btn-success head-text">Birinci işlem</button>
      </div>
    </div>
    <div class="result">
      <span class="badge badge-success head-text">Result</span>
      <img ref="result-img" class="imgClass" :src="image" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: null,
      imgH: null,
      imgW: null,
      resultImage: null,
      ctx: null,
      islem: 0,
      provider: {
        context: null
      }
    };
  },

  mounted() {
    this.provider.context = this.$refs["my-canvas"].getContext("2d");
    this.image = this.$store.getters.sourceImageGetters;
    this.ctx = this.provider.context;

    //this.ctx.putImageData(this.image, 0, 0);
    console.log("mounted");
  },
  methods: {},
  created() {
    setTimeout(() => {
      var width = document.getElementById("orgImg").width;
      var height = document.getElementById("orgImg").height;

      this.width = width;
      this.height = height;
      console.log(width + "x" + height);
      this.$store.dispatch("imageSrcSet", { w: width, h: height });

      var img1 = new Image();
      img1.src = this.image;
      var ImageData = img1;

      // console.log(this.provider.context);
      //this.ctx.drawImage(ImageData, 0, 0);
    }, 1000);
  }
};
</script>

<style scoped>
.jumb {
  margin-left: 100px;
  margin-top: 15px;
  display: block;
}
.jumbotron {
  margin-top: 14px;
  height: 450px;
  width: 600px;
  display: flex;
  justify-content: space-around;
}
.result {
  float: right;
  justify-content: center;
  width: 200px;
  height: 300px;
  margin-top: -480px;
  margin-right: 280px;
}
.imgClass {
  width: 400px;
  height: 300px;
  margin-top: 10px;
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
  margin-bottom: 15px;
  margin-top: -5px;
  margin-left: 15px;
}
</style>
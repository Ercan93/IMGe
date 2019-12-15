<template>
  <div class="jumb">
    <span class="badge badge-warning head-text text-dark">Segmentation Menu</span>
    <canvas v-show="false" :width="width+'px'" :height="height+'px'" ref="my-canvas"></canvas>
    <div class="jumbotron bg-info">
      <div class="canvasPanel">
        <img ref="org-img" width="400px" class="imgClass" :src="image" alt />
      </div>
      <div class="process-buttons">
        <button class="btn btn-warning text-dark">Threshold</button>
        <button class="btn btn-warning text-dark">BW image finding objects (neighborhood)</button>
        <button class="btn btn-warning text-dark">Gray image object finding and show</button>
        <button class="btn btn-warning text-dark">Color image finding objects</button>
      </div>
    </div>

    <div class="result" v-show="resultEnabled">
      <span class="badge badge- head-text text-dark">Result</span>
      <img width="500px" ref="result-img" class="resultImg" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: null,
      imageData: null,
      processingImage: null,
      imageSrc: null,
      resultEnabled: 0,
      provider: {
        context: null
      }
    };
  },

  mounted() {
    //-- Get image in store -------------------------------
    this.image = this.$store.getters.processingImageGetters;
    if (this.image == null) {
      this.image = this.$store.getters.sourceImageGetters;
    }
    //--x----------------x------------------x----------------

    //-- Canvas preliminary operations ------------------------------
    this.provider.context = this.$refs["my-canvas"].getContext("2d");
    this.ctx = this.provider.context;
    //--x--------------x-----------------x-------------x-------------
  },
  created() {
    //-- Press image to canvas --------------------------
    setTimeout(() => {
      var ImageData = new Image();
      ImageData.src = this.image;
      this.provider.context.drawImage(ImageData, 0, 0);
    }, 500);
    //----x-----------------x---------------x------------
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
  margin-top: -490px;
  margin-right: 365px;
}

.resultImg {
  margin-top: 10px;
  border: 3px solid black;
  border-radius: 5px;
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
  margin-top: 50px;
}
.process-buttons button {
  margin-bottom: 15px;
  margin-top: -5px;
  margin-left: 15px;
}
</style>
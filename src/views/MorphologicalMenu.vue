<template>
  <div class="jumb">
    <span class="badge badge-secondary head-text">Morphological Menu</span>
    <canvas v-show="false" :width="width+'px'" :height="height+'px'" ref="my-canvas"></canvas>
    <div class="jumbotron bg-info">
      <div class="canvasPanel">
        <img ref="org-img" width="400px" class="imgClass" :src="image" alt />
      </div>
      <div class="process-buttons">
        <button class="btn btn-secondary">Dilation</button>
        <button class="btn btn-secondary">Erosion</button>
        <button class="btn btn-secondary">Opening</button>
        <button class="btn btn-secondary">Closing</button>
      </div>
    </div>
    <!--  <img width="500px" ref="result-img" :src="processingImage" class="resultImg" alt /> -->
    <div class="result" v-show="resultEnabled">
      <span class="badge badge-secondary head-text">Result</span>
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
      height: null,
      width: null,
      ctx: null,
      resultEnabled: 0,
      provider: {
        context: null
      }
    };
  },

  mounted() {
    //-- Get image in store ----------------------------
    this.image = this.$store.getters.sourceImageGetters;
    //--x----------------x------------------x----------

    //-- Canvas preliminary operations ------------------------------
    this.provider.context = this.$refs["my-canvas"].getContext("2d");
    this.ctx = this.provider.context;
    //--x--------------x-----------------x-------------x-------------
  },
  created() {
    //-- named route path for next button ----------------
    this.$store.dispatch("routeNameSet", "segmentation-menu");
    //-------------x------------------x-------------------
    setTimeout(() => {
      //-- Take the height and width of the image  ----------------
      var imgWidth = document.getElementById("orgImg").width;
      var imgHeight = document.getElementById("orgImg").height;
      this.width = imgWidth;
      this.height = imgHeight;
      //--x---------------x----------------x--------------------

      //-- Sending the height and width to store ---------------
      this.$store.dispatch("imageSrcSet", [imgWidth, imgHeight]);
      //--x-------------------x--------------x-------------------
    }, 500);

    //-- Press image to canvas --------------------------
    setTimeout(() => {
      var ImageData = new Image();
      ImageData.src = this.image;
      this.provider.context.drawImage(ImageData, 0, 0);
    }, 1000);
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
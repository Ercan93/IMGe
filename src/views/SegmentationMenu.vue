<template>
  <div class="container d-flex flex-wrap">
    <div class="mt-5">
      <span class="badge badge-warning head-text text-dark">Segmentation Menu</span>
      <canvas v-show="false" :width="width+'px'" :height="height+'px'" ref="my-canvas"></canvas>
      <div class="jumbotron bg-info">
        <div class="canvasPanel">
          <img ref="org-img" width="320px" class="imgClass" :src="image" alt />
        </div>
        <div class="process-buttons">
          <button class="btn btn-warning text-dark" @click="thresold">Threshold</button>
          <button class="btn btn-warning text-dark disabled">BW image finding objects (neighborhood)</button>
          <button class="btn btn-warning text-dark disabled">Gray image object finding and show</button>
          <button class="btn btn-warning text-dark disabled">Color image finding objects</button>
        </div>
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
      imageDataProcess: null,
      myCanvas: null,
      thresoldValue: null,
      width: null,
      height: null,
      resultEnabled: 0,
      provider: {
        context: null,
      },
    };
  },
  methods: {
    canvasGetImgData() {
      this.imageData = this.$refs["my-canvas"]
        .getContext("2d")
        .getImageData(0, 0, this.width, this.height);
      this.imageDataProcess = this.$refs["my-canvas"]
        .getContext("2d")
        .getImageData(0, 0, this.width, this.height);
    },
    canvasSetImgData() {
      this.$refs["my-canvas"]
        .getContext("2d")
        .putImageData(this.imageDataProcess, 0, 0);
      this.resultEnabled = 1;
      this.imageData = this.imageDataProcess;
      // Convert to Canvas image data to normal image----
      var dataURL = this.$refs["my-canvas"].toDataURL();
      this.$refs["result-img"].src = dataURL;
      //-----------x---------------x----------------------
      this.processingImage = this.$refs["result-img"].src;
      setTimeout(() => {
        this.$store.dispatch("sourceImageSet", this.processingImage);
      }, 500);
    },
    thresold() {
      var colorSum = 0;
      for (var i = 0; i < this.imageData.data.length; i += 4) {
        var avg =
          (this.imageData.data[i] +
            this.imageData.data[i + 1] +
            this.imageData.data[i + 2]) /
          3;
        colorSum += avg;
      }
      brightness = Math.floor(colorSum / (this.width * this.height));
      this.thresoldValue = brightness;
      alert("Threshold value:", brightness);
    },
  },
  mounted() {
    //-- Get image in store -------------------------------
    this.image = this.$store.getters.processingImageGetters;
    if (this.image == null) {
      this.image = this.$store.getters.sourceImageGetters;
    }
    //--x----------------x------------------x----------------

    //-- Get image width and height data in store --------
    var imgData = this.$store.getters.imageSrcGetters;
    this.height = imgData.height;
    this.width = imgData.width;
    console.log(imgData.height);
    //----x--------------x--------------x----------------

    //-- Canvas preliminary operations ------------------------------
    this.provider.context = this.$refs["my-canvas"].getContext("2d");
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
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("processingImageSet", this.processingImage);
    next();
  },
};
</script>

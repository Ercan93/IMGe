<template>
  <div class="container d-flex flex-wrap">
    <div class="mt-5">
      <span class="badge badge-success head-text">PreProcess Menu</span>
      <img :src="image" id="orgImg" v-show="false" />
      <canvas v-show="false" :width="width+'px'" :height="height+'px'" ref="my-canvas"></canvas>
      <div class="jumbotron bg-info">
        <div class="canvasPanel">
          <img ref="org-img" width="320px" class="imgClass" :src="image" alt />
        </div>
        <div class="process-buttons">
          <button class="btn btn-success" @click="grayScale">Gray Scale</button>
          <button class="btn btn-success disabled">Image zoom</button>
          <button class="btn btn-success disabled">Image Resize</button>
          <button class="btn btn-success disabled">Image Crop</button>
        </div>
      </div>
    </div>
    <div class="result m-5" v-show="resultEnabled">
      <span class="badge badge-success head-text">Result</span>
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
      imageDataProcess: null,
      processingImage: null,
      leftData: [0, 0],
      rightData: [0, 0],
      myCanvas: null,
      height: null,
      width: null,
      resultEnabled: 0,
      provider: {
        context: null,
      },
    };
  },

  mounted() {
    //-- Get image in store ----------------------------
    this.image = this.$store.getters.sourceImageGetters;
    //--x----------------x------------------x----------
    //-- Canvas preliminary operations ------------------------------
    this.provider.context = this.$refs["my-canvas"].getContext("2d");
    //--x--------------x-----------------x-------------x-------------
  },

  methods: {
    grayScale() {
      this.canvasGetImgData();

      for (var i = 0; i < this.imageDataProcess.data.length; i += 4) {
        var avg =
          (this.imageDataProcess.data[i] +
            this.imageDataProcess.data[i + 1] +
            this.imageDataProcess.data[i + 2]) /
          3;
        this.imageDataProcess.data[i] = avg; // red
        this.imageDataProcess.data[i + 1] = avg; // green
        this.imageDataProcess.data[i + 2] = avg; // blue
      }
      setTimeout(() => {
        this.canvasSetImgData();
      }, 1000);
    },
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

      // Convert to Canvas image data to normal image----
      var dataURL = this.$refs["my-canvas"].toDataURL();
      this.$refs["result-img"].src = dataURL;
      //-----------x---------------x----------------------
      this.processingImage = this.$refs["result-img"].src;
      setTimeout(() => {
        this.$store.dispatch("sourceImageSet", this.processingImage);
      }, 500);
    },
  },

  created() {
    //-- named route path for next button ----------------
    this.$store.dispatch("routeNameSet", "filtering-menu");
    //-------------x------------------x-------------------

    setTimeout(() => {
      //-- Take the height and width of the image  ----------------
      var imgWidth = document.getElementById("orgImg").width;
      var imgHeight = document.getElementById("orgImg").height;
      this.width = imgWidth;
      this.height = imgHeight;
      //--x---------------x----------------x--------------------

      //-- Sending the height and width to store ---------------
      this.$store.dispatch("imageSrcSet", {
        width: imgWidth,
        height: imgHeight,
      });
      //--x-------------------x--------------x-------------------
    }, 500);

    //-- Press image to canvas --------------------------
    setTimeout(() => {
      var ImageData = new Image();
      ImageData.src = this.image;
      this.provider.context.drawImage(ImageData, 0, 0);
    }, 1000);
    //----x-----------------x---------------x------------
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("processingImageSet", this.processingImage);
    next();
  },
};
</script>
